import React, { useMemo, useEffect } from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultCrypt,
  CryptSearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import {
  useApp,
  searchResults,
  setCryptResults,
  setCryptCompare,
  setDeck,
  deckStore,
} from 'context';

const Crypt = () => {
  const {
    showCryptSearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    lastDeckId,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const cryptResults = useSnapshot(searchResults).crypt;
  const cryptCompare = useSnapshot(searchResults).cryptCompare;
  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && cryptResults)) ||
      (isMobile && showCryptSearch)
    );
  }, [isMobile, isDesktop, addMode, showCryptSearch, cryptResults]);

  const showToggleAddMode = useMemo(() => {
    return deck && cryptResults && !isMobile && !isDesktop;
  }, [deck, isMobile, isDesktop, cryptResults]);

  const showResultCol = useMemo(() => !(isMobile && showCryptSearch));

  useEffect(() => {
    if (!deck && decks !== undefined && lastDeckId) {
      setDeck(decks[lastDeckId]);
    }
  }, [deck, decks, lastDeckId]);

  return (
    <div className="search-container mx-auto px-md-2 px-xl-4">
      <div className="flex flex-row">
        {!isMobile && (
          <div
            md={!showSearchForm ? 5 : 0}
            lg={!showSearchForm ? 6 : 1}
            xl={deck && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0"
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
            } 2xl:basis-5/12 px-0 px-md-2 py-md-3 px-xl-3`}
          >
            {((isMobile && cryptCompare && cryptResults) ||
              (!isMobile && cryptCompare)) && (
              <div className="pb-3">
                <ResultCrypt
                  cards={cryptCompare}
                  setCards={setCryptCompare}
                  inCompare
                />
              </div>
            )}
            {cryptResults !== undefined && (
              <ResultCrypt cards={cryptResults} setCards={setCryptResults} />
            )}
          </div>
        )}
        {showSearchForm && (
          <div
            className={`md:basis-5/12 xl=${
              deck && addMode ? '3/12' : '4/12'
            } 2xl:basis-1/4 p-1 px-md-2 py-md-3 pe-xl-0`}
          >
            <CryptSearchForm />
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

export default Crypt;
