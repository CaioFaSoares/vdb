import React, { useState } from 'react';
import TrashFill from 'assets/images/icons/trash-fill.svg';
import { ModalConfirmation } from 'components';
import { useApp } from 'context';
import ButtonIconed from 'components/ButtonIconed.jsx';

const InventoryDelete = ({ setShowButtons }) => {
  const { setInventoryCrypt, setInventoryLibrary, isNarrow } = useApp();
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteInventory();
    setShowConfirmation(false);
    isNarrow && setShowButtons(false);
  };

  const deleteInventory = () => {
    const url = `${process.env.API_URL}inventory/delete`;
    const options = {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
    };

    fetch(url, options).then(() => {
      setInventoryCrypt({});
      setInventoryLibrary({});
    });
  };

  return (
    <>
      <ButtonIconed
        variant="secondary"
        onClick={() => setShowConfirmation(true)}
        title="Delete Inventory"
        icon={<TrashFill />}
        text="Delete Inventory"
      />
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
};

export default InventoryDelete;
