import React, { useMemo } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import {
  ResultLibrary,
  LibrarySearchForm,
  DeckSelectorAndDisplay,
  ToogleSearchAddButton,
} from 'components';
import { useApp, useSearchResults } from 'context';

function Library({ lastDeckId }) {
  const {
    deckRouter,
    showLibrarySearch,
    addMode,
    toggleAddMode,
    isMobile,
    isDesktop,
    activeDeck,
  } = useApp();

  const { libraryResults } = useSearchResults();

  const myActiveDeck = {
    src: 'my',
    deckid: activeDeck.src == 'my' ? activeDeck.deckid : lastDeckId,
  };

  const deckData = deckRouter(myActiveDeck);

  const deckId = myActiveDeck.deckid;

  const showSearchForm = useMemo(() => {
    return (
      isDesktop ||
      (!isDesktop && !isMobile && !(addMode && libraryResults)) ||
      (isMobile && showLibrarySearch)
    );
  }, [isMobile, isDesktop, addMode, showLibrarySearch, libraryResults]);

  const showToggleAddMode = useMemo(() => {
    return deckId && libraryResults && !isMobile && !isDesktop;
  }, [deckId, isMobile, isDesktop, libraryResults]);

  const showResultCol = useMemo(() => !(isMobile && showLibrarySearch));

  return (
    <Container className="main-container px-md-2 px-xl-4">
      <Row>
        {!isMobile && (
          <Col
            md={!showSearchForm ? 5 : 1}
            lg={!showSearchForm ? 6 : 1}
            xl={deckId && addMode ? 4 : 2}
            className="px-md-2 ps-xl-0 pb-md-3"
          >
            {deckData && (isDesktop || (!isDesktop && !showSearchForm)) && (
              <DeckSelectorAndDisplay deckData={deckData} />
            )}
          </Col>
        )}
        {showResultCol && (
          <Col md={7} lg={6} xl={5} className={'px-0 px-md-2 px-xl-3 py-md-3'}>
            {libraryResults && (
              <ResultLibrary
                library={deckData && deckData.library}
                activeDeck={myActiveDeck}
              />
            )}
          </Col>
        )}
        {showSearchForm && (
          <Col md={4} lg={4} xl={3} className={'p-1 px-md-2 pe-xl-0 py-md-3'}>
            <LibrarySearchForm />
          </Col>
        )}
      </Row>
      {showToggleAddMode && (
        <ToogleSearchAddButton
          addMode={addMode}
          toggleAddMode={toggleAddMode}
        />
      )}
    </Container>
  );
}

export default Library;
