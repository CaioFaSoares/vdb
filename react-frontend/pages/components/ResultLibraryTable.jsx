import React, { useState, useContext } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import ButtonAddCard from './ButtonAddCard.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';
import ResultLibraryType from './ResultLibraryType.jsx';
import AppContext from '../../context/AppContext.js';

function ResultLibraryTable(props) {
  const {
    activeDeck,
    inventoryLibrary,
    usedLibraryCards,
    addMode,
    inventoryMode,
    nativeLibrary,
    isMobile,
  } = useContext(AppContext);

  const [modalCardIdx, setModalCardIdx] = useState(undefined);

  let resultTrClass;

  const handleModalCardChange = (d) => {
    const maxIdx = props.resultCards.length - 1;

    if (modalCardIdx + d < 0) {
      setModalCardIdx(maxIdx);
    } else if (modalCardIdx + d > maxIdx) {
      setModalCardIdx(0);
    } else {
      setModalCardIdx(modalCardIdx + d);
    }
  };

  const cardRows = props.resultCards.map((card, index) => {
    const handleClick = () => {
      setModalCardIdx(index);
      isMobile && props.setShowFloatingButtons(false);
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    const inDeck =
      (props.library &&
        props.library[card['Id']] &&
        props.library[card['Id']].q) ||
      0;

    let softUsedMax = 0;
    let hardUsedTotal = 0;

    let inInventory = 0;

    if (inventoryMode) {
      if (inventoryLibrary[card['Id']]) {
        inInventory = inventoryLibrary[card['Id']].q;
      }

      if (usedLibraryCards.soft[card['Id']]) {
        Object.keys(usedLibraryCards.soft[card['Id']]).map((id) => {
          if (softUsedMax < usedLibraryCards.soft[card['Id']][id]) {
            softUsedMax = usedLibraryCards.soft[card['Id']][id];
          }
        });
      }

      if (usedLibraryCards.hard[card['Id']]) {
        Object.keys(usedLibraryCards.hard[card['Id']]).map((id) => {
          hardUsedTotal += usedLibraryCards.hard[card['Id']][id];
        });
      }
    }

    return (
      <React.Fragment key={card['Id']}>
        <tr className={resultTrClass}>
          {activeDeck.deckid && addMode && (
            <td className="quantity-add pe-1">
              <ButtonAddCard
                cardid={card['Id']}
                deckid={props.activeDeck.deckid}
                card={card}
                inDeck={inDeck}
              />
            </td>
          )}
          {inventoryMode && (
            <OverlayTrigger
              placement="left"
              overlay={<UsedPopover cardid={card['Id']} />}
            >
              <td className="quantity">
                <div
                  className={
                    inInventory < softUsedMax + hardUsedTotal
                      ? 'd-flex align-items-center justify-content-center quantity px-1 ms-1 inv-miss-full'
                      : 'd-flex align-items-center justify-content-center quantity px-1 ms-1'
                  }
                >
                  {inInventory > 0 ? (
                    <>
                      <div className="pe-1 opacity-035">
                        <ArchiveFill
                          width="14"
                          height="14"
                          viewBox="0 0 16 16"
                        />
                      </div>
                      {inInventory}
                    </>
                  ) : (
                    <>&nbsp;&nbsp;</>
                  )}
                </div>
              </td>
            </OverlayTrigger>
          )}
          <td
            className={card['Blood Cost'] ? 'cost blood px-1' : 'cost px-1'}
            onClick={() => handleClick()}
          >
            <ResultLibraryCost
              valueBlood={card['Blood Cost']}
              valuePool={card['Pool Cost']}
            />
          </td>
          <td className="type px-1" onClick={() => handleClick()}>
            <ResultLibraryType cardtype={card['Type']} />
          </td>
          <td className="disciplines px-1" onClick={() => handleClick()}>
            <ResultLibraryDisciplines value={card['Discipline']} />
            <ResultLibraryClan value={card['Clan']} />
          </td>
          {!isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={<CardPopover card={card} />}
            >
              <td className="name px-1" onClick={() => handleClick()}>
                <ResultLibraryName card={card} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name px-1" onClick={() => handleClick()}>
              <ResultLibraryName card={card} />
            </td>
          )}
          <td className="burn px-1" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card['Burn Option']} />
            <ResultLibraryTrifle value={nativeLibrary[card.Id]['Card Text']} />
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
      {modalCardIdx !== undefined && (
        <ResultLibraryModal
          card={props.resultCards[modalCardIdx]}
          handleModalCardChange={handleModalCardChange}
          handleClose={() => {
            setModalCardIdx(undefined);
            isMobile && props.setShowFloatingButtons(true);
          }}
        />
      )}
    </>
  );
}

export default ResultLibraryTable;
