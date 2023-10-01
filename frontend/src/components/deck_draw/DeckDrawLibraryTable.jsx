import React from 'react';
import { ResultLibraryTableRowCommon, DeckDrawProbability } from '@/components';

const DeckDrawLibraryTable = ({
  handleClick,
  shouldShowModal,
  restCards,
  resultCards,
  ashHeap,
}) => {
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

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {resultCards.map((card, idx) => {
          return (
            <tr
              key={`${idx}-${card.Id}`}
              className={`h-[38px] border-y border-bgSecondary dark:border-bgSecondaryDark ${
                idx % 2
                  ? 'bg-bgThird dark:bg-bgThirdDark'
                  : 'bg-bgPrimary dark:bg-bgPrimaryDark'
              }`}
            >
              <ResultLibraryTableRowCommon
                card={card}
                handleClick={() => handleClick(idx)}
                shouldShowModal={shouldShowModal}
              />
              <td className="min-w-[45px] p-1 text-right text-fgSecondary  dark:text-fgSecondaryDark">
                {!ashHeap && (
                  <DeckDrawProbability
                    cardName={card.Name}
                    N={N}
                    n={n}
                    k={nonPlayed[card.Id]}
                  />
                )}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckDrawLibraryTable;
