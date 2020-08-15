import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import ResultCrypt from './ResultCrypt.jsx';

function DeckDrawCryptModal(props) {

  return (
    <React.Fragment>
      <Modal show={props.show} onHide={props.handleClose} animation={false}>
        <Modal.Header closeButton>
          <Modal.Title>
            Crypt Draw
            <Button variant="secondary" onClick={props.handleDraw}>
              REDRAW
            </Button>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ResultCrypt cards={props.cards} deck={true} />
          <br />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
}

export default DeckDrawCryptModal;
