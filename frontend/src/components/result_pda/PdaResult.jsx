import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Row, Col } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import {
  PdaResultDescription,
  TwdResultTotal,
  TwdResultCrypt,
  TwdResultLibraryByType,
  TwdResultLibraryKeyCards,
} from 'components';
import { decksSort } from 'utils';
import { useApp } from 'context';
import { useDeck } from 'hooks';

const PdaResult = ({ results, setResults }) => {
  const {
    isMobile,
    showFloatingButtons,
    pdaSearchSort,
    changePdaSearchSort,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const navigate = useNavigate();
  const showCounterStep = 20;
  const deckCounter = results.length || 0;
  const [showCounter, setShowCounter] = useState(showCounterStep);

  const sortMethods = {
    'Date - New to Old': 'D↓',
    'Date - Old to New': 'D↑',
    Favorites: 'F',
  };

  const handleClear = () => {
    navigate('/pda');
    setResults(undefined);
  };

  const sortedDecks = useMemo(() => {
    return decksSort(results, pdaSearchSort);
  }, [results, pdaSearchSort]);

  const resultEntries = useMemo(() => {
    if (sortedDecks) {
      let newCounter = showCounter;

      return sortedDecks.map((d, index) => {
        const deck = { ...d };
        while (newCounter > 0) {
          newCounter -= 1;

          const cardsData = useDeck(deck.cards, cryptCardBase, libraryCardBase);
          Object.values({ ...cardsData.crypt, ...cardsData.library }).map(
            (card) => {
              if (card.q === 0) {
                if (card.c.Id > 200000) {
                  delete cardsData.crypt[card.c.Id];
                } else {
                  delete cardsData.library[card.c.Id];
                }
              }
            }
          );
          deck.crypt = cardsData.crypt;
          deck.library = cardsData.library;

          return (
            <React.Fragment key={deck['deckid']}>
              <Row className="py-2 px-0 mx-0">
                <Col
                  xs={12}
                  md={12}
                  xl={3}
                  className={isMobile ? 'px-0' : 'ps-0 pe-2'}
                >
                  <PdaResultDescription deck={deck} />
                </Col>
                {isMobile ? (
                  <>
                    <Col xs={6} className="ps-0 pe-1">
                      <TwdResultCrypt crypt={deck['crypt']} />
                    </Col>
                    <Col xs={6} className="ps-1 pe-0">
                      <TwdResultLibraryKeyCards library={deck['library']} />
                    </Col>
                  </>
                ) : (
                  <>
                    <Col xs={12} md={4} xl={3} className="px-2">
                      <TwdResultCrypt crypt={deck['crypt']} />
                    </Col>
                    <Col xs={12} md={4} xl={3} className="px-2">
                      <TwdResultLibraryByType library={deck['library']} />
                    </Col>
                    <Col xs={12} md={4} xl={3} className="pe-0 ps-2">
                      <TwdResultLibraryKeyCards library={deck['library']} />
                    </Col>
                  </>
                )}
              </Row>
              {index + 1 < showCounter && <hr className="mx-0 thick" />}
            </React.Fragment>
          );
        }
      });
    } else return [];
  }, [sortedDecks, showCounter, pdaSearchSort]);

  return (
    <>
      <TwdResultTotal
        results={results}
        sortMethods={sortMethods}
        sortMethod={pdaSearchSort}
        setSortMethod={changePdaSearchSort}
      />
      {resultEntries}
      {deckCounter > showCounter && (
        <div className="d-flex justify-content-center pb-4 pt-2">
          <Button
            variant="primary"
            onClick={() => setShowCounter(showCounter + showCounterStep)}
          >
            Show More ({deckCounter - showCounter} left)
          </Button>
        </div>
      )}
      {isMobile && showFloatingButtons && (
        <>
          <div
            onClick={handleClear}
            className="d-flex float-right-bottom float-clear align-items-center justify-content-center"
          >
            <X viewBox="0 0 16 16" />
          </div>
        </>
      )}
    </>
  );
};

export default PdaResult;
