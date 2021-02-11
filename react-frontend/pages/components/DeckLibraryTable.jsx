import React, { useState } from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import Diagram3Fill from '../../assets/images/icons/diagram-3-fill.svg'
import LockFill from '../../assets/images/icons/lock-fill.svg'
import ArchiveFill from '../../assets/images/icons/archive-fill.svg'
import CalculatorFill from '../../assets/images/icons/calculator-fill.svg'
import ResultLibraryPopover from './ResultLibraryPopover.jsx';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultLibraryBurn from './ResultLibraryBurn.jsx';
import ResultLibraryClan from './ResultLibraryClan.jsx';
import ResultLibraryCost from './ResultLibraryCost.jsx';
import ResultLibraryDisciplines from './ResultLibraryDisciplines.jsx';
import ResultLibraryModal from './ResultLibraryModal.jsx';
import ResultLibraryName from './ResultLibraryName.jsx';
import ResultLibraryTrifle from './ResultLibraryTrifle.jsx';

function DeckLibraryTable(props) {
  let resultTrClass;
  const deckInvType = props.decks[props.deckid].inventory_type;

  const [modalCard, setModalCard] = useState(undefined);
  const [modalInventory, setModalInventory] = useState(undefined)

  const cardRows = props.cards.map((card, index) => {
    const handleClick = () => {
      setModalCard(card.c);
      setModalInventory({
        inInventory: inInventory,
        usedDescription: {soft: SoftUsedDescription, hard: HardUsedDescription},
        softUsedMax: softUsedMax,
        hardUsedTotal: hardUsedTotal,
      });
    }

    const cardInvType = card.i;
    if (resultTrClass == 'result-odd') {
      resultTrClass = 'result-even';
    } else {
      resultTrClass = 'result-odd';
    }

    let DisciplineOrClan;
    if (card.c['Clan']) {
      DisciplineOrClan = <ResultLibraryClan value={card.c['Clan']} />;
    } else {
      DisciplineOrClan = (
        <ResultLibraryDisciplines value={card.c['Discipline']} />
      );
    }

    let inInventory = null;
    if (props.inventoryMode) {
      if (Object.keys(props.inventoryLibrary).includes(card.c['Id'].toString())) {
        inInventory = props.inventoryLibrary[card.c['Id']].q;
      } else {
        inInventory = 0;
      }
    }

    let softUsedMax = 0;
    let SoftUsedDescription;
    if (props.usedCards && props.usedCards.soft[card.c['Id']]) {
      SoftUsedDescription = Object.keys(props.usedCards.soft[card.c['Id']]).map((id, index) => {
        if (softUsedMax < props.usedCards.soft[card.c['Id']][id]) {
          softUsedMax = props.usedCards.soft[card.c['Id']][id];
        }

        return (
          <div className="d-flex align-items-center" key={index}>
          <div className="opacity-035"><Diagram3Fill/></div>
          <div className="px-1"><b>{props.usedCards.soft[card.c['Id']][id]}</b></div>
            - {props.decks[id]['name']}
          </div>
        );
      });
    }

    let hardUsedTotal = 0;
    let HardUsedDescription;
    if (props.usedCards && props.usedCards.hard[card.c['Id']]) {
      HardUsedDescription = Object.keys(props.usedCards.hard[card.c['Id']]).map((id, index) => {
        hardUsedTotal += props.usedCards.hard[card.c['Id']][id];
        return (
          <div className="d-flex align-items-center" key={index}>
            <div className="opacity-035"><LockFill/></div>
            <div className="px-1"><b>{props.usedCards.hard[card.c['Id']][id]}</b></div>
            - {props.decks[id]['name']}
          </div>
        );
      });
    }

    const UsedPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <>
              {children == 0 ?
               <div className="py-1">
                 Not used in inventory decks
               </div>
               :
               <>
                 {softUsedMax > 0 && <>{SoftUsedDescription}</>}
                 {hardUsedTotal > 0 && <>{HardUsedDescription}</>}
               </>
              }
              <hr/>
              <div className="d-flex align-items-center">
                <div className="opacity-035"><CalculatorFill/></div>
                <div className="px-1"><b>{softUsedMax + hardUsedTotal}</b></div>
                - Total Used
              </div>
              <div className="d-flex align-items-center" key={index}>
                <div className="opacity-035"><ArchiveFill/></div>
                <div className="px-1"><b>{inInventory}</b></div>
                - In Inventory
              </div>
            </>
          </Popover.Content>
        </Popover>
      );
    });
    UsedPopover.displayName = 'UsedPopover';

    const CardPopover = React.forwardRef(({ children, ...props }, ref) => {
      return (
        <Popover ref={ref} {...props}>
          <Popover.Content>
            <ResultLibraryPopover card={card.c} showImage={children} />
          </Popover.Content>
        </Popover>
      );
    });
    CardPopover.displayName = 'CardPopover';

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.proxySelected && (
            <td className="proxy-selector">
              <div className="custom-control custom-checkbox">
                <input
                  id={card.c['Id']}
                  name="print"
                  className="custom-control-input"
                  type="checkbox"
                  checked={
                    props.proxySelected[card.c['Id']]
                      ? props.proxySelected[card.c['Id']].print
                      : false
                  }
                  onChange={(e) => props.proxySelector(e)}
                />
                <label
                  htmlFor={card.c['Id']}
                  className="custom-control-label"
                />
              </div>
            </td>
          )}
          {props.isAuthor ? (
            <>
              {props.inventoryMode ? (
                <>
                  {deckInvType && !props.inSearch ?
                   <td className="pt-2 left-offset-8 opacity-075">
                     <div
                       className={cardInvType ? "" : "opacity-025"}
                       onClick={() => props.deckUpdate(props.deckid, cardInvType ? 'makeClear' : deckInvType == 's' ? 'makeFixed' : 'makeFlexible', card.c['Id'])}
                     >
                       { deckInvType == 's' ? <LockFill /> : <Diagram3Fill/> }
                     </div>
                   </td>
                   : null
                  }
                  <OverlayTrigger
                    placement='left'
                    overlay={
                      <UsedPopover>{softUsedMax || hardUsedTotal}</UsedPopover>
                    }
                  >
                    <td className="quantity">
                      <DeckCardQuantity
                        cardid={card.c['Id']}
                        q={card.q}
                        deckid={props.deckid}
                        cardChange={props.cardChange}
                        isMobile={props.isMobile}
                        inInventory={inInventory}
                        softUsedMax={softUsedMax}
                        hardUsedTotal={hardUsedTotal}
                        inventoryType={props.decks[props.deckid].inventory_type}
                      />
                    </td>
                  </OverlayTrigger>
                </>
              )
               :
               <td className="quantity">
                 <DeckCardQuantity
                   cardid={card.c['Id']}
                   q={card.q}
                   deckid={props.deckid}
                   cardChange={props.cardChange}
                   isMobile={props.isMobile}
                 />
               </td>
              }
            </>
          ) : props.proxySelected ? (
            <td className="quantity">
              <DeckCardQuantity
                cardid={card.c['Id']}
                deckid={null}
                q={
                  props.proxySelected[card.c['Id']]
                    ? props.proxySelected[card.c['Id']].q
                    : 0
                }
                cardChange={props.proxyCounter}
                isMobile={props.isMobile}
              />
            </td>
          ) : card.q ? (
            <td className="quantity-no-buttons px-2">{card.q}</td>
          ) : (
            <td className="quantity-no-buttons px-2">
              <div className="transparent">0</div>
            </td>
          )}
          {!props.isMobile ?
           <OverlayTrigger
             placement={props.placement ? props.placement : 'right'}
             overlay={
               <CardPopover card={card.c}>{props.showImage}</CardPopover>
             }
           >
             <td className="name pl-3 pr-2" onClick={() => handleClick()}>
               <ResultLibraryName card={card.c}/>
             </td>
           </OverlayTrigger>
           :
           <td className="name pl-3 pr-2" onClick={() => handleClick()}>
             <ResultLibraryName card={card.c}/>
           </td>
          }
          <td className="cost" onClick={() => handleClick()}>
            <ResultLibraryCost
              valueBlood={card.c['Blood Cost']}
              valuePool={card.c['Pool Cost']}
            />
          </td>
          <td className="disciplines px-3" onClick={() => handleClick()}>
            {DisciplineOrClan}
          </td>
          <td className="burn" onClick={() => handleClick()}>
            <ResultLibraryBurn value={card.c['Burn Option']} />
            <ResultLibraryTrifle value={card.c['Card Text']} />
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className="deck-library-table">
        <tbody>{cardRows}</tbody>
      </table>
      {modalCard && (
        <ResultLibraryModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setModalCard(false)}
          isMobile={props.isMobile}
          inventoryState={modalInventory}
          inventoryMode={props.inventoryMode}
        />
      )}
    </>
  );
}

export default DeckLibraryTable;
