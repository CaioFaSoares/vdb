import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Modal, Button } from 'react-bootstrap';
import InfoCircle from '../../assets/images/icons/info-circle.svg';
import X from '../../assets/images/icons/x.svg';
import DeckCryptTotalByCapacity from './DeckCryptTotalByCapacity.jsx';
import ResultCryptTable from './ResultCryptTable.jsx';
import DeckNewCryptCard from './DeckNewCryptCard.jsx';

function DeckCrypt(props) {
  const [showAdd, setShowAdd] = useState(false);
  const [showTotal, setShowTotal] = useState(false);

  const className = 'deck-crypt-table';

  const disciplinesDict = {};
  for (const card of Object.keys(props.cards)) {
    for (const d of Object.keys(props.cards[card].c['Disciplines'])) {
      if (disciplinesDict[d] === undefined) {
        disciplinesDict[d] = 0;
        disciplinesDict[d] += props.cards[card].q;
      } else {
        disciplinesDict[d] += props.cards[card].q;
      }
    }
  }

  const disciplinesForSort = [];
  Object.keys(disciplinesDict).map((key) => {
    disciplinesForSort.push([key, disciplinesDict[key]]);
  });

  const disciplinesSet = disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      return i[0];
    });

  let keyDisciplines = 0;
  disciplinesForSort
    .sort((a, b) => b[1] - a[1])
    .map((i) => {
      if (i[1] >= 5) {
        keyDisciplines += 1;
      }
    });

  const nonKeyDisciplinesList = [];
  for (let i = keyDisciplines; i < disciplinesSet.length; i++) {
    nonKeyDisciplinesList.push(disciplinesSet[i]);
  }

  let nonKeyDisciplines = 0;
  Object.keys(props.cards).map((card) => {
    let counter = 0;
    Object.keys(props.cards[card].c['Disciplines']).map((d) => {
      if (nonKeyDisciplinesList.includes(d)) {
        counter += 1;
      }
    });
    if (nonKeyDisciplines < counter) nonKeyDisciplines = counter;
  });

  const crypt = {};
  const cryptSide = {};
  let cryptGroupMin;
  let cryptGroupMax;

  Object.keys(props.cards).map((card) => {
    if (props.cards[card].q > 0) {
      crypt[card] = props.cards[card];
      if (props.cards[card].c['Group'] == 'ANY') {
        return;
      }
      if (
        props.cards[card].c['Group'] < cryptGroupMin ||
        cryptGroupMin == undefined
      ) {
        cryptGroupMin = props.cards[card].c['Group'];
      }
      if (
        props.cards[card].c['Group'] > cryptGroupMax ||
        cryptGroupMax == undefined
      ) {
        cryptGroupMax = props.cards[card].c['Group'];
      }
    } else {
      cryptSide[card] = props.cards[card];
    }
  });

  let cryptTotal = 0;
  for (const card in crypt) {
    if (card) {
      cryptTotal += crypt[card].q;
    }
  }

  let cryptGroups;
  if (cryptGroupMax - cryptGroupMin == 1) {
    cryptGroups = 'G' + cryptGroupMin + '-' + cryptGroupMax;
  } else if (cryptGroupMax - cryptGroupMin == 0) {
    cryptGroups = 'G' + cryptGroupMax;
  } else {
    cryptGroups = 'ERROR IN GROUPS';
  }

  const SortByQuantity = (a, b) => {
    return b.q - a.q;
  };

  const SortByCapacity = (a, b) => {
    return b.c['Capacity'] - a.c['Capacity'];
  };

  const [sortedState, setSortedState] = useState([]);

  const sortedCards = sortedState
    .filter((card) => crypt[card])
    .map((card) => {
      return crypt[card];
    });

  const sortedCardsSide = Object.values(cryptSide).sort(SortByCapacity);

  useEffect(() => {
    setSortedState(
      Object.values(crypt)
        .sort(SortByCapacity)
        .sort(SortByQuantity)
        .map((i) => {
          return i['c']['Id'];
        })
    );
  }, [props.changeTimer, props.deckid]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between pl-2 info-message">
        <b>
          Crypt [{cryptTotal}{cryptTotal < 12 && ' of 12+'}] - {cryptGroups}
        </b>
        <div className="d-flex">
          <Button
            variant="outline-secondary"
            onClick={() => setShowTotal(!showTotal)}
          >
            <InfoCircle />
          </Button>
          {props.isAuthor && !props.isMobile && (
            <div className="lp-125">
              <Button
                variant="outline-secondary"
                onClick={() => setShowAdd(!showAdd)}
              >
                +
              </Button>
            </div>
          )}
        </div>
      </div>
      {showTotal && (
        <div className="info-message pl-2">
          <DeckCryptTotalByCapacity cards={props.cards} />
        </div>
      )}
      {showAdd &&
       (!props.isMobile ? (
         <DeckNewCryptCard
           cardAdd={props.cardAdd}
           setShowAdd={setShowAdd}
           cards={props.cards}
           cardBase={props.cardBase}
         />
       ) : (
         <Modal
           show={showAdd}
           onHide={() => setShowAdd(false)}
           animation={false}
         >
           <Modal.Body className="p-0">
             <Container className="p-0" fluid>
               <Row className="p-0 m-0">
                 <Col className="p-0">
                   <div className="m-2">
                     <button
                       type="button"
                       className="close m-1"
                       onClick={() => setShowAdd(false)}
                     >
                       <X width="32" height="32" viewBox="0 0 16 16" />
                     </button>
                   </div>
                   <div className="d-flex justify-content-center">
                     <h5>Add Crypt Card</h5>
                   </div>
                 </Col>
               </Row>
               <DeckNewCryptCard
                 cardAdd={props.cardAdd}
                 setShowAdd={setShowAdd}
                 cards={props.cards}
                 cardBase={props.cardBase}
               />
             </Container>
           </Modal.Body>
         </Modal>
       ))}
      <ResultCryptTable
        className={className}
        deckid={props.deckid}
        cardChange={props.cardChange}
        resultCards={sortedCards}
        disciplinesSet={disciplinesSet}
        showImage={props.showImage}
        setShowImage={props.setShowImage}
        isAuthor={props.isAuthor}
        isMobile={props.isMobile}
        isWide={props.isWide}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        proxySelector={props.proxySelector}
        proxyCounter={props.proxyCounter}
        proxySelected={props.proxySelected}
        inventoryCrypt={props.inventoryCrypt}
        inventoryMode={props.inventoryMode}
        usedCards={props.usedCards}
        decks={props.decks}
        deckUpdate={props.deckUpdate}
        inSearch={props.inSearch}
      />
      {Object.keys(cryptSide).length > 0 && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between pl-2">
            <b>Side Crypt</b>
          </div>
          <ResultCryptTable
            className={className}
            deckid={props.deckid}
            cardChange={props.cardChange}
            resultCards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            showImage={props.showImage}
            setShowImage={props.setShowImage}
            isAuthor={props.isAuthor}
            isMobile={props.isMobile}
            isWide={props.isWide}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            proxySelector={props.proxySelector}
            proxyCounter={props.proxyCounter}
            proxySelected={props.proxySelected}
            inventoryCrypt={props.inventoryCrypt}
            inventoryMode={props.inventoryMode}
            usedCards={props.usedCards}
            decks={props.decks}
            deckUpdate={props.deckUpdate}
            inSearch={props.inSearch}
          />
        </div>
      )}
      {props.isMobile &&
       <div
         onClick={() => setShowAdd(true)}
         className="float-right-top add"
       >
         <div className="d-flex py-0 px-1 align-items-top">
           <div className="d-inline" style={{fontSize: '1.75em'}}>+</div>
           <div className="d-inline" style={{fontSize: '1.85em'}}>C</div>
         </div>
       </div>
      }
    </>
  );
}

export default DeckCrypt;
