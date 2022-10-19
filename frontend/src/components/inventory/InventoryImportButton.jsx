import React from 'react';
import { ButtonGroup, Dropdown, DropdownButton } from 'react-bootstrap';
import Upload from 'assets/images/icons/upload.svg';

const InventoryImportButton = ({ handleClick }) => {
  const ButtonOptions = (
    <>
      <Dropdown.Item onClick={() => handleClick('txt')}>
        Import from File - Amaranth, Lackey.TXT, TWD
      </Dropdown.Item>
      <Dropdown.Item onClick={() => handleClick('eld')}>
        Import from File - FELDB.CSV
      </Dropdown.Item>
    </>
  );

  return (
    <DropdownButton
      as={ButtonGroup}
      variant="secondary"
      title={
        <div className="d-flex justify-content-center align-items-center">
          <div className="d-flex pe-2">
            <Upload />
          </div>
          Import Inventory
        </div>
      }
    >
      {ButtonOptions}
    </DropdownButton>
  );
};

export default InventoryImportButton;
