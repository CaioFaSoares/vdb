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
  ConditionalTooltip,
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

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const cardRows = keyCards.map((card, idx) => {
    const inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
    const hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);

    return (
      <tr
        key={card.c.Id}
        className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
          idx % 2
            ? 'bg-bgThird dark:bg-bgThirdDark'
            : 'bg-bgPrimary dark:bg-bgPrimaryDark'
        }`}
      >
        {inventoryMode ? (
          <td className="quantity-no-buttons ">
            <ConditionalTooltip
              overlay={<UsedPopover cardid={card.c.Id} />}
              disabled={isMobile}
            >
              <div
                className={
                  inInventory < card.q
                    ? 'bg-bgError text-bgCheckbox dark:bg-bgErrorDark dark:text-bgCheckboxDark'
                    : inInventory - hardUsedTotal < card.q
                    ? 'bg-bgWarning dark:bg-bgWarningDark'
                    : null
                }
              >
                {card.q}
              </div>
            </ConditionalTooltip>
          </td>
        ) : (
          <td className="quantity-no-buttons ">{card.q}</td>
        )}
        <td className="type" onClick={() => handleClick(card.c)}>
          <ResultLibraryTypeImage value={card.c.Type} />
        </td>
        <td
          className="name"
          onClick={() => handleClick(card.c)}
        >
          <ConditionalTooltip
            overlay={<CardPopover card={card.c} />}
            disabled={isMobile}
          >
            <ResultLibraryName card={card.c} />
          </ConditionalTooltip>
        </td>
        {!isMobile && (
          <td className="disciplines" onClick={() => handleClick(card.c)}>
            {card.c.Discipline && (
              <ResultLibraryDisciplines value={card.c.Discipline} />
            )}
            {card.c.Clan && <ResultLibraryClan value={card.c.Clan} />}
          </td>
        )}
      </tr>
    );
  });

  return (
    <>
      <div className="font-bold">
        {isMobile ? `Library [${libraryTotal}]` : 'Key cards:'}
      </div>
      <div className="library">
        <table className="twd-table">
          <tbody>{cardRows}</tbody>
        </table>
      </div>
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleModalCardClose}
        />
      )}
    </>
  );
};

export default TwdResultLibraryKeyCards;
