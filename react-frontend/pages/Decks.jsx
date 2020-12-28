import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import ChevronExpand from '../assets/images/icons/chevron-expand.svg';
import List from '../assets/images/icons/list.svg';
import AlertMessage from './components/AlertMessage.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckInfo from './components/DeckInfo.jsx';
import DeckButtons from './components/DeckButtons.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import DeckImport from './components/DeckImport.jsx';

function Decks(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeckId, setSharedDeckId] = useState(query.get('id'));
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { hash } = useLocation();

  const getDeckFromText = (input) => {
    const name = query.get('name') ? query.get('name') : undefined
    const author = query.get('author') ? query.get('author') : undefined
    const description = query.get('description') ? query.get('description') : undefined
    const url = `${process.env.API_URL}deck/parse`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        cards: input,
        name: name,
        author: author,
        description: description,
      }),
    };

    const fetchPromise = fetch(url, options);
    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          props.setSharedDeck(data);
        } else {
          console.log('error: ', data.error);
        }
      })
  }

  const getDeck = (deckid) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        if (data.error === undefined) {
          props.setSharedDeck(data);
        } else {
          console.log('error: ', data.error);
        }
      });
  };

  const deckUpdate = (deckid, field, value) => {
    const url = `${process.env.API_URL}deck/${deckid}`;
    const options = {
      method: 'PUT',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ [field]: value }),
    };

    fetch(url, options).then(() => props.getDecks());
  };

  let isAuthor;
  if (props.decks[props.activeDeck]) {
    isAuthor = props.username == props.decks[props.activeDeck].owner;
  }

  useEffect(() => {
    if (hash) {
      const cards = {};
      hash.slice(1).split(';').map((i, index) => {
        const j = i.split('=');
        cards[j[0]] = parseInt(j[1]);
      })
      getDeckFromText(cards);
      setSharedDeckId('deckInUrl');
    }
  }, [hash])

  useEffect(() => {
    if (sharedDeckId != 'deckInUrl') {
      sharedDeckId && getDeck(sharedDeckId);
    }
    sharedDeckId && props.setActiveDeck(undefined);
  }, [sharedDeckId]);

  useEffect(() => {
    if (props.activeDeck) { history.push('/decks') };
  }, [props.activeDeck]);

  const history = useHistory();

  return (
    <Container className="deck-container">
      <Row>
        <Col lg={4} className="px-0">
          <Row className="justify-content-end mx-0">
            <Col className="px-0 px-lg-3">
              <DeckSelect
                decks={props.decks}
                activeDeck={props.activeDeck}
                setActiveDeck={props.setActiveDeck}
              />
            </Col>
            {props.isMobile &&
             (props.activeDeck || props.sharedDeck ? (
               <Col
                 xs="auto"
                 className="d-flex justify-content-between align-items-center px-0 px-lg-3"
               >
                 <Button
                   className="full-height"
                   variant="outline-secondary"
                   onClick={() => setShowInfo(!showInfo)}
                 >
                   <ChevronExpand />
                 </Button>
                 <Button
                   className="full-height"
                   variant="outline-secondary"
                   onClick={() => setShowButtons(!showButtons)}
                 >
                   <List />
                 </Button>
               </Col>
             ) : (
               <Col className="px-0 px-lg-3">
                 <DeckImport
                   setActiveDeck={props.setActiveDeck}
                   getDecks={props.getDecks}
                   setShowInfo={setShowInfo}
                   setShowButtons={props.setShowButtons}
                 />
               </Col>
             ))}
          </Row>
        </Col>
        <Col lg={6} className="px-0 px-lg-3">
          {(showInfo ||
            (!props.isMobile && (props.activeDeck || props.sharedDeck))) && (
              <DeckInfo
                deck={
                  props.activeDeck
                    ? props.decks[props.activeDeck]
                    : props.sharedDeck
                    ? props.sharedDeck[sharedDeckId]
                    : null
                }
                deckUpdate={deckUpdate}
                username={props.username}
                isAuthor={isAuthor}
              />
            )}
        </Col>
        <Col lg={2} className="px-0 px-lg-3">
          {!props.isMobile && (
            <DeckButtons
              isActive={props.decks[props.activeDeck] || props.sharedDeck}
              isMobile={props.isMobile}
              isAuthor={isAuthor}
              username={props.username}
              deck={
                props.activeDeck
                  ? props.decks[props.activeDeck]
                  : props.sharedDeck
                  ? props.sharedDeck[sharedDeckId]
                  : null
              }
              getDecks={props.getDecks}
              activeDeck={props.activeDeck ? props.activeDeck : sharedDeckId}
              setActiveDeck={props.setActiveDeck}
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              setShowInfo={setShowInfo}
              setShowButtons={setShowButtons}
            />
          )}
          {showButtons && (
            <Modal
              show={showButtons}
              onHide={() => setShowButtons(false)}
              animation={false}
            >
              <Modal.Body>
                <Container className="px-0" fluid>
                  <Row className="px-0 pb-2">
                    <Col>
                      <button
                        type="button"
                        className="close"
                        onClick={() => setShowButtons(false)}
                      >
                        <span aria-hidden="true">×</span>
                        <span className="sr-only">Close</span>
                      </button>
                    </Col>
                  </Row>
                  <DeckButtons
                    isActive={props.decks[props.activeDeck] || props.sharedDeck}
                    isMobile={props.isMobile}
                    isAuthor={isAuthor}
                    username={props.username}
                    deck={
                      props.activeDeck
                        ? props.decks[props.activeDeck]
                        : props.sharedDeck
                        ? props.sharedDeck[sharedDeckId]
                        : null
                    }
                    getDecks={props.getDecks}
                    activeDeck={
                      props.activeDeck ? props.activeDeck : sharedDeckId
                    }
                    setActiveDeck={props.setActiveDeck}
                    showImage={props.showImage}
                    setShowImage={props.setShowImage}
                    setShowInfo={setShowInfo}
                    setShowButtons={setShowButtons}
                  />
                </Container>
              </Modal.Body>
            </Modal>
          )}
        </Col>
      </Row>
      {(props.decks[props.activeDeck] || props.sharedDeck) && (
        <Row>
          <Col lg={7} className="px-0 px-lg-3">
            <DeckCrypt
              changeTimer={props.changeTimer}
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck]
                  ? props.decks[props.activeDeck].crypt
                  : {}
                : props.sharedDeck
                  ? props.sharedDeck[sharedDeckId]
                  ? props.sharedDeck[sharedDeckId].crypt
                  : {}
                : {}
              }
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isAuthor={isAuthor}
              isMobile={props.isMobile}
              isWide={props.isWide}
            />
          </Col>
          <Col lg={5} className="px-0 px-lg-3">
            <DeckLibrary
              deckCardAdd={props.deckCardAdd}
              deckCardChange={props.deckCardChange}
              deckid={props.activeDeck ? props.activeDeck : sharedDeckId}
              cards={
                props.activeDeck
                  ? props.decks[props.activeDeck]
                  ? props.decks[props.activeDeck].library
                  : {}
                : props.sharedDeck
                  ? props.sharedDeck[sharedDeckId]
                  ? props.sharedDeck[sharedDeckId].library
                  : {}
                : {}
              }
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              isAuthor={isAuthor}
              isMobile={props.isMobile}
              isWide={props.isWide}
            />
          </Col>
        </Row>
      )}
      {props.sharedDeck ? (
        <AlertMessage
          className="error-message"
          value={<b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>}
        />
      ) : null}
    </Container>
  );
}

export default Decks;
