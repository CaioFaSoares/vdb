import React from 'react';
import { useSnapshot } from 'valtio';
import {
  UsedPopover,
  DeckCardQuantity,
  DeckDrawProbability,
  ResultCryptTableRowCommon,
  Tooltip,
  DiffQuantityDiff,
} from '@/components';
import { getSoftMax, getHardTotal } from '@/utils';
import {
  useApp,
  usedStore,
  inventoryStore,
  deckStore,
  deckCardChange,
} from '@/context';
import { useKeyDisciplines } from '@/hooks';

const DiffCryptTable = ({
  cardChange,
  deckid,
  cards,
  cardsFrom,
  cardsTo,
  isEditable,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inReview,
}) => {
  const { inventoryMode, isMobile, setShowFloatingButtons } = useApp();
  const decks = useSnapshot(deckStore).decks;
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;

  const { disciplinesSet, keyDisciplines, nonKeyDisciplines, maxDisciplines } =
    useKeyDisciplines(cards);

  const handleClick = (card) => {
    handleModalCardOpen(card);
    setShowFloatingButtons(false);
  };

  const cardRows = cards.map((card, idx) => {
    const inInventory = inventoryCrypt[card.c.Id]?.q ?? 0;
    const softUsedMax = getSoftMax(usedCrypt.soft[card.Id]);
    const hardUsedTotal = getHardTotal(usedCrypt.hard[card.Id]);

    const qFrom = cardsFrom[card.c.Id] ? cardsFrom[card.c.Id].q : 0;
    const qTo = cardsTo[card.c.Id] ? cardsTo[card.c.Id].q : 0;

    return (
      <tr
        key={card.c.Id}
        className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
          }`}
      >
        {isEditable || inReview ? (
          <>
            {!inReview && inventoryMode && decks ? (
              <td className="quantity">
                <Tooltip
                  placement="right"
                  overlay={<UsedPopover cardid={card.c.Id} />}
                >
                  <DeckCardQuantity
                    card={card.c}
                    q={qFrom}
                    deckid={cardChange ? null : deckid}
                    cardChange={cardChange ?? deckCardChange}
                    inInventory={inInventory}
                    softUsedMax={softUsedMax}
                    hardUsedTotal={hardUsedTotal}
                    inventoryType={decks[deckid].inventoryType}
                  />
                </Tooltip>
              </td>
            ) : (
              <td className="quantity">
                <DeckCardQuantity
                  card={card.c}
                  q={qFrom}
                  deckid={cardChange ? null : deckid}
                  cardChange={cardChange ?? deckCardChange}
                />
              </td>
            )}
          </>
        ) : (
          <td className="quantity-no-buttons">{qFrom ? qFrom : null}</td>
        )}
        <td className={`w-[42px] min-w-[35px] text-lg ${!isMobile && ''}`}>
          <DiffQuantityDiff qFrom={qFrom} qTo={qTo} />
        </td>
        <ResultCryptTableRowCommon
          card={card.c}
          handleClick={handleClick}
          placement={placement}
          maxDisciplines={maxDisciplines}
          keyDisciplines={keyDisciplines}
          nonKeyDisciplines={nonKeyDisciplines}
          disciplinesSet={disciplinesSet}
          inDeck
        />
        {showInfo && (
          <td className="w-9 text-right text-fgSecondary dark:text-fgSecondaryDark">
            <DeckDrawProbability cardName={card.c.Name} N={cryptTotal} n={4} k={card.q} />
          </td>
        )}
      </tr>
    );
  });

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>{cardRows}</tbody>
    </table>
  );
};

export default DiffCryptTable;
