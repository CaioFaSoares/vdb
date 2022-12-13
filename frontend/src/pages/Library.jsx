import React, { useMemo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import {
  useApp,
  searchResults,
  setLibraryResults,
  setLibraryCompare,
  setDeck,
  deckStore,
} from 'context';

const Library = () => {
  const {
    showLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    lastDeckId,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const libraryResults = useSnapshot(searchResults).library;
  const libraryCompare = useSnapshot(searchResults).libraryCompare;
  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && showLibrarySearch)
    );
  }, [isMobile, isDesktop, addMode, showLibrarySearch, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && libraryResults && !isMobile && !isDesktop;
  }, [deck, isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && showLibrarySearch));

  useEffect(() => {
    if (!deck && decks !== undefined && lastDeckId) {
      setDeck(decks[lastDeckId]);
    }
  }, [deck, decks, lastDeckId]);

  const X_SPACING = 'space-x-8';
  const TOP_SPACING = 'pt-8';

  return (
    <div className="search-container mx-auto">
      <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
        {!isMobile && (
          <div
            className={`${
              showSearchForm
                ? 'md:basis-0/12 lg:basis-1/12'
                : 'md:basis-5/12 lg:basis-6/12'
            } ${deck && addMode ? 'xl:basis:4/12' : 'xl:basis2/12'}`}
          >
            {decks !== undefined &&
              (isDesktop || (!isDesktop && !showSearchForm)) && (
                <DeckSelectorAndDisplay />
              )}
          </div>
        )}
        {showResultCol && (
          <div
            className={`md:basis-7/12 lg:basis-1/2 xl:${
              deck && addMode ? '5/12' : '6/12'
            }  2xl:basis-5/12`}
          >
            {((isMobile && libraryCompare && libraryResults) ||
              (!isMobile && libraryCompare)) && (
              <div>
                <ResultLibrary
                  cards={libraryCompare}
                  setCards={setLibraryCompare}
                  inCompare
                />
              </div>
            )}
            {libraryResults !== undefined && (
              <ResultLibrary
                cards={libraryResults}
                setCards={setLibraryResults}
              />
            )}
          </div>
        )}
        {showSearchForm && (
          <div
            className={`md:basis-5/12 xl:${
              deck && addMode ? '3/12' : '4/12'
            }    2xl:basis-1/4`}
          >
            <LibrarySearchForm />
          </div>
        )}
      </div>
      {showToggleAddMode && (
        <ToogleSearchAddButton
          addMode={addMode}
          toggleAddMode={toggleAddMode}
        />
      )}
    </div>
  );
};

export default Library;
