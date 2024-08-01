import React, { useState } from 'react';
import { CardImage, Modal, ConditionalTooltip } from '@/components';
import setsAndPrecons from '@/assets/data/setsAndPrecons.json';
import { useApp } from '@/context';
import { POD, PLAYTEST, PROMO } from '@/utils/constants';

const PreconsDetailed = ({ sets, set }) => {
  return Object.keys(sets[set]).map((i, idx) => {
    const abbrevs = {
      U: 'Uncommon',
      R: 'Rare',
      C: 'Common',
      V: 'Vampire',
    };

    if (setsAndPrecons[set].precons?.[i]) {
      return (
        <li key={idx}>
          {setsAndPrecons[set].precons[i].name} - {sets[set][i]}x
        </li>
      );
    } else {
      if (set === PROMO) {
        return <li key={idx}>{i}</li>;
      } else if (i !== 'DTC') {
        return <li key={idx}>{abbrevs[i]}</li>;
      }
    }
  });
};

const PopoverText = ({ card, set, handleClose }) => {
  return (
    <div className="flex max-w-[400px] flex-col">
      <div className="flex flex-col gap-1 p-3">
        <div>
          <b>{setsAndPrecons[set].name}</b>
          {![POD, PROMO, PLAYTEST].includes(set) && ' - ' + setsAndPrecons[set].date.slice(0, 4)}
        </div>
        {![POD, PROMO].includes(set) && (
          <ul className="space-y-1">
            <PreconsDetailed sets={card.Set} set={set} />
          </ul>
        )}
      </div>
      <CardImage
        className="h-auto w-full"
        card={card}
        set={set !== POD && set.toLowerCase()}
        onClick={handleClose}
      />
    </div>
  );
};

const ResultLayoutTextSets = ({ card }) => {
  const { playtestMode, isMobile } = useApp();
  const [selectedSet, setSelectedSet] = useState();
  const handleClose = () => setSelectedSet(null);
  const byDate = (a, b) => {
    return setsAndPrecons[a].date > setsAndPrecons[b].date;
  };

  return (
    <>
      <div className="flex flex-wrap gap-x-2.5 gap-y-0.5">
        {Object.keys(card.Set)
          .filter((set) => playtestMode || set !== PLAYTEST)
          .toSorted(byDate)
          .map((set) => {
            const preconsShort = Object.keys(card.Set[set]).join('/');

            return (
              <div className="inline-block whitespace-nowrap" key={set}>
                <ConditionalTooltip
                  disabled={isMobile}
                  overlay={<PopoverText card={card} set={set} handleClose={handleClose} />}
                  placement="bottom"
                  noPadding
                >
                  <div
                    className="inline text-fgSecondary dark:text-fgPrimaryDark"
                    onClick={() => isMobile && setSelectedSet(set)}
                  >
                    {set}
                    <div className="inline text-midGray dark:text-midGrayDark">
                      {preconsShort ? `:${preconsShort}` : null}
                    </div>
                  </div>
                </ConditionalTooltip>
              </div>
            );
          })}
      </div>
      {selectedSet && (
        <Modal size="xs" noPadding handleClose={handleClose} title="Sets" centered>
          <PopoverText card={card} set={selectedSet} handleClose={handleClose} />
        </Modal>
      )}
    </>
  );
};

export default ResultLayoutTextSets;
