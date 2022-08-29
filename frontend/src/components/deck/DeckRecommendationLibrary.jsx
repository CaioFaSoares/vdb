import React from 'react';
import {
  ResultLibraryType,
  DeckRecommendationLibraryTable,
  ResultModal,
} from 'components';
import { useApp } from 'context';
import { librarySort, getCardsGroupedBy } from 'utils';
import { useModalCardController } from 'hooks';
import { GROUPED_TYPE, TYPE } from 'utils/constants';

const DeckRecommendationLibrary = ({ cards, activeDeck, isAuthor }) => {
  const { setShowFloatingButtons } = useApp();

  const sortedLibrary = librarySort(cards, GROUPED_TYPE);
  const libraryByType = getCardsGroupedBy(sortedLibrary, TYPE);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedLibrary);

  const handleCloseModal = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <>
      {Object.keys(libraryByType).map((cardtype) => (
        <div key={cardtype} className="pt-2">
          <div className="d-flex justify-content-between pe-2">
            <ResultLibraryType cardtype={cardtype} total={0} />
          </div>
          <DeckRecommendationLibraryTable
            className="deck-library-table"
            handleModalCardOpen={handleModalCardOpen}
            activeDeck={activeDeck}
            library={activeDeck.library}
            cards={libraryByType[cardtype]}
            isAuthor={isAuthor}
          />
        </div>
      ))}

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

export default DeckRecommendationLibrary;
