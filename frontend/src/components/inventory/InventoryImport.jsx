import React, { useState, useRef } from 'react';
import {
  ErrorOverlay,
  InventoryImportButton,
  InventoryImportBadCardsModal,
} from 'components';
import { useApp, inventoryCardsAdd } from 'context';
import { useDeckImport } from 'hooks';

const InventoryImport = () => {
  const { cryptCardBase, libraryCardBase } = useApp();

  const [importError, setImportError] = useState(false);
  const [badCards, setBadCards] = useState([]);
  const ref = useRef(null);
  const fileInput = React.createRef();

  const handleFileInputClick = () => {
    fileInput.current.click();
  };

  const importDeckFromFile = (fileInput) => {
    setImportError(false);

    const reader = new FileReader();
    const file = fileInput.current.files[0];
    reader.readAsText(file);
    reader.onload = async () => {
      let deckText;

      if (file.type === 'text/plain') {
        deckText = reader.result;
      } else {
        // TODO import from xlsx
      }

      const deck = await useDeckImport(
        deckText,
        cryptCardBase,
        libraryCardBase
      );

      setBadCards(deck.badCards);
      inventoryCardsAdd({ ...deck.crypt, ...deck.library });
    };
  };

  return (
    <>
      <InventoryImportButton handleClick={handleFileInputClick} />
      {badCards && (
        <InventoryImportBadCardsModal
          badCards={badCards}
          setBadCards={setBadCards}
        />
      )}
      <input
        ref={fileInput}
        accept=".txt"
        type="file"
        onChange={() => importDeckFromFile(fileInput)}
        style={{ display: 'none' }}
      />
      <ErrorOverlay
        show={importError}
        target={ref.current}
        placement="left"
        modal={true}
      >
        {importError && <b>CANNOT IMPORT THIS INVENTORY</b>}
      </ErrorOverlay>
    </>
  );
};

export default InventoryImport;
