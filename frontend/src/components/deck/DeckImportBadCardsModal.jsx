import React, { useEffect, useState } from 'react';
import { Row, Col, Modal, Button } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { useApp, deckCardChange } from 'context';
import { DeckCardQuantity, QuickSelect } from 'components';

const DeckImportBadCardsModal = ({ deckid, badCards, setBadCards }) => {
  const { isMobile } = useApp();

  const [cards, setCards] = useState([]);

  useEffect(() => {
    setCards(
      badCards.map(() => ({
        cardid: null,
        q: null,
      }))
    );
  }, [badCards]);

  const handleCardChange = (deckid, idx, q) => {
    if (cards[idx]?.cardid && q >= 0) {
      deckCardChange(deckid, cards[idx].cardid, q);
      setCards((prevState) => {
        prevState[idx].q = q;
        return prevState;
      });
    }
  };

  const handleSetCard = (card, idx) => {
    setCards((prevState) => {
      const newState = { ...prevState };
      newState[idx].cardid = card.Id;
      return newState;
    });
  };

  return (
    <Modal
      show={badCards.length > 0}
      onHide={() => setBadCards([])}
      animation={false}
      size="xl"
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
      >
        <h5>Fix Bad Import</h5>
        <Button variant="outline-secondary" onClick={() => setBadCards([])}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'px-0 pt-0' : 'px-4 pt-0'}>
        {badCards.map((c, idx) => {
          return (
            <Row key={idx} className="align-items-center pt-2">
              <Col md={5}>{c}</Col>
              <Col md={1}>
                <DeckCardQuantity
                  deckid={deckid}
                  cardChange={handleCardChange}
                  cardid={idx}
                  q={cards[idx]?.q}
                />
              </Col>
              <Col md={6}>
                <QuickSelect
                  setCard={(card) => handleSetCard(card, idx)}
                  selectedCardid={cards[idx]?.cardid}
                  inBadImport={true}
                />
              </Col>
            </Row>
          );
        })}
      </Modal.Body>
    </Modal>
  );
};

export default DeckImportBadCardsModal;
