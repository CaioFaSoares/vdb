import React from 'react';
import InventoryExport from './InventoryExport.jsx';
import InventoryDelete from './InventoryDelete.jsx';
import InventoryAddDeck from './InventoryAddDeck.jsx';
import InventoryHelp from './InventoryHelp.jsx';

function InventoryButtons(props) {
  return (
    <>
      <div className="bp-125">
        <InventoryHelp
          isMobile={props.isMobile}
        />
      </div>
      <div className="bp-125">
        <InventoryExport />
      </div>
      <div className="bp-125">
        <InventoryDelete
          setInventory={props.setInventory}
          isMobile={props.isMobile}
        />
      </div>
      <div className="bp-125">
        <InventoryAddDeck
          inventoryDeckAdd={props.inventoryDeckAdd}
          decks={props.decks}
        />
      </div>
    </>
  );
}

export default InventoryButtons;
