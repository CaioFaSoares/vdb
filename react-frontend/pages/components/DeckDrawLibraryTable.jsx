import React, { useState } from 'react';
import OverlayTooltip from './OverlayTooltip.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';

const probability = (x, N, n, k) => {
  const factorial = n => {
    return n ? n * factorial(n - 1) : 1;
  }

  const combinations = (n, r) => {
    return factorial(n) / (factorial(r) * factorial(n - r))
  }

  const exactProbability = (i, N, n, k) => {
    return combinations(k, i) * combinations(N - k, n - i) / combinations(N, n)
  }

  let prob = 0;
  for (let i = 0; i <= n; i++ ) {
    if (i >= x && i <= k) {
      if (N - n < k) {
        prob = 1;
        continue;
      } else {
        prob += exactProbability(i, N, n, k)
      }
    }
  }
  if (0.99 < prob && prob < 1) { prob = 0.99}
  if (0 < prob && prob < 0.01) { prob = 0.01}
  return prob;
}

function DeckDrawLibraryTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);

  const N = props.total
  const n = props.resultCards.length

  const cardRows = props.resultCards.map((card, index) => {
    if (resultTrClass == 'library-result-even') {
      resultTrClass = 'library-result-odd';
    } else {
      resultTrClass = 'library-result-even';
    }

    const k = props.library[card['Id']].q

    const probText = (
      <div className="prob">
        <div className="d-flex justify-content-between">
          <div className="pr-2">1+</div>
          <div>{`${Math.floor(probability(1, N, n, k) * 100)}%`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">2+</div>
          <div>{k < 2 ? null : `${Math.floor(probability(2, N, n, k) * 100)}%`}</div>
        </div>
        <div className="d-flex justify-content-between">
          <div className="pr-2">3+</div>
          <div>{k < 3 ? null : `${Math.floor(probability(3, N, n, k) * 100)}%`}</div>
        </div>
      </div>
    );

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="cost py-0 px-1" onClick={() => setModalCard(card)}>
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => setModalCard(card)}>
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines px-1" onClick={() => setModalCard(card)}>
            <ResultLibraryDisciplines value={card['Discipline']} />
            <ResultLibraryClan value={card['Clan']} />
          </td>
          <td className="name px-1" onClick={() => setModalCard(card)}>
            <ResultLibraryName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          <td className="burn px-1" onClick={() => setModalCard(card)}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={card['Card Text']} />
          </td>
          <td className="prob px-1">
            <OverlayTooltip
              delay={{ show: 0, hide: 150 }}
              placement="right"
              text={probText}
            >
              <div>
                {`${Math.floor(probability(1, N, n, k) * 100)}%`}
              </div>
            </OverlayTooltip>
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
      {props.isMobile && modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
        />
      )}
    </>
  );
}

export default DeckDrawLibraryTable;
