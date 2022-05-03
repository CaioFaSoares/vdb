import React from 'react';
import { OverlayTrigger } from 'react-bootstrap';
import { FixedSizeList } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import {
  CardPopover,
  UsedPopover,
  InventoryCardQuantity,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptName,
  ResultClanImage,
  ResultCryptGroup,
  ResultCryptTitle,
  ResultModal,
  ConditionalOverlayTrigger,
} from 'components';
import { deckSort, getHardTotal, getSoftMax } from 'utils';
import { useApp } from 'context';
import { useModalCardController } from 'hooks';

const InventoryCryptTable = (props) => {
  const { cards, setShowFloatingButtons, placement, compact, withCompact } =
    props;
  const { usedCryptCards, isMobile, isNarrow, isWide } = useApp();

  // Modal Card Controller
  const {
    currentModalCard,
    shouldShowModal,
    handleModalCardOpen,
    handleModalCardChange,
    handleModalCardClose,
  } = useModalCardController(cards);

  const handleCloseModal = () => {
    handleModalCardClose();
    isNarrow && setShowFloatingButtons(true);
  };

  const sortedCards = deckSort(cards, 'Name');

  const cardRows = sortedCards.map((cardInfo, index) => {
    const handleClick = () => {
      handleModalCardOpen(index);
      isNarrow && setShowFloatingButtons(false);
    };

    const { c: card, q: qty } = cardInfo;

    let softUsedMax = 0;
    let hardUsedTotal = 0;

    if (usedCryptCards) {
      softUsedMax = getSoftMax(usedCryptCards.soft[card.Id]);
      hardUsedTotal = getHardTotal(usedCryptCards.hard[card.Id]);
    }

    return (
      <>
        <div className="d-flex align-items-center justify-content-center quantity px-1">
          {isMobile ? (
            <InventoryCardQuantity
              cardid={card.Id}
              q={qty}
              softUsedMax={softUsedMax}
              hardUsedTotal={hardUsedTotal}
            />
          ) : (
            <OverlayTrigger
              placement={placement ? placement : 'right'}
              overlay={<UsedPopover cardid={card.Id} />}
            >
              <div className="w-100">
                <InventoryCardQuantity
                  cardid={card.Id}
                  q={qty}
                  softUsedMax={softUsedMax}
                  hardUsedTotal={hardUsedTotal}
                />
              </div>
            </OverlayTrigger>
          )}
        </div>
        <div className="d-flex align-items-center justify-content-center used">
          {isMobile ? (
            <>
              {softUsedMax > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pe-1">
                    <Shuffle width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {softUsedMax}
                </div>
              )}
              {hardUsedTotal > 0 && (
                <div className="d-flex align-items-center justify-content-center">
                  <div className="d-inline opacity-035 pe-1">
                    <PinAngleFill width="14" height="14" viewBox="0 0 16 16" />
                  </div>
                  {hardUsedTotal}
                </div>
              )}
            </>
          ) : (
            <OverlayTrigger
              placement={placement ? placement : 'right'}
              overlay={<UsedPopover cardid={card.Id} />}
            >
              <div
                className={`d-flex justify-content-center w-100 ps-1 ${
                  qty == softUsedMax + hardUsedTotal
                    ? 'gray'
                    : qty >= softUsedMax + hardUsedTotal
                    ? 'green'
                    : 'red'
                }`}
              >
                {qty === softUsedMax + hardUsedTotal
                  ? '='
                  : qty > softUsedMax + hardUsedTotal
                  ? `+${qty - softUsedMax - hardUsedTotal}`
                  : qty - softUsedMax - hardUsedTotal}
              </div>
            </OverlayTrigger>
          )}
        </div>
        <div
          className="d-flex align-items-center justify-content-center capacity"
          onClick={() => handleClick()}
        >
          <ResultCryptCapacity value={card.Capacity} />
        </div>
        {!isMobile && !isNarrow && (
          <div
            className="d-flex align-items-center justify-content-left disciplines"
            onClick={() => handleClick()}
          >
            <ResultCryptDisciplines value={card.Disciplines} />
          </div>
        )}
        <ConditionalOverlayTrigger
          placement={placement}
          overlay={<CardPopover card={card} />}
          disabled={isMobile}
        >
          <div
            className="d-flex align-items-center justify-content-start name"
            onClick={() => handleClick()}
          >
            <ResultCryptName card={card} />
          </div>
        </ConditionalOverlayTrigger>

        {isWide ? (
          <>
            <div
              className="d-flex align-items-center justify-content-center title"
              onClick={() => handleClick()}
            >
              <ResultCryptTitle value={card.Title} />
            </div>
            <div
              className="d-flex align-items-center justify-content-center clan"
              onClick={() => handleClick()}
            >
              <ResultClanImage value={card.Clan} />
            </div>
            <div
              className="d-flex align-items-center justify-content-center group"
              onClick={() => handleClick()}
            >
              <ResultCryptGroup value={card.Group} />
            </div>
          </>
        ) : (
          <div className="clan-group" onClick={() => handleClick()}>
            <div className="d-flex justify-content-center">
              <ResultClanImage value={card.Clan} />
            </div>
            <div className="d-flex small justify-content-end">
              <div className="bold blue">
                <ResultCryptTitle value={card.Title} />
              </div>
              <ResultCryptGroup value={card.Group} />
            </div>
          </div>
        )}
      </>
    );
  });

  const Rows = ({ index, style }) => (
    <div
      style={style}
      className={`d-flex bordered ${index % 2 ? 'result-even' : 'result-odd'}`}
    >
      {cardRows[index]}
    </div>
  );

  return (
    <>
      {compact ? (
        <div className="d-flex inventory-crypt-table bordered result-odd compact">
          {cardRows[0]}
        </div>
      ) : (
        <div
          className={`inventory-container-crypt${
            withCompact ? '-with-compact' : ''
          }`}
        >
          <AutoSizer>
            {({ width, height }) => (
              <FixedSizeList
                className="inventory-crypt-table"
                height={height}
                width={width}
                itemCount={cardRows.length}
                itemSize={45}
              >
                {Rows}
              </FixedSizeList>
            )}
          </AutoSizer>
        </div>
      )}
      {shouldShowModal && (
        <ResultModal
          card={currentModalCard}
          handleModalCardChange={handleModalCardChange}
          handleClose={handleCloseModal}
          forceInventoryMode={true}
        />
      )}
    </>
  );
};

export default InventoryCryptTable;
