import React from 'react';
import { DeckProxyCryptTable, ResultCryptModal } from 'components';
import { useApp } from 'context';
import { countCards } from 'utils';
import { useModalCardController, useKeyDisciplines, useDeckCrypt } from 'hooks';

const DeckProxyCrypt = (props) => {
  const { cards, proxySelected, inAdvSelect, setShowFloatingButtons } = props;
  const { handleProxySelector, handleSetSelector, handleProxyCounter } = props;
  const { cryptDeckSort, changeTimer, isMobile } = useApp();

  const { cryptSide, cryptTotal, sortedCards, sortedCardsSide } = useDeckCrypt(
    cards,
    cryptDeckSort,
    changeTimer
  );

  const proxiesToPrint = Object.keys(proxySelected)
    .filter(
      (cardid) =>
        cardid > 200000 &&
        proxySelected[cardid].print &&
        proxySelected[cardid].q > 0
    )
    .map((cardid) => proxySelected[cardid]);

  const cryptTotalSelected = countCards(proxiesToPrint);

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines } =
    useKeyDisciplines(cards, cryptTotal);

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalSideCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(sortedCards, sortedCardsSide);

  const handleCloseModal = () => {
    handleModalCardClose();
    isMobile && setShowFloatingButtons(true);
  };

  return (
    <>
      <div
        className={
          isMobile
            ? 'd-flex align-items-center justify-content-between ps-2 pe-1 info-message'
            : 'd-flex align-items-center justify-content-between ps-2 info-message'
        }
      >
        <b>Crypt [{cryptTotalSelected}]</b>
      </div>
      <DeckProxyCryptTable
        handleModalCardOpen={handleModalCardOpen}
        cards={sortedCards}
        disciplinesSet={disciplinesSet}
        keyDisciplines={keyDisciplines}
        nonKeyDisciplines={nonKeyDisciplines}
        handleProxySelector={handleProxySelector}
        handleSetSelector={handleSetSelector}
        handleProxyCounter={handleProxyCounter}
        proxySelected={proxySelected}
        setShowFloatingButtons={setShowFloatingButtons}
      />
      {Object.keys(cryptSide).length > 0 && !inAdvSelect && (
        <div className="deck-sidecrypt pt-2">
          <div className="d-flex align-items-center justify-content-between ps-2">
            <b>Side Crypt</b>
          </div>
          <DeckProxyCryptTable
            handleModalCardOpen={handleModalSideCardOpen}
            cards={sortedCardsSide}
            disciplinesSet={disciplinesSet}
            keyDisciplines={keyDisciplines}
            nonKeyDisciplines={nonKeyDisciplines}
            handleProxySelector={handleProxySelector}
            handleSetSelector={handleSetSelector}
            handleProxyCounter={handleProxyCounter}
            proxySelected={proxySelected}
            setShowFloatingButtons={setShowFloatingButtons}
          />
        </div>
      )}
      {shouldShowModal && (
        <ResultCryptModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
        />
      )}
    </>
  );
};

export default DeckProxyCrypt;
