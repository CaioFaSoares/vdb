import React, { useState, useEffect } from 'react';
import { Button, Row, Col } from 'react-bootstrap';
import TwdResultDescription from './TwdResultDescription.jsx';
import TwdResultCrypt from './TwdResultCrypt.jsx';
import TwdResultLibraryByType from './TwdResultLibraryByType.jsx';
import TwdResultLibraryKeyCards from './TwdResultLibraryKeyCards.jsx';

function TwdResult(props) {
  const showCounterStep = 25;

  const [twdRows, setTwdRows] = useState([]);
  const [showCounter, setShowCounter] = useState(0);
  const [deckCounter, setDeckCounter] = useState(0);

  useEffect(() => {
    setDeckCounter(Object.keys(props.decks).length);
    setShowCounter(showCounterStep);
  }, props.decks);

  useEffect(() => {
    if (Object.keys(props.cardBase).length) {
      let newCounter = showCounter;
      setTwdRows(
        props.decks.map((deck) => {
          while (newCounter > 0) {
            newCounter -= 1;
            Object.keys(deck['crypt']).map((i) => {
              deck['crypt'][i].c = props.cardBase[i];
            });
            Object.keys(deck['library']).map((i) => {
              deck['library'][i].c = props.cardBase[i];
            });
            return (
              <React.Fragment key={deck['deckid']}>
                <Row className="pt-3">
                  <Col md={12} xl={3}>
                    <TwdResultDescription
                      deck={deck}
                      getDecks={props.getDecks}
                    />
                  </Col>
                  <Col md={12} xl={3}>
                    <TwdResultCrypt
                      crypt={deck['crypt']}
                      isMobile={props.isMobile}
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                    />
                  </Col>
                  <Col md={12} xl={3}>
                    <TwdResultLibraryByType
                      library={deck['library']}
                      isMobile={props.isMobile}
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                    />
                  </Col>
                  <Col md={12} xl={3}>
                    <TwdResultLibraryKeyCards
                      library={deck['library']}
                      isMobile={props.isMobile}
                      showImage={props.showImage}
                      setShowImage={props.setShowImage}
                    />
                  </Col>
                  <hr />
                </Row>
                <hr className="mx-0 thick" />
              </React.Fragment>
            );
          }
        })
      );
    }
  }, [props.cardBase, props.showImage, showCounter]);

  return (
    <>
      {twdRows}
      {deckCounter > showCounter && (
        <div className="d-flex justify-content-center pb-4 pt-2">
          <Button
            variant="outline-secondary"
            onClick={() => setShowCounter(showCounter + showCounterStep)}
            block
          >
            Show More ({deckCounter - showCounter} left)
          </Button>
        </div>
      )}
    </>
  );
}

export default TwdResult;
