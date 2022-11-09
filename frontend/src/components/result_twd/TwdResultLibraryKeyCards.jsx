import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultLibraryName,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryClan,
  ResultModal,
  ConditionalOverlayTrigger,
} from 'components';
import { GROUPED_TYPE, ASCII_NAME } from 'utils/constants';
import { useApp, inventoryStore, usedStore } from 'context';
import { countCards, librarySort, getHardTotal } from 'utils';
import { useModalCardController } from 'hooks';

const TwdResultLibraryKeyCards = ({ library }) => {
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedLibrary = useSnapshot(usedStore).library;

  const sortedLibrary = librarySort(Object.values(library), GROUPED_TYPE);
  const libraryTotal = countCards(sortedLibrary);

  const keyCards = sortedLibrary.filter((card) => card.q >= 4);
  keyCards.sort((a, b) => a.c[ASCII_NAME] - b.c[ASCII_NAME]);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(keyCards);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  const cardRows = keyCards.map((card, idx) => {
    const handleClick = () => {
      handleModalCardOpen(idx);
      setShowFloatingButtons(false);
    };

    let inInventory = 0;
    let hardUsedTotal = 0;

    if (inventoryMode) {
      if (inventoryLibrary[card.c.Id]) {
        inInventory = inventoryLibrary[card.c.Id].q;
      }

      if (usedLibrary) {
        hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
      }
    }

    return (
      <tr key={card.c.Id} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
        {inventoryMode ? (
          <ConditionalOverlayTrigger
            overlay={<UsedPopover cardid={card.c.Id} />}
            disabled={isMobile}
          >
            <td className="quantity-no-buttons px-1">
              <div
                className={
                  inInventory < card.q
                    ? 'inv-miss-full'
                    : inInventory - hardUsedTotal < card.q
                    ? 'inv-miss-part'
                    : null
                }
              >
                {card.q}
              </div>
            </td>
          </ConditionalOverlayTrigger>
        ) : (
          <td className="quantity-no-buttons px-1">{card.q}</td>
        )}
        <td className="type" onClick={() => handleClick()}>
          <ResultLibraryTypeImage value={card.c.Type} />
        </td>

        <ConditionalOverlayTrigger
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile}
        >
          <td className="name px-1" onClick={() => handleClick()}>
            <ResultLibraryName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>

        {!isMobile && (
          <td className="disciplines" onClick={() => handleClick()}>
            <ResultLibraryDisciplines value={card.c.Discipline} />
            <ResultLibraryClan value={card.c.Clan} />
          </td>
        )}
      </tr>
    );
  });

  return (
    <>
      <div className="px-1">
        <b>{isMobile ? `Library [${libraryTotal}]` : 'Key cards:'}</b>
      </div>
      <div className="library">
        <table className="twd-library-table">
          <tbody>{cardRows}</tbody>
        </table>
      </div>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default TwdResultLibraryKeyCards;
