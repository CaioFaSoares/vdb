import React from 'react';
import { useSnapshot } from 'valtio';
import {
  InventoryNewCryptCard,
  InventoryNewLibraryCard,
  InventoryCrypt,
  InventoryLibrary,
  InventoryButtons,
  InventoryShowSelect,
} from '@/components';
import { useApp, inventoryStore, usedStore } from '@/context';

const InventoryDesktop = ({
  newCryptId,
  newLibraryId,
  setNewCryptId,
  setNewLibraryId,
  newCryptRef,
  newLibraryRef,
  newCryptFocus,
  newLibraryFocus,
  clan,
  type,
  discipline,
  setClan,
  setType,
  setDiscipline,
  missingByClan,
  missingByType,
  missingByDiscipline,
  setMissingByClan,
  setMissingByType,
  setMissingByDiscipline,
  category,
  setCategory,
  setShowAddDeck,
  setShowAddPrecon,
  setShowShareModal,
  sharedInventoryCrypt,
  sharedInventoryLibrary,
  setInventoryKey,
  inShared,
}) => {
  const { cryptCardBase, libraryCardBase, isWide } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const usedLibrary = useSnapshot(usedStore).library;

  return (
    <>
      <div className="2xl:basis-1/12 basis-0" />
      <div className="md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
        {!inShared && (
          <>
            <div className="sticky top-0 z-20 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[40px]  ">
              <InventoryNewCryptCard
                cards={inventoryCrypt}
                setNewId={setNewCryptId}
                newRef={newCryptRef}
              />
            </div>
            {newCryptId && (
              <div className="top-[46px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[102px]">
                <InventoryCrypt
                  cards={{
                    [newCryptId]: inventoryCrypt[newCryptId]
                      ? inventoryCrypt[newCryptId]
                      : { c: cryptCardBase[newCryptId], q: 0 },
                  }}
                  compact={true}
                  newFocus={newCryptFocus}
                />
              </div>
            )}
          </>
        )}
        {inventoryCrypt && (usedCrypt.soft || usedCrypt.hard) && (
          <div>
            <InventoryCrypt
              withCompact={newCryptId}
              category={sharedInventoryCrypt ? 'ok' : category}
              cards={
                sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt
              }
              clan={clan}
              setClan={setClan}
              setMissingByClan={setMissingByClan}
              inShared={inShared}
            />
          </div>
        )}
      </div>
      <div className="md:basis-1/2 lg:basis-1/2 xl:basis-1/2">
        {!inShared && (
          <>
            <div className="sticky top-0 z-20 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[40px]  ">
              <InventoryNewLibraryCard
                cards={inventoryLibrary}
                setNewId={setNewLibraryId}
                newRef={newLibraryRef}
              />
            </div>
            {newLibraryId && (
              <div className="top-[46px] z-10 bg-bgPrimary dark:bg-bgPrimaryDark sm:top-[102px]">
                <InventoryLibrary
                  cards={{
                    [newLibraryId]: inventoryLibrary[newLibraryId]
                      ? inventoryLibrary[newLibraryId]
                      : { c: libraryCardBase[newLibraryId], q: 0 },
                  }}
                  compact={true}
                  newFocus={newLibraryFocus}
                />
              </div>
            )}
          </>
        )}
        {inventoryLibrary && (usedLibrary.soft || usedLibrary.hard) && (
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
              setMissingByType={setMissingByType}
              setMissingByDiscipline={setMissingByDiscipline}
              inShared={inShared}
            />
          </div>
        )}
      </div>
      <div className="hidden lg:flex lg:basis-1/6">
        <div className="top-[77px] z-20 space-y-6 bg-bgPrimary dark:bg-bgPrimaryDark">
          <InventoryButtons
            crypt={sharedInventoryCrypt ? sharedInventoryCrypt : inventoryCrypt}
            library={
              sharedInventoryLibrary ? sharedInventoryLibrary : inventoryLibrary
            }
            setShowAddDeck={setShowAddDeck}
            setShowAddPrecon={setShowAddPrecon}
            setShowShareModal={setShowShareModal}
            clan={clan}
            discipline={discipline}
            type={type}
            missingByClan={missingByClan}
            missingByType={missingByType}
            missingByDiscipline={missingByDiscipline}
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
      </div>
    </>
  );
};

export default InventoryDesktop;
