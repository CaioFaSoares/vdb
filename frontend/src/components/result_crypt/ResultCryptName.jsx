import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';
import HourglassSplit from '@/assets/images/icons/hourglass-split.svg?react';
import { getLegality } from '@/utils';

const ResultCryptName = ({ card, colored = true, isBanned }) => {
  const isLegal = getLegality(card);

  return (
    <div
      className={`inline space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className="inline space-x-1 whitespace-nowrap">
        <div
          className={`inline space-x-1 whitespace-normal ${
            card.Banned || isBanned ? 'line-through' : ''
          }`}
        >
          {card['Name']}
        </div>
        {card.Adv[0] && (
          <img
            className="inline h-[25px] items-center pb-1"
            src={`${import.meta.env.VITE_BASE_URL}/images/misc/advanced.svg`}
            title="Advanced"
          />
        )}
      </div>
      {(card.Banned || isBanned) && (
        <div className="inline whitespace-nowrap">
          {card.Banned ? (
            <>
              [{card.Banned} <Hammer className="inline h-[20px]" />]
            </>
          ) : (
            <>[Limited]</>
          )}
        </div>
      )}
      {!isLegal && (
        <div
          className="inline whitespace-nowrap text-fgRed dark:text-fgRedDark"
          title="Not Tournament Legal Yet"
        >
          <HourglassSplit className="inline pb-[1px]" />
        </div>
      )}
    </div>
  );
};

export default ResultCryptName;
