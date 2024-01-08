import React, { useEffect, useState, useRef } from 'react';
import { useSnapshot } from 'valtio';
import { useLocation } from 'react-router-dom';
import {
  LoginBlock,
  InventoryAddDeckModal,
  InventoryAddPreconModal,
  NewCardSelect,
  InventoryCrypt,
  InventoryLibrary,
  InventoryButtons,
  InventoryShowSelect,
  InventoryShareModal,
  Modal,
  ButtonFloat,
  ButtonFloatMenu,
  ErrorMessage,
  Checkbox,
  FlexGapped,
} from '@/components';
import { useApp, inventoryStore } from '@/context';

const Inventory = () => {
  const {
    username,
    isMobile,
    showMenuButtons,
    setShowMenuButtons,
    showFloatingButtons,
    setShowFloatingButtons,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const [inventoryError, setInventoryError] = useState();
  const [inventoryKey, setInventoryKey] = useState();
  const query = new URLSearchParams(useLocation().search);
  const [sharedInventoryCrypt, setSharedInventoryCrypt] = useState();
  const [sharedInventoryLibrary, setSharedInventoryLibrary] = useState();
  const [showShareModal, setShowShareModal] = useState(false);
  const [showCryptOnMobile, setShowCryptOnMobile] = useState(true);

  const getInventory = (key) => {
    const url = `${import.meta.env.VITE_API_URL}/inventory/${key}`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    setInventoryError(false);
    fetch(url, options)
      .then((response) => {
        if (!response.ok) throw Error(response.status);
        return response.json();
      })
      .then((data) => {
        const crypt = {};
        const library = {};
        Object.keys(data.crypt).map((k) => {
          crypt[k] = { ...data.crypt[k], c: cryptCardBase[k] };
        });
        Object.keys(data.library).map((k) => {
          library[k] = { ...data.library[k], c: libraryCardBase[k] };
        });
        setSharedInventoryCrypt(crypt);
        setSharedInventoryLibrary(library);
      })
      .catch((error) => {
        if (error.message == 401) {
          setInventoryError('NO INVENTORY WITH THIS KEY');
        } else {
          setInventoryError('CONNECTION PROBLEM');
        }
      });
  };

  useEffect(() => {
    if (query.get('key')) setInventoryKey(query.get('key'));
  }, [query]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase) {
      if (inventoryKey) {
        getInventory(inventoryKey);
      } else {
        setSharedInventoryCrypt(undefined);
        setSharedInventoryLibrary(undefined);
      }
    }
  }, [inventoryKey, cryptCardBase, libraryCardBase]);

  const [newCryptId, setNewCryptId] = useState();
  const [newLibraryId, setNewLibraryId] = useState();
  const [category, setCategory] = useState('all');
  const [showAddDeck, setShowAddDeck] = useState(false);
  const [showAddPrecon, setShowAddPrecon] = useState(false);
  const [clan, setClan] = useState('All');
  const [type, setType] = useState('All');
  const [discipline, setDiscipline] = useState('All');
  const [onlyNotes, setOnlyNotes] = useState(false);

  const [missingCryptByClan, setMissingCryptByClan] = useState();
  const [missingLibraryByType, setMissingLibraryByType] = useState();
  const [missingLibraryByDiscipline, setMissingLibraryByDiscipline] =
    useState();

  const newCryptFocus = () => newCryptRef.current.focus();
  const newCryptRef = useRef();
  const newLibraryFocus = () => newLibraryRef.current.focus();
  const newLibraryRef = useRef();

  const inShared = !!inventoryKey;

  const handleNewCard = (event) => {
    if (event.value > 200000) {
      setNewCryptId(event.value);
    } else {
      setNewLibraryId(event.value);
    }
  };

  return (
    <div className="inventory-container mx-auto">
      {(!inShared && username) || (inShared && !inventoryError) ? (
        <FlexGapped>
          <div
            className={`${
              showCryptOnMobile ? 'flex' : 'hidden'
            } basis-full flex-col sm:flex sm:basis-5/9 sm:gap-2 lg:gap-3 xl:gap-4`}
          >
            {!inShared && (
              <>
                <div className="p-2 sm:p-0">
                  <NewCardSelect
                    onChange={handleNewCard}
                    ref={newCryptRef}
                    target="crypt"
                    inInventory
                  />
                </div>
                {newCryptId && (
                  <InventoryCrypt
                    cards={{
                      [newCryptId]: inventoryCrypt[newCryptId]
                        ? inventoryCrypt[newCryptId]
                        : { c: cryptCardBase[newCryptId], q: 0 },
                    }}
                    newFocus={newCryptFocus}
                    compact
                  />
                )}
              </>
            )}
            <div>
              <InventoryCrypt
                withCompact={newCryptId}
                category={sharedInventoryCrypt ? 'ok' : category}
                cards={
                  sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
                }
                clan={clan}
                setClan={setClan}
                setMissingCryptByClan={setMissingCryptByClan}
                inShared={inShared}
                onlyNotes={onlyNotes}
              />
            </div>
          </div>
          <div
            className={`${
              showCryptOnMobile ? 'hidden' : 'flex'
            } basis-full flex-col sm:flex sm:basis-4/9 sm:gap-2 lg:gap-3 xl:gap-4`}
          >
            {!inShared && (
              <>
                <div className="p-2 sm:p-0">
                  <NewCardSelect
                    onChange={handleNewCard}
                    ref={newLibraryRef}
                    target="library"
                    inInventory
                  />
                </div>
                {newLibraryId && (
                  <InventoryLibrary
                    cards={{
                      [newLibraryId]: inventoryLibrary[newLibraryId]
                        ? inventoryLibrary[newLibraryId]
                        : { c: libraryCardBase[newLibraryId], q: 0 },
                    }}
                    newFocus={newLibraryFocus}
                    compact
                  />
                )}
              </>
            )}
            <div>
              <InventoryLibrary
                withCompact={newLibraryId}
                category={sharedInventoryLibrary ? 'ok' : category}
                cards={
                  sharedInventoryLibrary
                    ? sharedInventoryLibrary
                    : inventoryLibrary
                }
                type={type}
                setType={setType}
                discipline={discipline}
                setDiscipline={setDiscipline}
                setMissingLibraryByType={setMissingLibraryByType}
                setMissingLibraryByDiscipline={setMissingLibraryByDiscipline}
                inShared={inShared}
                onlyNotes={onlyNotes}
              />
            </div>
          </div>
          <div className="flex basis-full flex-col space-y-6 max-lg:hidden lg:basis-2/12">
            <InventoryButtons
              crypt={
                sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
              }
              library={
                sharedInventoryLibrary
                  ? sharedInventoryLibrary
                  : inventoryLibrary
              }
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              clan={clan}
              discipline={discipline}
              type={type}
              missingCryptByClan={missingCryptByClan}
              missingLibraryByType={missingLibraryByType}
              missingLibraryByDiscipline={missingLibraryByDiscipline}
              setInventoryKey={setInventoryKey}
              inShared={inShared}
            />
            <div>
              <InventoryShowSelect
                category={category}
                setCategory={setCategory}
              />
            </div>
            <div className="text-fgSecondary dark:text-fgSecondaryDark font-bold">
              <Checkbox
                label="Only with Notes"
                checked={onlyNotes}
                onChange={() => setOnlyNotes(!onlyNotes)}
              />
            </div>
          </div>
          {isMobile && showFloatingButtons && (
            <ButtonFloat
              onClick={() => setShowCryptOnMobile(!showCryptOnMobile)}
              position="middle"
              variant="primary"
            >
              <div className="text-[28px]">
                {showCryptOnMobile ? 'LIB' : 'CR'}
              </div>
            </ButtonFloat>
          )}
        </FlexGapped>
      ) : inventoryError ? (
        <ErrorMessage>{inventoryError}</ErrorMessage>
      ) : (
        <div className="grid h-[80vh] place-items-center max-sm:px-2">
          <LoginBlock>Login to manage your inventory</LoginBlock>
        </div>
      )}
      <ButtonFloatMenu />
      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          centered
          size="sm"
        >
          <div className="space-y-3">
            <InventoryButtons
              crypt={
                sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
              }
              library={
                sharedInventoryCrypt ? sharedInventoryLibrary : inventoryLibrary
              }
              setShowAddDeck={setShowAddDeck}
              setShowAddPrecon={setShowAddPrecon}
              setShowShareModal={setShowShareModal}
              clan={clan}
              discipline={discipline}
              type={type}
              missingCryptByClan={missingCryptByClan}
              missingLibraryByType={missingLibraryByType}
              missingLibraryByDiscipline={missingLibraryByDiscipline}
              setInventoryKey={setInventoryKey}
              inShared={inShared}
            />
            <div>
              <InventoryShowSelect
                category={category}
                setCategory={setCategory}
              />
            </div>
          </div>
        </Modal>
      )}
      {showAddDeck && (
        <InventoryAddDeckModal
          handleClose={() => {
            setShowAddDeck(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showAddPrecon && (
        <InventoryAddPreconModal
          handleClose={() => {
            setShowAddPrecon(false);
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
        />
      )}
      {showShareModal && (
        <InventoryShareModal
          show={showShareModal}
          setShow={setShowShareModal}
        />
      )}
    </div>
  );
};

export default Inventory;
