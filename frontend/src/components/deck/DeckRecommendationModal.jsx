import React from 'react';
import { Modal, Button, Container, Row, Col, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ResultCryptTable, DeckRecommendationLibrary } from 'components';
import { useApp } from 'context';

const DeckRecommendationModal = ({
  show,
  handleClose,
  crypt,
  library,
  isAuthor,
  activeDeck,
}) => {
  const { isMobile } = useApp();

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      dialogClassName={isMobile ? 'm-0' : 'modal-wide'}
    >
      <Modal.Header
        className='no-border pt-2 pt-md-3 pb-0 pb-md-1 ps-2 pe-3 px-md-4'
      >
        <h5>Cards Ideas</h5>
        <Button variant="outline-secondary" onClick={handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className="p-0">
        <Container fluid>
          <Row className='px-0 pb-md-4'>
            <Col xs={12} md={7} className="px-0 ps-lg-4 pe-lg-3">
              <div className="d-flex justify-content-between align-items-center title-line px-2">
                <b>CRYPT</b>
              </div>
              {crypt ? (
                <ResultCryptTable
                  isAuthor={isAuthor}
                  inRecommendation={true}
                  activeDeck={activeDeck}
                  resultCards={crypt}
                  className="search-crypt-table"
                  crypt={activeDeck.crypt}
                />
              ) : <div className="d-flex justify-content-center py-4 pb-md-0"> <Spinner animation="border" />
              </div>
              }
            </Col>
            <Col xs={12} md={5} className="px-0 ps-lg-3 pe-lg-4 pt-4 pt-md-0">
              <div className="d-flex justify-content-between align-items-center title-line px-2">
                <b>LIBRARY</b>
              </div>
              {library ? (
                <DeckRecommendationLibrary
                  isAuthor={isAuthor}
                  activeDeck={activeDeck}
                  cards={library}
                />
              ) : <div className="d-flex justify-content-center py-4 pb-md-0"> <Spinner animation="border" /></div>
              }
            </Col>
          </Row>
        </Container>
      </Modal.Body>
    </Modal>
  );
};

export default DeckRecommendationModal;
