import React, { useState, useEffect } from 'react';
import { Container, Tabs, Tab, Accordion } from 'react-bootstrap';
import { TwdHallFameCardsPlayer } from 'components';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const TwdHallOfFameCards = (props) => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [players, setPlayers] = useState(undefined);
  const [tab, setTab] = useState('total');

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      const url = `${process.env.ROOT_URL}twd_cards_history.json`;
      const options = {
        method: 'GET',
        mode: 'cors',
        credentials: 'include',
      };

      fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          const p = {};

          Object.keys(data).map((cardid) => {
            const cardBase = cardid > 200000 ? cryptCardBase : libraryCardBase;
            const card = cardBase[cardid];
            const player = data[cardid].player;
            const deckid = data[cardid].deckid;

            let releaseDate = null;
            const twdDate = data[cardid].twd_date;

            Object.keys(card.Set)
              .filter((set) => set !== 'POD')
              .map((set) => {
                const d =
                  set === 'Promo'
                    ? Object.keys(card.Set.Promo)[0]
                    : setsAndPrecons[set].date;

                if (!releaseDate || releaseDate > d) {
                  releaseDate = d;
                }
              });

            if (twdDate) {
              if (!p[player]) {
                p[player] = {
                  [cardid]: {
                    ...card,
                    deckid: deckid,
                    twdDate: twdDate,
                    releaseDate: releaseDate,
                  },
                };
              } else {
                p[player][cardid] = {
                  ...card,
                  deckid: deckid,
                  twdDate: twdDate,
                  releaseDate: releaseDate,
                };
              }
            }
          });

          setPlayers(p);
        });
    }
  }, [cryptCardBase, libraryCardBase]);

  const byTotal = (a, b) => {
    return Object.keys(players[b]).length - Object.keys(players[a]).length;
  };

  const isInnovation = (card) => {
    const INNOVATION_PERIOD = 2 * 365;
    const FIRST_TOURNAMENT_DATE = '1997-04-11';
    const MS_TO_DAYS = 1000 * 60 * 60 * 24;

    const twdAppearanceDelay =
      (new Date(card.twdDate) - new Date(card.releaseDate)) / MS_TO_DAYS;

    if (
      (new Date(card.twdDate) - new Date(FIRST_TOURNAMENT_DATE)) / MS_TO_DAYS <
      INNOVATION_PERIOD
    ) {
      return false;
    }

    return twdAppearanceDelay > INNOVATION_PERIOD;
  };

  const getInnovationCards = (cards) => {
    const innovationCards = {};
    Object.values(cards).map((card) => {
      if (isInnovation(card)) {
        innovationCards[card.Id] = card;
      }
    });
    return innovationCards;
  };

  const byInnovation = (a, b) => {
    return (
      Object.keys(getInnovationCards(players[b])).length -
      Object.keys(getInnovationCards(players[a])).length
    );
  };

  const byName = (a, b) => {
    return a.localeCompare(b);
  };

  return (
    <Container className="hof-cards-container px-0 p-md-3">
      <Tabs
        activeKey={tab}
        onSelect={(k) => setTab(k)}
        justify
        transition={false}
      >
        <Tab eventKey="total" title="By Total">
          {players && (
            <Accordion alwaysOpen>
              {Object.keys(players)
                .sort(byName)
                .sort(byTotal)
                .map((player) => (
                  <TwdHallFameCardsPlayer
                    key={player}
                    name={player}
                    cards={players[player]}
                  />
                ))}
            </Accordion>
          )}
        </Tab>
        <Tab eventKey="innovation" title="By Innovation">
          {players && (
            <Accordion alwaysOpen>
              {Object.keys(players)
                .sort(byName)
                .sort(byInnovation)
                .filter(
                  (player) =>
                    Object.keys(getInnovationCards(players[player])).length
                )
                .map((player) => (
                  <TwdHallFameCardsPlayer
                    key={player}
                    name={player}
                    cards={getInnovationCards(players[player])}
                  />
                ))}
            </Accordion>
          )}
        </Tab>
      </Tabs>
    </Container>
  );
};

export default TwdHallOfFameCards;
