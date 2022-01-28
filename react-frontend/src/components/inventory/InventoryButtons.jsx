import React from 'react';
import { Stack, Button } from 'react-bootstrap';
import InventoryExport from './InventoryExport.jsx';
import { DeckImport, InventoryDelete, InventoryMissing } from 'components';
import FolderPlus from 'assets/images/icons/folder-plus.svg';
import { useApp } from 'context';

function InventoryButtons(props) {
  const { decks, preconDecks } = useApp();

  return (
    <Stack gap={1}>
      <InventoryExport setShowButtons={props.setShowButtons} />
      <DeckImport
        inventoryAddToState={props.inventoryAddToState}
        setShowButtons={props.setShowButtons}
        inInventory={true}
      />
      <InventoryDelete
        setInventoryCrypt={props.setInventoryCrypt}
        setInventoryLibrary={props.setInventoryLibrary}
        setShowButtons={props.setShowButtons}
      />
      {decks && (
        <Button variant="secondary" onClick={() => props.setShowAddDeck(true)}>
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <FolderPlus />
            </div>
            Add from Deck
          </div>
        </Button>
      )}
      {preconDecks && (
        <Button
          variant="secondary"
          onClick={() => props.setShowAddPrecon(true)}
        >
          <div className="d-flex justify-content-center align-items-center">
            <div className="pe-2">
              <FolderPlus />
            </div>
            Add from Precon
          </div>
        </Button>
      )}
      <InventoryMissing
        setShowButtons={props.setShowButtons}
        clan={props.clan}
        type={props.type}
        discipline={props.discipline}
      />
    </Stack>
  );
}

export default InventoryButtons;
