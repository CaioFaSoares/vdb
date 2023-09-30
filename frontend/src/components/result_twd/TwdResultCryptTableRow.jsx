import React from 'react';
import { useSnapshot } from 'valtio';
import {
  CardPopover,
  UsedPopover,
  ResultName,
  ResultCryptCapacity,
  ResultClanImage,
  ConditionalTooltip,
} from '@/components';
import { getHardTotal } from '@/utils';
import { useApp, limitedStore, inventoryStore, usedStore } from '@/context';

const TwdResultCryptTableRow = ({
  card,
  idx,
  handleClick,
  shouldShowModal,
}) => {
  const { limitedMode, inventoryMode, isMobile } = useApp();
  const inventoryCrypt = useSnapshot(inventoryStore).crypt;
  const limitedCrypt = useSnapshot(limitedStore).crypt;
  const usedCrypt = useSnapshot(usedStore).crypt;
  const inInventory = limitedMode
    ? limitedCrypt[card.c.Id]
      ? 99
      : 0
    : inventoryCrypt[card.c.Id]?.q ?? 0;
  const hardUsedTotal = getHardTotal(usedCrypt.hard[card.c.Id]);

  return (
    <tr
      key={card.c.Id}
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <td className="min-w-[28px] border-r border-bgSecondary bg-blue/5 dark:border-bgSecondaryDark sm:min-w-[35px]">
        {limitedMode || inventoryMode ? (
          <ConditionalTooltip
            overlay={<UsedPopover cardid={card.c.Id} />}
            disabled={isMobile}
          >
            <div
              className={`flex justify-center text-lg ${
                inInventory < card.q
                  ? 'bg-bgError text-white dark:bg-bgErrorDark dark:text-whiteDark'
                  : inInventory - hardUsedTotal < card.q
                  ? 'bg-bgWarning dark:bg-bgWarningDark'
                  : ''
              }`}
            >
              {card.q}
            </div>
          </ConditionalTooltip>
        ) : (
          <div className="flex justify-center text-lg">{card.q}</div>
        )}
      </td>
      <td
        className="min-w-[30px] sm:min-w-[40px]"
        onClick={() => handleClick(card.c)}
      >
        <div className="flex justify-center">
          <ResultCryptCapacity card={card.c} />
        </div>
      </td>

      <td className="w-full" onClick={() => handleClick(card.c)}>
        <ConditionalTooltip
          overlay={<CardPopover card={card.c} />}
          disabled={isMobile || shouldShowModal}
          noPadding
        >
          <div className="flex cursor-pointer">
            <ResultName card={card.c} />
          </div>
        </ConditionalTooltip>
      </td>
      <td className="min-w-[30px]" onClick={() => handleClick(card.c)}>
        <div className="flex justify-center">
          <ResultClanImage value={card.c.Clan} />
        </div>
      </td>
    </tr>
  );
};

export default TwdResultCryptTableRow;
