import React, { useState, useContext } from 'react';
import { Button } from 'react-bootstrap';
import TrashFill from '../../assets/images/icons/trash-fill.svg';
import ModalConfirmation from './ModalConfirmation.jsx';
import AppContext from '../../context/AppContext.js';

function InventoryDelete(props) {
  const { isMobile } = useContext(AppContext);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteInventory();
    setShowConfirmation(false);
    isMobile && props.setShowButtons(false);
  };

  const deleteInventory = () => {
    const url = `${process.env.API_URL}inventory/delete`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options).then(() => {
      props.setInventoryCrypt({});
      props.setInventoryLibrary({});
    });
  };

  return (
    <>
      <Button variant="secondary" onClick={() => setShowConfirmation(true)}>
        <div className="d-flex justify-content-center align-items-center">
          <div className="pe-2">
            <TrashFill />
          </div>
          Delete Inventory
        </div>
      </Button>
      <ModalConfirmation
        withConfirmation={true}
        show={showConfirmation}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        headerText={`Delete Inventory`}
        mainText="THIS CANNOT BE UNDONE!"
        buttonText="Delete"
      />
    </>
  );
}

export default InventoryDelete;
