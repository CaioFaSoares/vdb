import React, { useState } from 'react';
import {
  Tooltip,
  ResultCryptTableRowCommon,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
} from 'components';

import { drawProbability } from 'utils';
import { useApp } from 'context';
import { useKeyDisciplines } from 'hooks';

const DeckDrawCryptTable = ({
  handleClick,
  restCards,
  resultCards,
  ashHeap,
  crypt,
}) => {
  const { isMobile } = useApp();
  const [modalDraw, setModalDraw] = useState();

  let N = 0;
  let n = 0;
  const nonPlayed = {};

  if (restCards && resultCards) {
    N = restCards.length + resultCards.length;
    n = resultCards.length;

    [...restCards, ...resultCards].forEach((c) => {
      if (c.Id in nonPlayed) {
        nonPlayed[c.Id] += 1;
      } else {
        nonPlayed[c.Id] = 1;
      }
    });
  }

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(crypt);

  const cardRows = resultCards.map((card, idx) => {
    const k = nonPlayed[card.Id];

    return (
      <React.Fragment key={`${idx}-${card.Id}`}>
        <tr
          className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
            idx % 2
              ? 'bg-bgThird dark:bg-bgThirdDark'
              : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          } `}
        >
          <ResultCryptTableRowCommon
            card={card}
            handleClick={handleClick}
            maxDisciplines={maxDisciplines}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            disciplinesSet={disciplinesSet}
            inDeck
          />
          <td className="w-9 text-right text-fgSecondary  dark:text-fgSecondaryDark">
            {!ashHeap && (
              <>
                {isMobile ? (
                  <div
                    onClick={() =>
                      setModalDraw({
                        name: card['Name'],
                        prob: <DeckDrawProbabilityText N={N} n={n} k={k} />,
                      })
                    }
                  >
                    {`${Math.floor(drawProbability(1, N, n, k) * 100)}%`}
                  </div>
                ) : (
                  <Tooltip
                    placement="right"
                    text={<DeckDrawProbabilityText N={N} n={n} k={k} />}
                  >
                    <div>{`${Math.floor(
                      drawProbability(1, N, n, k) * 100
                    )}%`}</div>
                  </Tooltip>
                )}
              </>
            )}
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table
        className={`border-bgSecondary dark:border-bgSecondaryDark sm:border ${
          ashHeap ? 'search-crypt-table' : 'deck-crypt-table'
        }`}
      >
        <tbody>{cardRows}</tbody>
      </table>
      {modalDraw && (
        <DeckDrawProbabilityModal
          modalDraw={modalDraw}
          setModalDraw={setModalDraw}
        />
      )}
    </>
  );
};

export default DeckDrawCryptTable;
