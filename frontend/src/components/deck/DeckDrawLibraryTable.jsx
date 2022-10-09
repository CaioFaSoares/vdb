import React, { useState } from 'react';
import {
  CardPopover,
  OverlayTooltip,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ResultLibraryTypeImage,
  DeckDrawProbabilityText,
  DeckDrawProbabilityModal,
  ConditionalOverlayTrigger,
} from 'components';

import { drawProbability } from 'utils';
import { useApp } from 'context';

const DeckDrawLibraryTable = ({
  handleClick,
  restCards,
  resultCards,
  ashHeap,
  placement,
}) => {
  const { nativeLibrary, isMobile } = useApp();
  const [modalDraw, setModalDraw] = useState(undefined);

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

  const cardRows = resultCards.map((card, idx) => {
    const k = nonPlayed[card.Id];

    return (
      <React.Fragment key={`${idx}-${card.Id}`}>
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          <td
            className={card['Blood Cost'] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick(idx)}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryTypeImage value={card.Type} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryClan value={card.Clan} />
            {card.Discipline && card.Clan && '+'}
            <ResultLibraryDisciplines value={card.Discipline} />
          </td>

          <ConditionalOverlayTrigger
            overlay={<CardPopover card={card} />}
            disabled={isMobile}
            placement={placement}
          >
            <td className="name px-1" onClick={() => handleClick(idx)}>
              <ResultLibraryName card={card} />
            </td>
          </ConditionalOverlayTrigger>

          <td className="burn px-1" onClick={() => handleClick(idx)}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
          </td>
          <td className="prob px-1">
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
                  <OverlayTooltip
                    placement={placement}
                    text={<DeckDrawProbabilityText N={N} n={n} k={k} />}
                  >
                    <div>{`${Math.floor(
                      drawProbability(1, N, n, k) * 100
                    )}%`}</div>
                  </OverlayTooltip>
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
      <table className="search-library-table">
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

export default DeckDrawLibraryTable;
