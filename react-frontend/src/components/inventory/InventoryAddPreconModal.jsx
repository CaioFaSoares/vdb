import React, { useState, useEffect } from 'react';
import { Modal, Row, Col, FormControl, Button } from 'react-bootstrap';
import EyeFill from 'assets/images/icons/eye-fill.svg';
import GiftFill from 'assets/images/icons/gift-fill.svg';
import X from 'assets/images/icons/x.svg';
import {
  DeckCrypt,
  DeckLibrary,
  DeckSelectSortForm,
  InventoryDeckAddButton,
  InventoryDeckDeleteButton,
  OverlayTooltip,
  ResultLibraryClan,
} from 'components';
import { decksSort } from 'utils';
import { useApp } from 'context';
import setsAndPrecons from 'components/forms_data/setsAndPrecons.json';

function InventoryAddDeckModal(props) {
  const { inventoryCrypt, inventoryLibrary, preconDecks, isMobile } = useApp();

  const [sortMethod, setSortMethod] = useState('byDate');
  const [sortedDecks, setSortedDecks] = useState([]);
  const [showDeck, setShowDeck] = useState(undefined);
  const [nameFilter, setNameFilter] = useState('');
  const [setFilter, setSetFilter] = useState('');
  let resultTrClass;

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

  useEffect(() => {
    if (Object.values(preconDecks).length > 0) {
      let filtered = Object.values(preconDecks);

      if (nameFilter) {
        filtered = filtered.filter((deck) => {
          if (deck.name.toLowerCase().indexOf(nameFilter.toLowerCase()) >= 0)
            return true;
        });
      }

      if (setFilter) {
        filtered = filtered.filter((deck) => {
          const set = deck.deckid.split(':')[0];
          if (
            setsAndPrecons[set].name
              .toLowerCase()
              .indexOf(setFilter.toLowerCase()) >= 0
          )
            return true;
        });
      }

      const sorted = decksSort(filtered, sortMethod);
      setSortedDecks(sorted);
    }
  }, [preconDecks, nameFilter, setFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, index) => {
    if (resultTrClass == 'result-even') {
      resultTrClass = 'result-odd';
    } else {
      resultTrClass = 'result-even';
    }

    let cryptInInventory = true;
    let libraryInInventory = true;

    Object.keys(deck.crypt).map((cardid) => {
      if (deck.crypt[cardid].q != 0) {
        if (
          !inventoryCrypt[cardid] ||
          inventoryCrypt[cardid].q < deck.crypt[cardid].q
        ) {
          cryptInInventory = false;
        }
      }
    });

    Object.keys(deck.library).map((cardid) => {
      if (deck.library[cardid].q != 0) {
        if (
          !inventoryLibrary[cardid] ||
          inventoryLibrary[cardid].q < deck.library[cardid].q
        ) {
          libraryInInventory = false;
        }
      }
    });

    const inInventory = cryptInInventory && libraryInInventory ? true : false;

    const [set, precon] = deck.deckid.split(':');
    const clans = setsAndPrecons[set].precons[precon].clan.split('/');

    const clanImages = clans.map((clan, index) => {
      return (
        <div className="d-inline px-1" key={index}>
          {clan === 'Bundle' ? (
            <div className="d-inline clan-image-results">
              <GiftFill />
            </div>
          ) : clan === 'Mix' ? null : (
            <ResultLibraryClan value={clan} />
          )}
        </div>
      );
    });

    return (
      <React.Fragment key={deck.deckid}>
        <tr className={resultTrClass}>
          {!isMobile && (
            <td className="clan">{clanImages.length > 0 && clanImages}</td>
          )}
          <td className="name px-1">
            <div
              className="d-flex text-overflow name justify-content-between"
              title={deck.name}
            >
              {deck.name}
              {deck.branchName &&
                (deck.master ||
                  (deck.branches && deck.branches.length > 0)) && (
                  <div
                    className="d-inline ps-2 revision"
                    title={deck.branchName}
                  >
                    {deck.branchName}
                  </div>
                )}
            </div>
          </td>
          {!isMobile && (
            <td className="preview">
              <div
                className="m-2"
                onMouseEnter={() => setShowDeck(deck.deckid)}
                onMouseLeave={() => setShowDeck(false)}
              >
                <OverlayTooltip
                  placement="right"
                  show={showDeck === deck.deckid}
                  className="modal-tooltip-preview"
                  text={
                    <Row>
                      <Col
                        md={7}
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                      >
                        <DeckCrypt deckid={deck.deckid} cards={deck.crypt} />
                      </Col>
                      <Col
                        md={5}
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                      >
                        <DeckLibrary
                          deckid={deck.deckid}
                          cards={deck.library}
                        />
                      </Col>
                    </Row>
                  }
                >
                  <div>
                    <EyeFill />
                  </div>
                </OverlayTooltip>
              </div>
            </td>
          )}
          <td className="set">
            {isMobile ? (
              <>
                <div>{setsAndPrecons[set].name}</div>
                <div className="d-flex justify-content-end small">
                  {setsAndPrecons[set].date.slice(0, 4)}
                </div>
              </>
            ) : (
              <>
                {setsAndPrecons[set].date.slice(0, 4)}
                <span className="px-3">–</span>
                {setsAndPrecons[set].name}
              </>
            )}
          </td>
          <td className="buttons">
            <div className="d-inline pe-1">
              <InventoryDeckAddButton
                inventoryDeckAdd={props.inventoryDeckAdd}
                deck={deck}
                inInventory={inInventory}
              />
            </div>
            <div className="d-inline pe-1">
              <InventoryDeckDeleteButton
                inventoryDeckDelete={props.inventoryDeckDelete}
                deck={deck}
                inInventory={inInventory}
              />
            </div>
          </td>
        </tr>
      </React.Fragment>
    );
  });

  return (
    <Modal
      show={props.show}
      onHide={props.handleClose}
      animation={false}
      size="xl"
      dialogClassName={isMobile ? 'm-0' : null}
    >
      <Modal.Header
        className={
          isMobile
            ? 'no-border pt-2 pb-0 ps-2 pe-3'
            : 'no-border pt-3 pb-1 ps-3 pe-4'
        }
      >
        <h5>Import Precon to Inventory</h5>
        <Button variant="outline-secondary" onClick={props.handleClose}>
          <X width="32" height="32" viewBox="0 0 16 16" />
        </Button>
      </Modal.Header>
      <Modal.Body className={isMobile ? 'p-0' : 'pt-0'}>
        <table className="inv-import-precons-table">
          <thead>
            <tr>
              {!isMobile && <th className="clan"></th>}
              <th className="name">
                <FormControl
                  placeholder="Filter by Name"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={nameFilter}
                  onChange={handleChangeNameFilter}
                />
              </th>
              {!isMobile && <th className="preview"></th>}
              <th className="set">
                <FormControl
                  placeholder="Filter by Set"
                  type="text"
                  name="text"
                  autoComplete="off"
                  spellCheck="false"
                  value={setFilter}
                  onChange={handleChangeSetFilter}
                />
              </th>
              <th className="buttons">
                <div className="d-flex justify-content-end align-items-center px-1">
                  <DeckSelectSortForm onChange={setSortMethod} />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>{deckRows}</tbody>
        </table>
      </Modal.Body>
    </Modal>
  );
}

export default InventoryAddDeckModal;
