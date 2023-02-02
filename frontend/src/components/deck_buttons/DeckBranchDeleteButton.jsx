import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useNavigate } from 'react-router-dom';
import NodeMinusFill from '@/assets/images/icons/node-minus-fill.svg';
import { ButtonIconed, ModalConfirmation } from '@/components';
import { deckStore, useApp } from '@/context';

const DeckBranchDeleteButton = ({ deck, noText }) => {
  const { setShowFloatingButtons, setShowMenuButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const [showConfirmation, setShowConfirmation] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => setShowConfirmation(false);
  const handleConfirm = () => {
    deleteBranch(deck.deckid);
    setShowConfirmation(false);
    setShowMenuButtons(false);
    setShowFloatingButtons(true);
  };

  const deleteBranch = (deckid) => {
    const url = `${import.meta.env.VITE_API_URL}/deck/${deckid}/branch`;
    const options = {
      method: 'DELETE',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    fetch(url, options).then(() => {
      const masterId = decks[deckid].master || null;
      const branches = masterId
        ? [...decks[masterId].branches]
        : [...decks[deckid].branches];

      delete deckStore.decks[deckid];

      if (masterId) {
        branches.splice(branches.indexOf(deckid), 1);
        deckStore.decks[masterId].branches = branches;
        deckStore.decks[masterId].isBranches = branches.length > 0;
        navigate(`/decks/${masterId}`);
      } else {
        const newMasterId = branches.pop();
        deckStore.decks[newMasterId].branches = branches;
        deckStore.decks[newMasterId].isBranches = branches.length > 0;
        deckStore.decks[newMasterId].master = null;
        branches.map((b) => {
          deckStore.decks[b].master = newMasterId;
        });
        navigate(`/decks/${newMasterId}`);
      }
    });
  };

  return (
    <>
      <ButtonIconed
        variant={noText ? 'primary' : 'secondary'}
        onClick={() => setShowConfirmation(true)}
        title="Delete Revision"
        icon={
          <NodeMinusFill
            width={noText ? '18' : '21'}
            height={noText ? '22' : '21'}
            viewBox="0 0 16 16"
          />
        }
        text={noText ? null : 'Delete Revision'}
      />
      {showConfirmation && (
        <ModalConfirmation
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          title={`Delete revision "${deck.branchName} of deck "${deck.name}"`}
          buttonText="Delete"
        >
          THIS CANNOT BE UNDONE!
        </ModalConfirmation>
      )}
    </>
  );
};

export default DeckBranchDeleteButton;
