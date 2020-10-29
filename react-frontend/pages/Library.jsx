import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import AlertMessage from './components/AlertMessage.jsx';
import ResultLibrary from './components/ResultLibrary.jsx';
import SearchLibraryForm from './components/SearchLibraryForm.jsx';
import DeckPreview from './components/DeckPreview.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckShowCrypt from './components/DeckShowCrypt.jsx';
import DeckShowLibrary from './components/DeckShowLibrary.jsx';

function Library(props) {
  const [sortMethod, setSortMethod] = useState('Default');

  useEffect(() => {
    if (props.isMobile && props.results && props.results.length > 0) {
      props.setShowCols({
        result: true,
      });
    }
    if (props.isMobile && !props.results) {
      props.setShowCols({
        search: true,
      });
    }
  }, [props.results]);

  return (
    <Container className="main-container px-0">
      <Row>
        {props.showCols.deck && (
          <Col md={12} xl={4}>
            {Object.keys(props.decks).length > 0 && (
              <DeckSelect
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
            )}
            {props.activeDeck && (
              props.isWide
                ? <>
                    <DeckShowCrypt
                      deckCardAdd={props.deckCardAdd}
                      deckCardChange={props.deckCardChange}
                      deckid={props.activeDeck}
                      cards={props.decks[props.activeDeck].crypt}
                      showImage={props.showImage}
                      toggleImage={props.toggleImage}
                      isAuthor={true}
                    />
                    <DeckShowLibrary
                      deckCardAdd={props.deckCardAdd}
                      deckCardChange={props.deckCardChange}
                      deckid={props.activeDeck}
                      cards={props.decks[props.activeDeck].library}
                      showImage={props.showImage}
                      toggleImage={props.toggleImage}
                      isAuthor={true}
                    />
                  </>
              : <DeckPreview
                  showImage={props.showImage}
                  toggleImage={props.toggleImage}
                  deck={props.decks[props.activeDeck]}
                  getDecks={props.getDecks}
                  deckCardChange={props.deckCardChange}
/>
            )}
          </Col>
        )}
        {props.showCols.result && (
          <Col md={12} xl={5}>
            {props.results != undefined && props.results != null && (
              <ResultLibrary
                showImage={props.showImage}
                toggleImage={props.toggleImage}
                deckCardAdd={props.deckCardAdd}
                cards={props.results}
                library={(props.decks && props.decks[props.activeDeck]) && props.decks[props.activeDeck].library}
                activeDeck={props.activeDeck}
                showSort={true}
                showTotal={true}
                sortMethod={sortMethod}
                setSortMethod={setSortMethod}
              />
            )}
            {props.results === null && (
              <AlertMessage className="error-message">
                <>
                  <b>NO CARDS FOUND</b>
                </>
              </AlertMessage>
            )}
          </Col>
        )}
        {props.showCols.search && (
          <>
            <Col md={12} xl={3}>
              <SearchLibraryForm setResults={props.setResults} />
            </Col>
          </>
        )}
      </Row>
    </Container>
  );
}

export default Library;
