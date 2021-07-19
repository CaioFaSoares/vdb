import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import X from '../../assets/images/icons/x.svg';
import TwdResultTotal from './TwdResultTotal.jsx';
import TwdResultDescription from './TwdResultDescription.jsx';
import TwdResultCrypt from './TwdResultCrypt.jsx';
import TwdResultLibraryByType from './TwdResultLibraryByType.jsx';
import TwdResultLibraryKeyCards from './TwdResultLibraryKeyCards.jsx';
import AppContext from '../../context/AppContext.js';

function TwdResult(props) {
  const {
    setShowTwdSearch,
    twdResults,
    setTwdResults,
    cryptCardBase,
    libraryCardBase,
    showImage,
    isMobile,
  } = useContext(AppContext);

  const history = useHistory();
  const showCounterStep = 20;
  const [twdRows, setTwdRows] = useState([]);
  const [showCounter, setShowCounter] = useState(0);
  const [deckCounter, setDeckCounter] = useState(0);

  const handleClear = () => {
    history.push('/twd');
    setTwdResults(undefined);
    setShowTwdSearch(!props.showSearch);
  };

  useEffect(() => {
    setDeckCounter(Object.keys(twdResults).length);
    setShowCounter(showCounterStep);
  }, [twdResults]);

  useEffect(() => {
    let newCounter = showCounter;
    setTwdRows(
      twdResults.map((deck) => {
        while (newCounter > 0) {
          newCounter -= 1;
          Object.keys(deck['crypt']).map((i) => {
            deck['crypt'][i].c = cryptCardBase[i];
          });
          Object.keys(deck['library']).map((i) => {
            deck['library'][i].c = libraryCardBase[i];
          });
          return (
            <React.Fragment key={deck['deckid']}>
              <Row className="pt-3 px-0 mx-0">
                <Col
                  xs={12}
                  md={12}
                  xl={3}
                  className={isMobile ? 'px-0' : 'pl-0 pr-2'}
                >
                  <TwdResultDescription deck={deck} />
                </Col>
                {isMobile ? (
                  <>
                    <Col xs={6} className="pl-0 pr-1">
                      <TwdResultCrypt
                        crypt={deck['crypt']}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                    <Col xs={6} className="pl-1 pr-0">
                      <TwdResultLibraryKeyCards
                        library={deck['library']}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={12} md={4} xl={3} className="px-2">
                      <TwdResultCrypt
                        crypt={deck['crypt']}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                    <Col xs={12} md={4} xl={3} className="px-2">
                      <TwdResultLibraryByType library={deck['library']} />
                    </Col>
                    <Col xs={12} md={4} xl={3} className="pr-0 pl-2">
                      <TwdResultLibraryKeyCards
                        library={deck['library']}
                        setShowFloatingButtons={props.setShowFloatingButtons}
                      />
                    </Col>
                  </>
                )}
                <hr />
              </Row>
              <hr className="mx-0 thick" />
            </React.Fragment>
          );
        }
      })
    );
  }, [twdResults, showCounter, showImage]);

  return (
    <>
      {!isMobile && twdResults.length == 0 && (
        <div className="d-flex align-items-center justify-content-center error-message">
          <b>NO DECKS FOUND</b>
        </div>
      )}
      {twdResults.length > 0 && (
        <>
          <TwdResultTotal />
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
      )}
      {isMobile && props.showFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default TwdResult;
