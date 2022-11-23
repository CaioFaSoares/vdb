import React, { useState } from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import { OverlayTrigger } from 'react-bootstrap';
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
  ConditionalOverlayTrigger,
} from 'components';
import { getHardTotal, getSoftMax } from 'utils';
import { useApp, usedStore, inventoryCardChange } from 'context';

const InventoryCryptTableRow = ({
  card,
  placement,
  compact,
  newFocus,
  inShared,
  handleClick,
}) => {
  const usedCrypt = useSnapshot(usedStore).crypt;
  const { isMobile, isNarrow, isWide } = useApp();

  const [isSwiped, setIsSwiped] = useState();
  const SWIPE_THRESHOLD = 50;
  const swipeHandlers = useSwipeable({
    onSwipedRight: (e) => {
      if (e.absX > SWIPE_THRESHOLD) inventoryCardChange(card.c, card.q - 1);
    },
    onSwipedLeft: (e) => {
      if (e.absX > SWIPE_THRESHOLD) inventoryCardChange(card.c, card.q + 1);
    },
    onSwiped: () => {
      setIsSwiped(false);
    },
    onSwiping: (e) => {
      if (e.deltaX < -SWIPE_THRESHOLD) {
        setIsSwiped('left');
      } else if (e.deltaX > SWIPE_THRESHOLD) {
        setIsSwiped('right');
      }
    },
  });

  let softUsedMax = 0;
  let hardUsedTotal = 0;

  if (usedCrypt) {
    softUsedMax = getSoftMax(usedCrypt.soft[card.c.Id]);
    hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);
  }

  return (
    <div
      className={`d-flex no-border inventory-crypt-table ${
        isSwiped ? `swiped-${isSwiped}` : ''
      }`}
      {...swipeHandlers}
    >
      <div
        className={`d-flex align-items-center justify-content-center ${
          inShared ? 'quantity-no-buttons me-2' : 'quantity px-1]'
        }`}
      >
        {inShared ? (
          <>{card.q || null}</>
        ) : (
          <InventoryCardQuantity
            cardid={card.c.Id}
            q={card.q}
            softUsedMax={softUsedMax}
            hardUsedTotal={hardUsedTotal}
            compact={compact}
            newFocus={newFocus}
          />
        )}
      </div>
      {!inShared && (
        <div className="d-flex align-items-center justify-content-center used">
          {isMobile ? (
            <div
              className={`d-flex justify-content-center w-100 ps-1 ${
                card.q == softUsedMax + hardUsedTotal
                  ? 'gray'
                  : card.q >= softUsedMax + hardUsedTotal
                  ? 'green'
                  : 'red'
              }`}
            >
              {card.q === softUsedMax + hardUsedTotal
                ? '='
                : card.q > softUsedMax + hardUsedTotal
                ? `+${card.q - softUsedMax - hardUsedTotal}`
                : card.q - softUsedMax - hardUsedTotal}
            </div>
          ) : (
            <OverlayTrigger
              placement="bottom"
              overlay={<UsedPopover cardid={card.c.Id} />}
            >
              <div
                className={`d-flex justify-content-center w-100 ps-1 ${
                  card.q == softUsedMax + hardUsedTotal
                    ? 'gray'
                    : card.q >= softUsedMax + hardUsedTotal
                    ? 'green'
                    : 'red'
                }`}
              >
                {card.q === softUsedMax + hardUsedTotal
                  ? '='
                  : card.q > softUsedMax + hardUsedTotal
                  ? `+${card.q - softUsedMax - hardUsedTotal}`
                  : card.q - softUsedMax - hardUsedTotal}
              </div>
            </OverlayTrigger>
          )}
        </div>
      )}
      <div
        className="d-flex align-items-center justify-content-center capacity"
        onClick={() => handleClick(card.c)}
      >
        <ResultCryptCapacity value={card.c.Capacity} />
      </div>
      {!isMobile && !isNarrow && (
        <div
          className="d-flex align-items-center justify-content-left disciplines"
          onClick={() => handleClick(card.c)}
        >
          <ResultCryptDisciplines value={card.c.Disciplines} />
        </div>
      )}
      <ConditionalOverlayTrigger
        placement={placement}
        overlay={<CardPopover card={card.c} />}
        disabled={isMobile}
      >
        <div
          className="d-flex align-items-center justify-content-start name"
          onClick={() => handleClick(card.c)}
        >
          <ResultCryptName card={card.c} />
        </div>
      </ConditionalOverlayTrigger>
      {isWide ? (
        <>
          <div
            className="d-flex align-items-center justify-content-center title"
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptTitle value={card.c.Title} />
          </div>
          <div
            className="d-flex align-items-center justify-content-center clan"
            onClick={() => handleClick(card.c)}
          >
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div
            className="d-flex align-items-center justify-content-center group pe-1"
            onClick={() => handleClick(card.c)}
          >
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </>
      ) : (
        <div className="clan-group" onClick={() => handleClick(card.c)}>
          <div className="d-flex justify-content-center">
            <ResultClanImage value={card.c.Clan} />
          </div>
          <div className="d-flex small justify-content-end">
            <div className="bold blue">
              <ResultCryptTitle value={card.c.Title} />
            </div>
            <ResultCryptGroup value={card.c.Group} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InventoryCryptTableRow;
