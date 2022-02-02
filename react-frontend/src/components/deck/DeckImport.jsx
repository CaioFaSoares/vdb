import React, { useState, useRef } from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import ClipboardPlus from 'assets/images/icons/clipboard-plus.svg';
import Upload from 'assets/images/icons/upload.svg';
import { ErrorOverlay, DeckImportText, DeckImportAmaranth } from 'components';
import { useApp } from 'context';

function DeckImport(props) {
  const { username, getDecks, setActiveDeck, isMobile } = useApp();
  const [importError, setImportError] = useState(false);
  const [createError, setCreateError] = useState('');
  const [showTextModal, setShowTextModal] = useState(false);
  const [showAnonymousTextModal, setShowAnonymousTextModal] = useState(false);
  const [showAmaranthModal, setShowAmaranthModal] = useState(false);
  const ref = useRef(null);

  const fileInputTxt = React.createRef();
  const fileInputDek = React.createRef();
  const fileInputEld = React.createRef();

  const handleFileChange = (format) => importDeckFromFile(format);
  const handleFileChangeAnonymous = (format) =>
    anonymousImportDeckFromFile(format);
  const handleFileInputClick = (format) => {
    switch (format) {
      case 'txt':
        fileInputTxt.current.click();
        break;
      case 'dek':
        fileInputDek.current.click();
        break;
      case 'eld':
        fileInputEld.current.click();
        break;
    }
  };

  const handleCloseImportModal = () => {
    setShowTextModal(false);
    setShowAmaranthModal(false);
    isMobile && props.setShowButtons(false);
  };
  const handleOpenTextModal = () => setShowTextModal(true);
  const handleOpenAmaranthModal = () => setShowAmaranthModal(true);

  const createNewDeck = () => {
    setCreateError(false);

    let newdeckid;
    const url = `${process.env.API_URL}decks/create`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ deckname: 'New deck' }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => (newdeckid = data.deckid))
      .then(() => getDecks())
      .then(() => setActiveDeck({ src: 'my', deckid: newdeckid }))
      .catch((error) => setCreateError(true));
  };

  const importDeckFromFile = (format) => {
    setImportError(false);

    let fileInput;
    switch (format) {
      case 'txt':
        fileInput = fileInputTxt;
        break;
      case 'dek':
        fileInput = fileInputDek;
        break;
      case 'eld':
        fileInput = fileInputEld;
        break;
    }

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      let result;
      switch (format) {
        case 'txt':
          result = reader.result;
          break;
        case 'dek':
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result, 'text/xml');
          const xmlCrypt =
            xmlDoc.getElementsByTagName('deck')[0].childNodes[5].children;
          const xmlLibrary =
            xmlDoc.getElementsByTagName('deck')[0].childNodes[3].children;

          const crypt = {};
          Object.values(xmlCrypt).map((i) => {
            const cardName = i.childNodes[0].childNodes[0].data;
            if (!crypt[cardName]) {
              crypt[cardName] = 0;
            }
            crypt[cardName] += 1;
          });

          const library = {};
          Object.values(xmlLibrary).map((i) => {
            const cardName = i.childNodes[0].childNodes[0].data;
            if (!library[cardName]) {
              library[cardName] = 0;
            }
            library[cardName] += 1;
          });

          result = '';

          Object.keys(crypt).map((card) => {
            result += `${crypt[card]} ${card}\n`;
          });

          Object.keys(library).map((card) => {
            result += `${library[card]} ${card}\n`;
          });
          break;
        case 'eld':
          result = '';
          const cards = reader.result.split('\n');
          cards.forEach((res) => {
            const card = res.split(',');
            if (card.length >= 5) {
              let name = card[0].slice(1);
              const n = card.length - 5;
              if (n) {
                for (let i = 1; i <= n; i++) {
                  name += `, ${card[i]}`;
                }
              }
              name = name.slice(0, -1);
              const q = card[n + 1];

              if (q && name) result += `${q} ${name}\n`;
            }
          });
          break;
      }

      const url = `${process.env.API_URL}${
        props.inInventory ? 'inventory' : 'decks'
      }/import`;

      const body = props.inInventory
        ? JSON.stringify(result)
        : JSON.stringify({
            deckText: result,
          });
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      };

      const fetchPromise = fetch(url, options);

      if (props.inInventory) {
        fetchPromise
          .then((response) => response.json())
          .then((cards) => {
            props.inventoryAddToState(cards);
          })
          .catch((error) => setImportError(true));
      } else {
        fetchPromise
          .then((response) => response.json())
          .then((data) => (newDeckId = data.deckid))
          .then(() => getDecks())
          .then(() => {
            setActiveDeck({ src: 'my', deckid: newDeckId });
            isMobile && props.setShowButtons(false);
          })
          .catch((error) => setImportError(true));
      }
    };
  };

  const anonymousImportDeckFromFile = (format) => {
    setImportError(false);

    let fileInput;
    switch (format) {
      case 'txt':
        fileInput = fileInputTxt;
        break;
      case 'dek':
        fileInput = fileInputDek;
        break;
      case 'eld':
        fileInput = fileInputEld;
        break;
    }

    let newDeckId;
    const reader = new FileReader();
    reader.readAsText(fileInput.current.files[0]);
    reader.onload = () => {
      let result;
      switch (format) {
        case 'txt':
          result = reader.result;
          break;
        case 'dek':
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(reader.result, 'text/xml');
          const xmlCrypt =
            xmlDoc.getElementsByTagName('deck')[0].childNodes[5].children;
          const xmlLibrary =
            xmlDoc.getElementsByTagName('deck')[0].childNodes[3].children;

          const crypt = {};
          Object.values(xmlCrypt).map((i) => {
            const cardName = i.childNodes[0].childNodes[0].data;
            if (!crypt[cardName]) {
              crypt[cardName] = 0;
            }
            crypt[cardName] += 1;
          });

          const library = {};
          Object.values(xmlLibrary).map((i) => {
            const cardName = i.childNodes[0].childNodes[0].data;
            if (!library[cardName]) {
              library[cardName] = 0;
            }
            library[cardName] += 1;
          });

          result = '';

          Object.keys(crypt).map((card) => {
            result += `${crypt[card]} ${card}\n`;
          });

          Object.keys(library).map((card) => {
            result += `${library[card]} ${card}\n`;
          });
          break;
        case 'eld':
          result = '';
          const cards = reader.result.split('\n');
          cards.forEach((res) => {
            const card = res.split(',');
            if (card.length >= 5) {
              let name = card[0].slice(1);
              const n = card.length - 5;
              if (n) {
                for (let i = 1; i <= n; i++) {
                  name += `, ${card[i]}`;
                }
              }
              name = name.slice(0, -1);
              const q = card[n + 1];

              if (q && name) result += `${q} ${name}\n`;
            }
          });
          break;
      }

      const url = `${process.env.API_URL}decks/anonymous_import`;

      const body = JSON.stringify({
        deckText: result,
      });
      const options = {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: body,
      };

      const fetchPromise = fetch(url, options);

      fetchPromise
        .then((response) => response.json())
        .then((data) => (newDeckId = data.deckid))
        .then(() => {
          setActiveDeck({ src: 'shared', deckid: newDeckId });
          isMobile && props.setShowButtons(false);
        })
        .catch((error) => setImportError(true));
    };
  };

  const handleCreateButton = () => {
    createNewDeck();
    isMobile && props.setShowButtons(false);
  };

  const ButtonOptions = (
    <>
      {username && (
        <>
          {!props.inInventory && (
            <>
              <Dropdown.Item onClick={handleCreateButton}>
                Create New Deck
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
          <Dropdown.Item onClick={() => handleFileInputClick('txt')}>
            Import from File - Amaranth, Lackey.TXT, TWD
          </Dropdown.Item>
          {props.inInventory ? (
            <Dropdown.Item onClick={() => handleFileInputClick('eld')}>
              Import from File - FELDB.CSV
            </Dropdown.Item>
          ) : (
            <>
              <Dropdown.Item onClick={() => handleFileInputClick('dek')}>
                Import from File - Lackey.DEK
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenTextModal}>
                Import from Text - Amaranth, Lackey.TXT, TWD
              </Dropdown.Item>
              <Dropdown.Item onClick={handleOpenAmaranthModal}>
                Import from Amaranth Deck URL
              </Dropdown.Item>
              <Dropdown.Divider />
            </>
          )}
        </>
      )}
      {!props.inInventory && (
        <>
          <Dropdown.Header>
            Without Account (you will not be able to edit it, can only copy URL)
          </Dropdown.Header>
          <Dropdown.Item onClick={() => handleFileInputClick('txt')}>
            Import w/o Account from File - Amaranth, Lackey.TXT, TWD
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handleFileInputClick('dek')}>
            Import w/o Account from File - Lackey.DEK
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenTextModal}>
            Import w/o Account from Text - Amaranth, Lackey.TXT, TWD
          </Dropdown.Item>
        </>
      )}
    </>
  );

  return (
    <>
      <DropdownButton
        as={ButtonGroup}
        variant="secondary"
        title={
          <div className="d-flex justify-content-center align-items-center">
            {props.inInventory ? (
              <>
                <div className="pe-2">
                  <Upload />
                </div>
                Import Inventory
              </>
            ) : (
              <>
                <div className="pe-2">
                  <ClipboardPlus size={24} />
                </div>
                New / Import
              </>
            )}
          </div>
        }
      >
        {ButtonOptions}
      </DropdownButton>
      <DeckImportText
        handleClose={handleCloseImportModal}
        getDecks={getDecks}
        show={showTextModal}
      />
      <DeckImportAmaranth
        handleClose={handleCloseImportModal}
        getDecks={getDecks}
        show={showAmaranthModal}
      />
      <DeckImportText
        anonymous={true}
        handleClose={handleCloseImportModal}
        getDecks={getDecks}
        show={showTextModal}
      />
      <input
        ref={fileInputTxt}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('txt')}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputDek}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('dek')}
        style={{ display: 'none' }}
      />
      <input
        ref={fileInputEld}
        accept="text/*"
        type="file"
        onChange={() => handleFileChange('eld')}
        style={{ display: 'none' }}
      />
      <ErrorOverlay
        show={createError || importError}
        target={ref.current}
        placement="left"
        modal={true}
      >
        {createError && <b>ERROR</b>}
        {importError && <b>CANNOT IMPORT THIS DECK</b>}
      </ErrorOverlay>
    </>
  );
}

export default DeckImport;
