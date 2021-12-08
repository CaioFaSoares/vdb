import React from 'react';
import {
  ResultCryptName,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultClanImage,
} from 'components';
import { useApp } from 'context';

const SelectLabelCrypt = (props) => {
  const { inventoryCrypt, cryptCardBase } = useApp();

  return (
    <>
      <div className="d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center">
          {props.inInventory && (
            <div
              className={`d-inline in-inventory me-2 ${
                inventoryCrypt[props.cardid] ? 'border-black' : null
              }`}
            >
              {inventoryCrypt[props.cardid] && inventoryCrypt[props.cardid].q}
            </div>
          )}
          <ResultCryptCapacity
            value={cryptCardBase[props.cardid]['Capacity']}
          />
          <div className="px-2">
            <ResultCryptName card={cryptCardBase[props.cardid]} />
          </div>
          <div className="pe-3">
            <ResultClanImage value={cryptCardBase[props.cardid]['Clan']} />
          </div>
        </div>
        <div className="d-flex flex-nowrap">
          <ResultCryptDisciplines
            value={cryptCardBase[props.cardid]['Disciplines']}
          />
        </div>
      </div>
    </>
  );
};

export default SelectLabelCrypt;
