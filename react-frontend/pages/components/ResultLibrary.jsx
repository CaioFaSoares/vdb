import React, { useState, useEffect } from 'react';
import X from '../../assets/images/icons/x.svg';
import Plus from '../../assets/images/icons/plus.svg';
import ArchiveFill from '../../assets/images/icons/archive-fill.svg';
import AlertMessage from './AlertMessage.jsx';
import ResultLibraryTable from './ResultLibraryTable.jsx';
import ResultLibraryTotal from './ResultLibraryTotal.jsx';
import resultLibrarySort from './resultLibrarySort.js';

function ResultLibrary(props) {
  const [sortedCards, setSortedCards] = useState([]);

  const handleChange = (method) => {
    props.setSortMethod(method);
    setSortedCards(() => resultLibrarySort(props.cards, method));
  };

  const handleClear = () => {
    props.setResults(undefined);
    props.setShowSearch(!props.showSearch);
  };

  useEffect(() => {
    setSortedCards(() => resultLibrarySort(props.cards, props.sortMethod));
  }, [props.cards, props.sortMethod]);

  return (
    <>
      {!props.isMobile && props.cards.length == 0 && (
        <AlertMessage className="error-message">
          <b>NO CARDS FOUND</b>
        </AlertMessage>
      )}
      {props.cards.length > 0 &&
       <>
         <ResultLibraryTotal
           cards={props.cards}
           value={props.sortMethod}
           handleChange={handleChange}
         />
         <ResultLibraryTable
           showImage={props.showImage}
           setShowImage={props.setShowImage}
           library={props.library}
           activeDeck={props.activeDeck}
           cardAdd={props.cardAdd}
           resultCards={sortedCards}
           isMobile={props.isMobile}
           isWide={true}
           addMode={props.addMode}
           inventoryMode={props.inventoryMode}
           inventoryLibrary={props.inventoryLibrary}
           usedCards={props.usedCards}
           decks={props.decks}
         />
       </>
      }
      {props.isMobile && !props.hideFloatingButtons && (
        <>
          <div onClick={handleClear} className="float-right-bottom clear">
            <div className="pt-1 float-clear">
              <X viewBox="0 0 16 16" />
            </div>
          </div>
          {props.inventoryMode ? (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
              className="float-left-bottom inventory-on"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setInventoryMode(!props.inventoryMode)}
              className="float-left-bottom inventory-off"
            >
              <div className="pt-2 float-inventory">
                <ArchiveFill viewBox="0 0 16 16" />
              </div>
            </div>
          )}
          {props.addMode ? (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-left-middle add-on"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          ) : (
            <div
              onClick={() => props.setAddMode(!props.addMode)}
              className="float-left-middle add-off"
            >
              <div className="pt-1 float-add">
                <Plus viewBox="0 0 16 16" />
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default ResultLibrary;
