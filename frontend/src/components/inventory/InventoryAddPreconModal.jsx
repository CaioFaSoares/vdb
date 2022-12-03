import React, { useState, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import { Modal, Col, FormControl, Button } from 'react-bootstrap';
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
import { useApp, inventoryStore } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const InventoryAddDeckModal = ({ show, handleClose }) => {
  const { preconDecks, playtest, isDesktop, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  const [sortMethod, setSortMethod] = useState('byDate');
  const [showDeck, setShowDeck] = useState(undefined);
  const [nameFilter, setNameFilter] = useState('');
  const [setFilter, setSetFilter] = useState('');

  const handleChangeNameFilter = (event) => {
    setNameFilter(event.target.value);
  };

  const handleChangeSetFilter = (event) => {
    setSetFilter(event.target.value);
  };

  const sortedDecks = useMemo(() => {
    if (Object.values(preconDecks).length > 0) {
      let filtered = Object.values(preconDecks).filter((i) => {
        const set = i.deckid.split(':')[0];
        return playtest || set !== 'PLAYTEST';
      });

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

      return decksSort(filtered, sortMethod);
    } else {
      return [];
    }
  }, [preconDecks, nameFilter, setFilter, sortMethod]);

  const deckRows = sortedDecks.map((deck, idx) => {
    let cryptInInventory;
    let libraryInInventory;

    if (deck.crypt) {
      Object.keys(deck.crypt).map((cardid) => {
        if (deck.crypt[cardid].q > 0) {
          if (inventoryCrypt[cardid]) {
            const inInventory = Math.floor(
              inventoryCrypt[cardid].q / deck.crypt[cardid].q
            );
            if (!cryptInInventory || inInventory < cryptInInventory) {
              cryptInInventory = inInventory;
            }
          } else {
            cryptInInventory = 0;
          }
        }
      });
    }

    if (deck.library) {
      Object.keys(deck.library).map((cardid) => {
        if (deck.library[cardid].q > 0) {
          if (inventoryLibrary[cardid]) {
            const inInventory = Math.floor(
              inventoryLibrary[cardid].q / deck.library[cardid].q
            );
            if (!libraryInInventory || inInventory < libraryInInventory) {
              libraryInInventory = inInventory;
            }
          } else {
            libraryInInventory = 0;
          }
        }
      });
    }

    if (cryptInInventory === undefined) cryptInInventory = libraryInInventory;
    if (libraryInInventory === undefined) libraryInInventory = cryptInInventory;
    const inInventory = Math.min(cryptInInventory, libraryInInventory);
    const [set, precon] = deck.deckid.split(':');
    const clans = setsAndPrecons[set].precons[precon].clan.split('/');

    const clanImages = clans.map((clan, idx) => {
      return (
        <div className="d-inline px-1" key={idx}>
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
        <tr className={`result-${idx % 2 ? 'even' : 'odd'}`}>
          {!isMobile && (
            <td className="clan">{clanImages.length > 0 && clanImages}</td>
          )}
          <td className="name px-1">
            <div
              className="flex text-overflow name justify-between"
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
          {isDesktop && (
            <td className="preview">
              <div
                className="m-2"
                onMouseEnter={() => setShowDeck(deck.deckid)}
                onMouseLeave={() => setShowDeck(false)}
              >
                <OverlayTooltip
                  placement="right"
                  show={showDeck === deck.deckid}
                  text={
                    <div className="flex flex-row">
                      <div
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                        className="md:basis-7/12 overflow-y-auto h-[80vh]"
                      >
                        <DeckCrypt inAdvSelect={true} deck={deck} />
                      </div>
                      <div
                        onClick={(event) => {
                          if (event.target === event.currentTarget)
                            setShowDeck(false);
                        }}
                        className="md:basis-5/12 overflow-y-auto h-[80vh]"
                      >
                        <DeckLibrary deck={deck} />
                      </div>
                    </div>
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
                <div className="flex justify-end text-xs">
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
              <InventoryDeckAddButton deck={deck} inInventory={inInventory} />
            </div>
            <div className="d-inline pe-1">
              <InventoryDeckDeleteButton
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
      show={show}
      onHide={handleClose}
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
        <div className="text-lg text-blue font-bold">Import Precon to Inventory</div>
        <Button variant="outline-secondary" onClick={handleClose}>
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
              {isDesktop && <th className="preview"></th>}
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
                <div className="flex justify-end items-center px-1">
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
};

export default InventoryAddDeckModal;
