import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Modal, Button, Container, Row, Col } from 'react-bootstrap';
import Shuffle from '../assets/images/icons/shuffle.svg'
import At from '../assets/images/icons/at.svg';
import PinAngleFill from '../assets/images/icons/pin-angle-fill.svg'
import InfoCircle from '../assets/images/icons/info-circle.svg';
import List from '../assets/images/icons/list.svg';
import X from '../assets/images/icons/x.svg';
import AlertMessage from './components/AlertMessage.jsx';
import DeckSelect from './components/DeckSelect.jsx';
import DeckSelectPrecon from './components/DeckSelectPrecon.jsx';
import DeckInfo from './components/DeckInfo.jsx';
import DeckButtons from './components/DeckButtons.jsx';
import DeckCrypt from './components/DeckCrypt.jsx';
import DeckLibrary from './components/DeckLibrary.jsx';
import DeckImport from './components/DeckImport.jsx';
import AccountLogin from './components/AccountLogin.jsx';
import AccountRegister from './components/AccountRegister.jsx';

function Decks(props) {
  const query = new URLSearchParams(useLocation().search);
  const [sharedDeckId, setSharedDeckId] = useState(query.get('id'));
  const [showInfo, setShowInfo] = useState(false);
  const [showButtons, setShowButtons] = useState(false);
  const { hash } = useLocation();
  const history = useHistory();

  const getDeckFromText = (input) => {
    const name = query.get('name') ? query.get('name') : undefined;
    const author = query.get('author') ? query.get('author') : undefined;
    const description = query.get('description')
          ? query.get('description')
          : undefined;
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
        }
      });
  };

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

  const toggleInventoryState = () => {
    const inventoryType = props.decks[props.activeDeck].inventory_type;
    if (!inventoryType) {
      deckUpdate(props.activeDeck, 'makeFlexible', 'all')
    } else if (inventoryType == "s") {
      deckUpdate(props.activeDeck, 'makeFixed', 'all')
    } else if (inventoryType == "h") {
      deckUpdate(props.activeDeck, 'makeClear', 'all')
    }
  }

  let isAuthor;
  if (props.decks[props.activeDeck]) {
    isAuthor = props.username == props.decks[props.activeDeck].owner;
  }

  useEffect(() => {
    if (hash) {
      const cards = {};
      hash
        .slice(1)
        .split(';')
        .map((i, index) => {
          const j = i.split('=');
          cards[j[0]] = parseInt(j[1]);
        });
      getDeckFromText(cards);
      setSharedDeckId('deckInUrl');
    }
  }, [hash]);

  useEffect(() => {
    if (sharedDeckId != 'deckInUrl') {
      sharedDeckId && getDeck(sharedDeckId);
    }
    sharedDeckId && props.setActiveDeck(undefined);
  }, [sharedDeckId]);

  useEffect(() => {
    if (props.activeDeck) {
      history.push('/decks');
    }
  }, [props.activeDeck]);

  return (
    <Container className={props.isMobile ? "deck-container" : "deck-container py-4"}>
      <Row>
        <Col lg={4} className="px-0">
          <Row className="align-items-center justify-content-end mx-0 pb-2">
            {props.username && (
              <>
                {Object.keys(props.decks).length > 0 ? (
                  <>
                    <Col lg={2} className="px-0 px-lg-3">
                      <h6>My Decks:</h6>
                    </Col>
                    <Col className="px-0 px-lg-3">
                      <div className={props.inventoryMode ? "d-flex" : "d-inline"}>
                        <div className="w-100">
                          <DeckSelect
                            decks={props.decks}
                            activeDeck={props.activeDeck}
                            setActiveDeck={props.setActiveDeck}
                            inventoryMode={props.inventoryMode}
                          />
                        </div>
                        {props.inventoryMode && props.decks[props.activeDeck] &&
                         <div className="d-flex pl-2">
                           <Button
                             variant='outline-secondary'
                             onClick={() => toggleInventoryState()}
                           >
                             <div className="d-flex align-items-center">
                               {!props.decks[props.activeDeck].inventory_type &&
                                <At/>
                               }
                               {props.decks[props.activeDeck].inventory_type == "s" &&
                                <Shuffle/>
                               }
                               {props.decks[props.activeDeck].inventory_type == "h" &&
                                <PinAngleFill/>
                               }
                             </div>
                           </Button>
                         </div>
                        }
                      </div>
                    </Col>
                  </>
                ) : (
                  <>
                    {props.isMobile && (
                      <Col className="px-0 px-lg-3">
                        <DeckImport
                          setActiveDeck={props.setActiveDeck}
                          getDecks={props.getDecks}
                          setShowInfo={setShowInfo}
                          setShowButtons={props.setShowButtons}
                        />
                      </Col>
                    )}
                  </>
                )}
                {(props.activeDeck || props.sharedDeck) && props.isMobile && (
                  <>
                    <Col
                      xs="auto"
                      className="d-flex justify-content-between align-items-center px-0 px-lg-3"
                    >
                      <Button
                        variant="outline-secondary"
                        onClick={() => setShowInfo(!showInfo)}
                      >
                        <InfoCircle />
                      </Button>
                    </Col>
                  </>
                )}
              </>
            )}
          </Row>
          {/* <Row className="mx-0 align-items-center"> */}
          {/*   <Col lg={2} className="px-0 px-lg-3"> */}
          {/*     <h6>Precon Decks:</h6> */}
          {/*   </Col> */}
          {/*   <Col> */}
          {/*     <div className="px-0"> */}
          {/*       <DeckSelectPrecon */}
          {/*         decks={props.preconDecks} */}
          {/*         activeDeck={props.activeDeck} */}
          {/*         setActiveDeck={props.setActiveDeck} */}
          {/*         inventoryMode={props.inventoryMode} */}
          {/*       /> */}
          {/*     </div> */}
          {/*   </Col> */}
          {/* </Row> */}
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
                isMobile={props.isMobile}
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
              centered={true}
            >
              <Modal.Body className="p-1">
                <Container className="px-0" fluid>
                  <Row className="px-0 pb-2">
                    <Col>
                      <button
                        type="button"
                        className="close m-1"
                        onClick={() => setShowButtons(false)}
                      >
                        <X width="32" height="32" viewBox="0 0 16 16" />
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
              cardAdd={props.cardAdd}
              cardChange={props.cardChange}
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
              cardBase={props.cryptCardBase}
              inventoryMode={props.inventoryMode}
              inventoryCrypt={props.inventory.crypt}
              decks={props.decks}
              usedCards={{
                soft: props.usedCards.softCrypt,
                hard: props.usedCards.hardCrypt,
              }}
              deckUpdate={deckUpdate}
            />
          </Col>
          <Col lg={5} className="px-0 px-lg-3">
            <DeckLibrary
              cardAdd={props.cardAdd}
              cardChange={props.cardChange}
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
              cardBase={props.libraryCardBase}
              inventoryMode={props.inventoryMode}
              inventoryLibrary={props.inventory.library}
              decks={props.decks}
              usedCards={{
                soft: props.usedCards.softLibrary,
                hard: props.usedCards.hardLibrary,
              }}
              deckUpdate={deckUpdate}
            />
          </Col>
        </Row>
      )}
      {props.sharedDeck && (
        <AlertMessage
          className="error-message"
          value={<b>NO DECK WITH THIS ID, MAYBE IT WAS REMOVED BY AUTHOR</b>}
        />
      )}
      {!(props.username || sharedDeckId) && (
        <Row className="h-75 align-items-center justify-content-center">
          <Col md={12} lg={5} className="px-0">
            <div className="d-flex justify-content-center pb-3">
              <h6>Login required to create decks</h6>
            </div>
            <AccountLogin
              setUsername={props.setUsername}
              isMobile={props.isMobile}
            />
            <AccountRegister
              setUsername={props.setUsername}
              whoAmI={props.whoAmI}
            />
          </Col>
        </Row>
      )}
      {props.isMobile && (
        <>
          <div
            onClick={() => setShowButtons(!showButtons)}
            className="float-right-bottom menu"
          >
            <div className="pt-2 float-menu">
              <List viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
    </Container>
  );
}

export default Decks;
