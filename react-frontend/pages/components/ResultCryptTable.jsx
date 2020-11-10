import React, { useState } from 'react';
import DeckCardQuantity from './DeckCardQuantity.jsx';
import ResultCryptCapacity from './ResultCryptCapacity.jsx';
import ResultCryptDisciplines from './ResultCryptDisciplines.jsx';
import ResultCryptName from './ResultCryptName.jsx';
import ResultCryptClan from './ResultCryptClan.jsx';
import ResultCryptGroup from './ResultCryptGroup.jsx';
import ResultAddCard from './ResultAddCard.jsx';
import ResultCryptModal from './ResultCryptModal.jsx';

function ResultCryptTable(props) {
  let resultTrClass;

  const [modalCard, setmodalCard] = useState(undefined);

  const cardRows = props.resultCards.map((card, index) => {
    let q;
    if (props.className == 'deck-crypt-table') {
      q = card.q;
      card = card.c;
    }

    if (resultTrClass == 'crypt-result-even') {
      resultTrClass = 'crypt-result-odd';
    } else {
      resultTrClass = 'crypt-result-even';
    }

    let inDeck;
    if (props.crypt) {
      Object.keys(props.crypt).map((i, index) => {
        if (i == card.Id) {
          inDeck = props.crypt[i].q;
        }
      });
    }

    return (
      <React.Fragment key={index}>
        <tr className={resultTrClass}>
          {props.className == 'deck-crypt-table' ? (
            <>
              {props.isAuthor ? (
                <td className="quantity">
                  <DeckCardQuantity
                    cardid={card['Id']}
                    q={q}
                    deckid={props.deckid}
                    deckCardChange={props.deckCardChange}
                  />
                </td>
              ) : q ? (
                <td className="quantity-no-buttons px-2">{q}</td>
              ) : (
                <td className="quantity-no-buttons px-2">
                  <div className="transparent">0</div>
                </td>
              )}
            </>
          ) : (
            <>
              {props.addMode && (
                <td className="quantity">
                  <ResultAddCard
                    deckCardAdd={props.deckCardAdd}
                    cardid={card['Id']}
                    inDeck={inDeck}
                  />
                </td>
              )}
            </>
          )}
          <td className="capacity" onClick={() => setmodalCard(card)}>
            <ResultCryptCapacity value={card['Capacity']} />
          </td>
          <td className="disciplines" onClick={() => setmodalCard(card)}>
            <ResultCryptDisciplines
              value={card['Disciplines']}
              disciplinesSet={props.disciplinesSet}
              keyDisciplines={props.keyDisciplines}
              isMobile={props.isMobile}
            />
          </td>
          <td className="name" onClick={() => setmodalCard(card)}>
            <ResultCryptName
              showImage={props.showImage}
              setShowImage={props.setShowImage}
              id={card['Id']}
              value={card['Name']}
              adv={card['Adv']}
              ban={card['Banned']}
              card={card}
              isMobile={props.isMobile}
            />
          </td>
          {!props.isMobile
           ? <>
               <td className="clan" onClick={() => setmodalCard(card)}>
                 <ResultCryptClan value={card['Clan']} />
               </td>
               <td className="group" onClick={() => setmodalCard(card)}>
                 <ResultCryptGroup value={card['Group']} />
               </td>
             </>
           : <td className="clan-group" onClick={() => setmodalCard(card)}>
               <div>
                 <ResultCryptClan value={card['Clan']} />
                 <ResultCryptGroup value={card['Group']} />
               </div>
             </td>
          }
        </tr>
      </React.Fragment>
    );
  });

  return (
    <>
      <table className={props.className}>
        <tbody>{cardRows}</tbody>
      </table>
      {props.isMobile && modalCard && (
        <ResultCryptModal
          show={modalCard ? true : false}
          card={modalCard}
          showImage={props.showImage}
          setShowImage={props.setShowImage}
          handleClose={() => setmodalCard(false)}
        />
      )}
    </>
  );
}

export default ResultCryptTable;
