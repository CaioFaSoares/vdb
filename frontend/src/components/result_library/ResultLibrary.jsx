import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import X from 'assets/images/icons/x.svg';
import Plus from 'assets/images/icons/plus.svg';
import { ResultLibraryTable, ResultLibraryTotal } from 'components';
import { librarySort } from 'utils';
import { useApp } from 'context';

const ResultLibrary = ({ cards, setCards, isAuthor, inCompare }) => {
  const {
    showLibrarySearch,
    setShowLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    librarySearchSort,
    changeLibrarySearchSort,
    showFloatingButtons,
  } = useApp();

  const navigate = useNavigate();

  const sortMethods = {
    'Clan / Discipline': 'C/D',
    'Cost - Max to Min': 'C↓',
    'Cost - Min to Max': 'C↑',
    Name: 'N',
    Type: 'T',
  };

  const handleClear = () => {
    clearSearchForm('library');
    setCards(undefined);
    setShowLibrarySearch(true);
  };

  const sortedCards = useMemo(
    () => librarySort(cards, librarySearchSort),
    [cards, librarySearchSort]
  );

  return (
    <>
      {!isMobile && (cards === null || cards.length === 0) && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>{cards === null ? 'CONNECTION PROBLEM' : 'NO CARDS FOUND'}</b>
        </div>
      )}
      {cards && cards.length > 0 && (
        <>
          <ResultLibraryTotal
            inCompare={inCompare}
            cards={cards}
            sortMethods={sortMethods}
            sortMethod={librarySearchSort}
            setSortMethod={changeLibrarySearchSort}
          />
          <ResultLibraryTable
            resultCards={sortedCards}
            placement={
              isDesktop || (!isDesktop && !addMode) ? 'right' : 'bottom'
            }
          />
        </>
      )}
      {isMobile && showFloatingButtons && (
        <div
          onClick={handleClear}
          className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
        >
          <X viewBox="0 0 16 16" />
        </div>
      )}
      {isMobile && showFloatingButtons && isAuthor && (
        <div
          onClick={() => toggleAddMode()}
          className={`d-flex float-right-middle float-add-${
            addMode ? 'on' : 'off'
          } align-items-center justify-content-center`}
        >
          <Plus viewBox="0 0 16 16" />
        </div>
      )}
    </>
  );
};

export default ResultLibrary;
