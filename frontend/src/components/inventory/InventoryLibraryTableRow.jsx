import React from 'react';
import { useSnapshot } from 'valtio';
import { useSwipeable } from 'react-swipeable';
import { OverlayTrigger } from 'react-bootstrap';
import {
  CardPopover,
  UsedPopover,
  InventoryCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryTypeImage,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  ConditionalOverlayTrigger,
} from 'components';
import { POOL_COST, BLOOD_COST, CARD_TEXT, BURN_OPTION } from 'utils/constants';
import { getHardTotal, getSoftMax } from 'utils';
import { useApp, usedStore, inventoryCardChange } from 'context';

const InventoryLibraryTableRow = ({
  card,
  placement,
  compact,
  newFocus,
  inShared,
  handleClick,
}) => {
  const usedLibrary = useSnapshot(usedStore).library;
  const { nativeLibrary, isMobile, isNarrow } = useApp();

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      inventoryCardChange(card.c, card.q - 1);
    },
    onSwipedLeft: () => {
      inventoryCardChange(card.c, card.q + 1);
    },
  });

  const DisciplineOrClan = card.c.Clan ? (
    <ResultLibraryClan value={card.c.Clan} />
  ) : (
    <ResultLibraryDisciplines value={card.c.Discipline} />
  );
  let softUsedMax = 0;
  let hardUsedTotal = 0;

  if (usedLibrary) {
    softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]);
    hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]);
  }

  return (
    <div
      className="d-flex no-border inventory-library-table"
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
        className="d-flex align-items-center justify-content-center type"
        onClick={() => handleClick(card.c)}
      >
        <ResultLibraryTypeImage value={card.c.Type} />
      </div>

      <ConditionalOverlayTrigger
        placement={placement}
        overlay={<CardPopover card={card.c} />}
        disabled={isMobile}
      >
        <div
          className="d-flex align-items-center justify-content-start name"
          onClick={() => handleClick(card.c)}
        >
          <ResultLibraryName card={card.c} />
        </div>
      </ConditionalOverlayTrigger>

      {isMobile ? (
        <div
          className="d-flex align-items-center justify-content-between disciplines"
          onClick={() => handleClick(card.c)}
        >
          <div
            className={`d-flex align-items-center justify-content-center ${
              card.c[BLOOD_COST] && 'blood'
            }`}
            onClick={() => handleClick(card.c)}
          >
            <ResultLibraryCost
              valueBlood={card.c[BLOOD_COST]}
              valuePool={card.c[POOL_COST]}
            />
          </div>
          <div
            className="d-flex align-items-center justify-content-center px-1"
            onClick={() => handleClick(card.c)}
          >
            {DisciplineOrClan}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`d-flex align-items-center justify-content-center ${
              card.c[BLOOD_COST] && 'blood'
            } cost`}
            onClick={() => handleClick(card.c)}
          >
            <ResultLibraryCost
              valueBlood={card.c[BLOOD_COST]}
              valuePool={card.c[POOL_COST]}
            />
          </div>
          <div
            className="d-flex align-items-center justify-content-center disciplines"
            onClick={() => handleClick(card.c)}
          >
            {DisciplineOrClan}
          </div>
        </>
      )}
      {!isNarrow && (
        <div
          className="d-flex align-items-center justify-content-center burn"
          onClick={() => handleClick(card.c)}
        >
          <ResultLibraryBurn value={card.c[BURN_OPTION]} />
          <ResultLibraryTrifle value={nativeLibrary[card.c.Id][CARD_TEXT]} />
        </div>
      )}
    </div>
  );
};

export default InventoryLibraryTableRow;
