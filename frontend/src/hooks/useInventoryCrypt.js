import { useMemo } from 'react';
import { useSnapshot } from 'valtio';
import imbuedClansList from '@/assets/data/imbuedClansList.json';
import vampireClansList from '@/assets/data/vampireClansList.json';
import { getHardTotal, getSoftMax } from '@/utils';
import { ALL } from '@/utils/constants';
import { useApp, usedStore } from '@/context';

const useInventoryCrypt = (cards = {}, category = 'ok', compact, onlyNotes) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const { cryptCardBase } = useApp();

  const value = useMemo(() => {
    const cardsByClan = {};
    const cardsByClanTotal = {};
    const cardsByClanUnique = {};
    const missingByClan = {};
    const missingByClanTotal = {};

    const clansSorted = [ALL, ...vampireClansList, ...imbuedClansList];
    clansSorted.forEach((clan) => {
      cardsByClan[clan] = {};
      cardsByClanTotal[clan] = 0;
      cardsByClanUnique[clan] = 0;
      missingByClan[clan] = {};
      missingByClanTotal[clan] = 0;
    });

    if (compact) {
      Object.keys(cards).forEach((cardid) => {
        cardsByClan[ALL] = {
          card: cards[cardid],
        };
      });
    } else {
      Object.keys(cards)
        .filter((cardid) => {
          if (onlyNotes) return cards[cardid].t;
          return true;
        })
        .forEach((cardid) => {
          const clan = cards[cardid].c.Clan;
          const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);
          const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);
          const miss = softUsedMax + hardUsedTotal - cards[cardid].q;

          if (miss > 0) {
            missingByClan[clan][cardid] = { q: miss, c: cards[cardid].c };
            missingByClan[ALL][cardid] = {
              q: miss,
              c: cards[cardid].c,
            };
          }

          if (category === 'nok') {
            if (miss > 0) {
              cardsByClan[clan][cardid] = cards[cardid];
              cardsByClan[ALL][cardid] = cards[cardid];
            }
          } else {
            cardsByClan[clan][cardid] = cards[cardid];
            cardsByClan[ALL][cardid] = cards[cardid];
          }
        });

      Object.keys(usedCrypt.soft)
        .filter((cardid) => cardid < 210000 && !cards[cardid])
        .forEach((cardid) => {
          const clan = cryptCardBase[cardid].Clan;

          if (category !== 'ok' && !onlyNotes) {
            cardsByClan[clan][cardid] = {
              q: 0,
              c: cryptCardBase[cardid],
            };
            cardsByClan[ALL][cardid] = {
              q: 0,
              c: cryptCardBase[cardid],
            };
          }

          const softUsedMax = getSoftMax(usedCrypt.soft[cardid]);

          missingByClan[clan][cardid] = {
            q: softUsedMax,
            c: cryptCardBase[cardid],
          };
          missingByClan[ALL][cardid] = {
            q: softUsedMax,
            c: cryptCardBase[cardid],
          };
        });

      Object.keys(usedCrypt.hard)
        .filter((cardid) => cardid < 210000 && !cards[cardid])
        .forEach((cardid) => {
          const clan = cryptCardBase[cardid].Clan;

          if (category !== 'ok' && !onlyNotes) {
            cardsByClan[clan][cardid] = {
              q: cards[cardid] ? cards[cardid].q : 0,
              c: cryptCardBase[cardid],
            };
            cardsByClan[ALL][cardid] = {
              q: cards[cardid] ? cards[cardid].q : 0,
              c: cryptCardBase[cardid],
            };
          }

          const hardUsedTotal = getHardTotal(usedCrypt.hard[cardid]);

          if (missingByClan[clan][cardid]) {
            missingByClan[clan][cardid].q += hardUsedTotal;
            missingByClan[ALL][cardid].q += hardUsedTotal;
          } else {
            missingByClan[clan][cardid] = {
              q: hardUsedTotal,
              c: cryptCardBase[cardid],
            };
            missingByClan[ALL][cardid] = {
              q: hardUsedTotal,
              c: cryptCardBase[cardid],
            };
          }
        });

      Object.keys(missingByClan).forEach((clan) => {
        Object.values(missingByClan[clan]).forEach((card) => {
          missingByClanTotal[clan] += card.q;
        });
      });
    }

    if (!compact) {
      Object.keys(cardsByClan).forEach((c) => {
        cardsByClanTotal[c] = 0;
        cardsByClanUnique[c] = 0;
      });

      Object.keys(cardsByClan).forEach((c) => {
        Object.keys(cardsByClan[c]).forEach((cardid) => {
          cardsByClanTotal[c] += cardsByClan[c][cardid].q;
          if (cardsByClan[c][cardid].q) {
            cardsByClanUnique[c] += 1;
          }
        });
      });
    }

    return {
      cardsByClan,
      cardsByClanTotal,
      cardsByClanUnique,
      missingByClan,
      missingByClanTotal,
    };
  }, [cards, category, compact, onlyNotes]);

  return value;
};

export default useInventoryCrypt;
