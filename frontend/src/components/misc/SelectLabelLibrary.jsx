import React from 'react';
import { useSnapshot } from 'valtio';
import {
  ResultLibraryName,
  ResultLibraryDisciplines,
  ResultLibraryTypeImage,
  ResultLibraryCost,
  ResultLibraryClan,
} from 'components';
import { useApp, inventoryStore } from 'context';

const SelectLabelLibrary = ({ cardid, inInventory }) => {
  const { libraryCardBase } = useApp();
  const inventoryLibrary = useSnapshot(inventoryStore).library;

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {inInventory && (
            <div
              className={`d-inline in-inventory me-2 ${
                inventoryLibrary[cardid] ? 'border-black' : null
              }`}
            >
              {inventoryLibrary[cardid] && inventoryLibrary[cardid].q}
            </div>
          )}
          <ResultLibraryTypeImage value={libraryCardBase[cardid].Type} />
          <div className="ps-1">
            <ResultLibraryName card={libraryCardBase[cardid]} />
          </div>
        </div>
        <div>
          {libraryCardBase[cardid].Discipline && (
            <div className="d-inline px-2">
              <ResultLibraryDisciplines
                value={libraryCardBase[cardid].Discipline}
              />
            </div>
          )}
          {libraryCardBase[cardid].Clan && (
            <div className="d-inline px-2">
              <ResultLibraryClan value={libraryCardBase[cardid].Clan} />
            </div>
          )}
          {(libraryCardBase[cardid]['Blood Cost'] ||
            libraryCardBase[cardid]['Pool Cost']) && (
            <div className="d-inline px-2">
              <ResultLibraryCost
                valuePool={libraryCardBase[cardid]['Pool Cost']}
                valueBlood={libraryCardBase[cardid]['Blood Cost']}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SelectLabelLibrary;
