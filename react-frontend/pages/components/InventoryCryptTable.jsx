import React, { useState } from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import Shuffle from '../../assets/images/icons/shuffle.svg';
import PinAngleFill from '../../assets/images/icons/pin-angle-fill.svg';
import CardPopover from './CardPopover.jsx';
import UsedPopover from './UsedPopover.jsx';
import UsedDescription from './UsedDescription.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function InventoryCryptTable(props) {
  let resultTrClass;

  const [modalCard, setModalCard] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined);

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card.c);
      props.setShowFloatingButtons(false);
      setModalInventory({
        inInventory: card.q,
        usedDescription: {
          soft: SoftUsedDescription,
          hard: HardUsedDescription,
        },
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
      });
    };

    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let softUsedMax = 0;
    let SoftUsedDescription;
    if (props.usedCards && props.usedCards.soft[card.c['Id']]) {
      SoftUsedDescription = Object.keys(props.usedCards.soft[card.c['Id']]).map(
        (id, index) => {
          if (softUsedMax < props.usedCards.soft[card.c['Id']][id]) {
            softUsedMax = props.usedCards.soft[card.c['Id']][id];
          }
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.soft[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        }
      );
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (props.usedCards && props.usedCards.hard[card.c['Id']]) {
      HardUsedDescription = Object.keys(props.usedCards.hard[card.c['Id']]).map(
        (id, index) => {
          hardUsedTotal += props.usedCards.hard[card.c['Id']][id];
          return (
            <UsedDescription
              key={index}
              q={props.usedCards.hard[card.c['Id']][id]}
              deckName={props.decks[id]['name']}
            />
          );
        }
      );
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          <td className="quantity">
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={
                <UsedPopover
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                  inInventory={card.q}
                  SoftUsedDescription={SoftUsedDescription}
                  HardUsedDescription={HardUsedDescription}
                />
              }
            >
              <div>
                <DeckCardQuantity
                  cardid={card.c['Id']}
                  q={card.q}
                  deckid={props.deckid}
                  cardChange={props.cardChange}
                  isMobile={props.isMobile}
                  inInventory={card.q}
                  inventoryType={true}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                />
              </div>
            </OverlayTrigger>
          </td>
          <td className="used">
            {softUsedMax > 0 && (
              <div className="d-flex align-items-center justify-content-center">
                <div className="d-inline opacity-035 pr-1">
                  <Shuffle />
                </div>
                {softUsedMax}
              </div>
            )}
            {hardUsedTotal > 0 && (
              <div className="d-flex align-items-center justify-content-center">
                <div className="d-inline opacity-035 pr-1">
                  <PinAngleFill />
                </div>
                {hardUsedTotal}
              </div>
            )}
          </td>
          <td className="capacity" onClick={() => handleClick()}>
            <ResultCryptCapacity value={card.c['Capacity']} />
          </td>
          {!props.isMobile && (
            <td className="disciplines" onClick={() => handleClick()}>
              <ResultCryptDisciplines
                value={card.c['Disciplines']}
                disciplinesSet={props.disciplinesSet}
                keyDisciplines={props.keyDisciplines}
                nonKeyDisciplines={props.nonKeyDisciplines}
                isMobile={props.isMobile}
              />
            </td>
          )}
          {!props.isMobile ? (
            <OverlayTrigger
              placement={props.placement ? props.placement : 'right'}
              overlay={
                <CardPopover card={card.c} showImage={props.showImage} />
              }
            >
              <td className="name pl-2" onClick={() => handleClick()}>
                <ResultCryptName card={card.c} />
              </td>
            </OverlayTrigger>
          ) : (
            <td className="name pl-2" onClick={() => handleClick()}>
              <ResultCryptName card={card.c} />
            </td>
          )}
          <td className="clan" onClick={() => handleClick()}>
            <ResultCryptClan value={card.c['Clan']} />
          </td>
          <td className="group" onClick={() => handleClick()}>
            <ResultCryptGroup value={card.c['Group']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="inventory-crypt-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => {
            setModalCard(false);
            props.setShowFloatingButtons(true);
          }}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={true}
        />
      )}
    </>
  );
}

export default InventoryCryptTable;
