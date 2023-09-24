import React from 'react';
import Hammer from '@/assets/images/icons/hammer.svg?react';

const ResultLibraryName = ({ card, colored = true }) => {
  return (
    <div
      className={`inline space-x-1 ${
        colored ? 'text-fgName dark:text-fgNameDark' : ''
      }`}
    >
      <div className={`inline ${card.Banned ? 'line-through' : ''}`}>
        {card['Name']}
      </div>
      {card['Banned'] && (
        <div className="inline whitespace-nowrap">
          [{card['Banned']} <Hammer className="inline h-[20px]" />]
        </div>
      )}
    </div>
  );
};

export default ResultLibraryName;
