import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { FlexGapped, DiffCryptTable, ResultModal, DeckCryptHeader } from '@/components';
import { useApp, deckStore } from '@/context';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from '@/hooks';

const DiffCrypt = ({ cardsTo, deck }) => {
  const { isMobile, cryptDeckSort, changeCryptDeckSort, setShowFloatingButtons } = useApp();
  const changeTimer = useSnapshot(deckStore).cryptTimer;
  const [showInfo, setShowInfo] = useState(false);

  const cardsFrom = deck.crypt;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;
  const isEditable = isAuthor && !isPublic && !isFrozen;

  const sortMethods = {
    Capacity: 'C',
    Clan: 'CL',
    Group: 'G',
    Name: 'N',
    'Quantity ': 'Q', // SPACE SUFFIX IS INTENTIONAL
    Sect: 'S',
  };

  const { crypt, cryptSide, cryptTotal, sortedCards, sortedCardsSide } = useDeckCrypt(
    cardsFrom,
    cryptDeckSort,
    changeTimer,
    cardsTo,
  );

  const { disciplinesSet, keyDisciplines } = useKeyDisciplines(crypt);

  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClickSide = (card) => {
    handleModalSideCardOpen(card);
    setShowFloatingButtons(false);
  };

  const handleClose = () => {
    handleModalCardClose();
    setShowFloatingButtons(true);
  };

  return (
    <FlexGapped
      className={`flex-col ${
        !isMobile ? 'sticky bg-bgPrimary dark:bg-bgPrimaryDark sm:top-10' : ''
      }`}
    >
      <div>
        <DeckCryptHeader
          isEditable={isEditable}
          sortMethods={sortMethods}
          sortMethod={cryptDeckSort}
          setSortMethod={changeCryptDeckSort}
          showInfo={showInfo}
          setShowInfo={setShowInfo}
          cards={crypt}
          deckid={deckid}
        />
        <DiffCryptTable
          handleClick={handleClick}
          deckid={deckid}
          cards={sortedCards}
          cardsFrom={cardsFrom}
          cardsTo={cardsTo}
          cryptTotal={cryptTotal}
          showInfo={showInfo}
          isEditable={isEditable}
          disciplinesSet={disciplinesSet}
          keyDisciplines={keyDisciplines}
        />
      </div>
      {Object.keys(cryptSide).length > 0 && (
        <div className="opacity-60 dark:opacity-50">
          <div className="flex items-center justify-between font-bold">Side Crypt</div>
          <DiffCryptTable
            handleClick={handleClickSide}
            deckid={deckid}
            cards={sortedCardsSide}
            cardsFrom={cardsFrom}
            cardsTo={cardsTo}
            isEditable={isEditable}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleClose}
        />
      )}
    </FlexGapped>
  );
};

export default DiffCrypt;
