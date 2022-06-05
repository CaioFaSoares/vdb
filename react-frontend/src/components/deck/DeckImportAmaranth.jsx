import React, { useState, useRef, useEffect } from 'react';
import { FormControl, Modal, Button, Spinner } from 'react-bootstrap';
import X from 'assets/images/icons/x.svg';
import { ErrorOverlay } from 'components';
import { useApp } from 'context';

const DeckImportAmaranth = ({
  addImportedDeckToState,
  parseCards,
  handleCloseModal,
  show,
}) => {
  const { setDecks, setActiveDeck, isMobile } = useApp();
  const [deckUrl, setDeckUrl] = useState('');
  const [emptyError, setEmptyError] = useState(false);
  const [importError, setImportError] = useState(false);
  const refUrl = useRef(null);
  const [idReference, setIdReference] = useState(undefined);
  const [spinnerState, setSpinnerState] = useState(false);

  const getIdReference = () => {
    const VERSION = '2021-12-25';
    const url = `${process.env.ROOT_URL}amaranth_ids.json?v=${VERSION}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => data.error === undefined && setIdReference(data));
  };

  const handleClose = () => {
    handleCloseModal();
    setDeckUrl('');
  };

  const handleImportButton = () => {
    setImportError(false);

    if (/.*#deck\//.test(deckUrl)) {
      setEmptyError(false);
      setSpinnerState(true);

      if (idReference) {
        getDeckFromUrl(deckUrl)
          .then((deck) => importDeckFromAmaranth(deck))
          .then(() => {
            setDeckUrl('');
            setSpinnerState(false);
            handleClose();
          })
          .catch((error) => {
            setImportError(true);
            setSpinnerState(false);
          });
      }
    } else {
      setEmptyError(true);
    }
  };

  const branchesImport = async (master, revisions) => {
    const branches = [];

    revisions.map((revision) => {
      const cards = {};
      Object.keys(revision.cards).map((i) => {
        if (idReference[i] !== undefined) {
          cards[idReference[i]] = revision.cards[i];
        }
      });

      branches.push({
        cards: cards,
        comments: revision.comments,
      });
    });

    const url = `${process.env.API_URL}branch/import`;

    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        master: master,
        branches: branches,
      }),
    };

    return fetch(url, options)
      .then((response) => response.json())
      .then((data) => {
        data.deckids.map((deckid, idx) => {
          branches[idx].deckid = deckid;
        });
        return branches;
      })
      .catch((error) => setImportError(true));
  };

  const importDeckFromAmaranth = async (deck) => {
    const cards = {};
    Object.keys(deck.cards).map((i) => {
      if (idReference[i] !== undefined) {
        cards[idReference[i]] = deck.cards[i];
      }
    });

    const url = `${process.env.API_URL}decks/create`;
    const options = {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deckname: deck.title,
        author: deck.author,
        description: deck.description,
        cards: cards,
      }),
    };

    const fetchPromise = fetch(url, options);

    fetchPromise
      .then((response) => response.json())
      .then((data) => {
        if (deck.versions) {
          branchesImport(data.deckid, deck.versions).then((branches) => {
            const now = new Date();
            const decks = {};

            branches.map((b, idx) => {
              const { crypt, library } = parseCards(b.cards);
              decks[b.deckid] = {
                deckid: b.deckid,
                master: data.deckid,
                name: deck.title,
                branchName: `#${idx + 1}`,
                author: deck.author,
                description: b.comments || '',
                crypt: crypt,
                library: library,
                is_yours: true,
                timestamp: now.toUTCString(),
              };
            });

            const { crypt, library } = parseCards(cards);
            decks[data.deckid] = {
              deckid: data.deckid,
              name: deck.title,
              branches: Object.keys(decks),
              branchName: '#0',
              author: deck.author,
              description: deck.description || '',
              crypt: crypt,
              library: library,
              is_yours: true,
              timestamp: now.toUTCString(),
            };

            setDecks((prevState) => ({
              ...prevState,
              ...decks,
            }));
          });
        } else {
          addImportedDeckToState({ data });
        }

        setActiveDeck({ src: 'my', deckid: data.deckid });
      })
      .catch((error) => setImportError(true));
  };

  const getDeckFromUrl = async (deckUrl) => {
    const url = `${process.env.AMARANTH_API_URL}deck`;
    const id = deckUrl.replace(/.*#deck\//i, '');
    const options = {
      method: 'POST',
      body: `id=${id}`,
    };

    const response = await fetch(url, options).catch((error) =>
      setImportError(true)
    );
    const deck = await response.json();
    return deck.result;
  };

  useEffect(() => {
    if (show && !idReference) getIdReference();
  }, [show]);

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onShow={() => refUrl.current.focus()}
      animation={false}
      size="lg"
      centered={isMobile}
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={isMobile ? 'pt-2 pb-0 ps-2 pe-3' : 'pt-3 pb-1 px-4'}
      >
        <h5>Import from Amaranth URL</h5>
        <Button variant="outline-secondary" onClick={handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'px-0 pt-0' : 'px-4 pt-2'}>
        <FormControl
          placeholder="e.g. https://amaranth.co.nz/deck#my-best-deck-id"
          className="deck-import mb-3"
          type="text"
          name="url"
          value={deckUrl}
          onChange={(event) => setDeckUrl(event.target.value)}
          ref={refUrl}
        />
        <div
          className={
            isMobile
              ? 'd-flex justify-content-end py-0 px-3'
              : 'd-flex justify-content-end py-1'
          }
        >
          {!spinnerState ? (
            <Button variant="primary" onClick={handleImportButton}>
              Import
            </Button>
          ) : (
            <Button variant="primary" onClick={handleImportButton}>
              <Spinner animation="border" size="sm" />
              <span className="ps-2">Import</span>
            </Button>
          )}
        </div>
        <ErrorOverlay
          show={emptyError}
          target={refUrl.current}
          placement="bottom"
          modal={true}
        >
          ERROR IN URL
        </ErrorOverlay>
        <ErrorOverlay
          show={importError}
          target={refUrl.current}
          placement="bottom"
          modal={true}
        >
          ERROR DURING IMPORT
        </ErrorOverlay>
      </Modal.Body>
    </Modal>
  );
};

export default DeckImportAmaranth;
