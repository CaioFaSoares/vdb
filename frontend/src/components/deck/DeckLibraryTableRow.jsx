import React from 'react';
import { useSwipeable } from 'react-swipeable';
import { useSnapshot } from 'valtio';
import Shuffle from 'assets/images/icons/shuffle.svg';
import PinAngleFill from 'assets/images/icons/pin-angle-fill.svg';
import {
  deckCardChange,
  deckUpdate,
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
} from 'context';
import {
  OverlayTooltip,
  CardPopover,
  UsedPopover,
  DeckCardQuantity,
  ResultLibraryBurn,
  ResultLibraryClan,
  ResultLibraryCost,
  ResultLibraryDisciplines,
  ResultLibraryName,
  ResultLibraryTrifle,
  DeckDrawProbabilityText,
  ConditionalOverlayTrigger,
} from 'components';
import { getSoftMax, getHardTotal, drawProbability } from 'utils';

const DeckLibraryTableRow = ({
  idx,
  disableOverlay,
  placement,
  handleClick,
  card,
  deck,
  showInfo,
  libraryTotal,
  inSearch,
  inMissing,
  setModalDraw,
}) => {
  const { inventoryMode, isMobile, isDesktop, isNarrow, isWide } = useApp();

  const decks = useSnapshot(deckStore).decks;
  const usedLibrary = useSnapshot(usedStore).library;
  const inventoryLibrary = useSnapshot(inventoryStore).library;
  const { deckid, isPublic, isAuthor, isFrozen } = deck;

  const swipeHandlers = useSwipeable({
    onSwipedRight: () => {
      deckCardChange(deckid, card.c, card.q - 1);
    },
    onSwipedLeft: () => {
      deckCardChange(deckid, card.c, card.q + 1);
    },
  });

  let inInventory = inventoryLibrary[card.c.Id]?.q ?? 0;
  let softUsedMax = getSoftMax(usedLibrary.soft[card.c.Id]) ?? 0;
  let hardUsedTotal = getHardTotal(usedLibrary.hard[card.c.Id]) ?? 0;

  const toggleInventoryState = (deckid, cardid) => {
    const value = card.i ? '' : deck.inventoryType === 's' ? 'h' : 's';
    deckUpdate(deckid, 'usedInInventory', {
      [cardid]: value,
    });
  };

  return (
    <tr {...swipeHandlers} className={`result-${idx % 2 ? 'even' : 'odd'}`}>
      {isAuthor && !isPublic && !isFrozen ? (
        <>
          {inventoryMode && decks ? (
            <>
              {deck.inventoryType && !inSearch && !isMobile && (
                <td>
                  <div className="d-flex relative align-items-center">
                    <div
                      className={
                        card.i
                          ? 'inventory-card-custom'
                          : 'inventory-card-custom not-selected'
                      }
                      onClick={() => toggleInventoryState(deckid, card.c.Id)}
                    >
                      {deck.inventoryType == 's' ? (
                        <PinAngleFill />
                      ) : (
                        <Shuffle />
                      )}
                    </div>
                  </div>
                </td>
              )}
              <ConditionalOverlayTrigger
                placement="bottom"
                overlay={<UsedPopover cardid={card.c.Id} />}
                disabled={disableOverlay}
              >
                <td className="quantity">
                  <DeckCardQuantity
                    card={card.c}
                    q={card.q}
                    deckid={deckid}
                    cardChange={deckCardChange}
                    inInventory={inInventory}
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                    inventoryType={decks[deckid].inventoryType}
                  />
                </td>
              </ConditionalOverlayTrigger>
            </>
          ) : (
            <td className="quantity">
              <DeckCardQuantity
                card={card.c}
                q={card.q}
                deckid={deckid}
                cardChange={deckCardChange}
              />
            </td>
          )}
        </>
      ) : (
        <>
          {inventoryMode && decks ? (
            <ConditionalOverlayTrigger
              placement="bottom"
              overlay={<UsedPopover cardid={card.c.Id} />}
              disabled={disableOverlay}
            >
              <td className="quantity-no-buttons px-1">
                <div
                  className={
                    inMissing
                      ? null
                      : inInventory < card.q
                      ? 'inv-miss-full'
                      : inInventory < hardUsedTotal + card.q
                      ? 'inv-miss-part'
                      : null
                  }
                >
                  {card.q || null}
                </div>
              </td>
            </ConditionalOverlayTrigger>
          ) : (
            <td className="quantity-no-buttons px-1">{card.q || null}</td>
          )}
        </>
      )}
      {!isMobile ? (
        <ConditionalOverlayTrigger
          placement={placement}
          overlay={<CardPopover card={card.c} />}
          disabled={disableOverlay}
        >
          <td className="name ps-3 pe-2" onClick={() => handleClick(card.c)}>
            <ResultLibraryName card={card.c} />
          </td>
        </ConditionalOverlayTrigger>
      ) : (
        <td className="name ps-3 pe-2" onClick={() => handleClick(card.c)}>
          <ResultLibraryName card={card.c} />
        </td>
      )}
      {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
        <td
          className={card.c['Blood Cost'] ? 'cost blood' : 'cost'}
          onClick={() => handleClick(card.c)}
        >
          <ResultLibraryCost
            valueBlood={card.c['Blood Cost']}
            valuePool={card.c['Pool Cost']}
          />
        </td>
      )}
      <td className="disciplines px-1" onClick={() => handleClick(card.c)}>
        <ResultLibraryClan value={card.c.Clan} />
        {card.c.Discipline && card.c.Clan && '+'}
        <ResultLibraryDisciplines value={card.c.Discipline} />
      </td>
      {(!inSearch || (!isDesktop && !isNarrow) || isWide) && (
        <td className="burn" onClick={() => handleClick(card.c)}>
          <ResultLibraryBurn value={card.c['Burn Option']} />
          <ResultLibraryTrifle card={card.c} />
        </td>
      )}
      {showInfo && (
        <td className="prob px-1">
          {isMobile ? (
            <div
              onClick={() =>
                setModalDraw({
                  name: card.c['Name'],
                  prob: (
                    <DeckDrawProbabilityText
                      N={libraryTotal}
                      n={7}
                      k={card.q}
                    />
                  ),
                })
              }
            >
              {`${Math.floor(
                drawProbability(1, libraryTotal, 7, card.q) * 100
              )}%`}
            </div>
          ) : (
            <OverlayTooltip
              placement={placement}
              text={
                <DeckDrawProbabilityText N={libraryTotal} n={7} k={card.q} />
              }
            >
              <div>{`${Math.floor(
                drawProbability(1, libraryTotal, 7, card.q) * 100
              )}%`}</div>
            </OverlayTooltip>
          )}
        </td>
      )}
    </tr>
  );
};

export default DeckLibraryTableRow;
