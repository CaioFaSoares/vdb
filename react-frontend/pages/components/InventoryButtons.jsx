import React from 'react';
import InventoryExport from './InventoryExport.jsx';
import InventoryImport from './InventoryImport.jsx';
import InventoryDelete from './InventoryDelete.jsx';
import InventoryAddDeck from './InventoryAddDeck.jsx';

function InventoryButtons(props) {
  return (
    <>
      <div className="button-block">
        <InventoryExport setShowButtons={props.setShowButtons} />
      </div>
      <div className="button-block">
        <InventoryImport
          inventoryAddToState={props.inventoryAddToState}
          setShowButtons={props.setShowButtons}
        />
      </div>
      <div className="button-block">
        <InventoryDelete
          setInventory={props.setInventory}
          isMobile={props.isMobile}
          setShowButtons={props.setShowButtons}
        />
      </div>
      <div className="button-block">
        <InventoryAddDeck
          inventoryDeckAdd={props.inventoryDeckAdd}
          decks={props.decks}
          setShowButtons={props.setShowButtons}
        />
      </div>
    </>
  );
}

export default InventoryButtons;
