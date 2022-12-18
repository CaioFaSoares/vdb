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

const DeckRecommendationLibrary = ({ cards }) => {
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

  return (
    <>
      {Object.keys(libraryByType).map((cardtype) => (
        <div key={cardtype}>
          <div className="flex justify-between ">
            <ResultLibraryType cardtype={cardtype} total={0} />
          </div>
          <DeckRecommendationLibraryTable
            handleModalCardOpen={handleModalCardOpen}
            cards={libraryByType[cardtype]}
          />
        </div>
      ))}

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

export default DeckRecommendationLibrary;
