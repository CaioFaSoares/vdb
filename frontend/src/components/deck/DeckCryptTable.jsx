import React, { useMemo } from 'react';
import { DeckCryptTableRow } from '@/components';
import { useApp } from '@/context';
import { countDisciplines } from '@/utils';

const DeckCryptTable = ({
  deck,
  disciplinesSet,
  keyDisciplines,
  nonKeyDisciplines,
  cards,
  placement,
  showInfo,
  cryptTotal,
  handleModalCardOpen,
  inSearch,
  inMissing,
  isModalOpen,
}) => {
  const { isMobile, isDesktop, setShowFloatingButtons } = useApp();
  const maxDisciplines = countDisciplines(cards);

  const disableOverlay = useMemo(
    () => isMobile || (!isDesktop && isModalOpen),
    [isMobile, isDesktop, isModalOpen]
  );

  return (
    <table className="w-full border-bgSecondary dark:border-bgSecondaryDark sm:border">
      <tbody>
        {cards.map((card, idx) => {
          return (
            <DeckCryptTableRow
              key={card.c.Id}
              idx={idx}
              disableOverlay={disableOverlay}
              placement={placement}
              handleClick={handleModalCardOpen}
              card={card}
              deck={deck}
              disciplinesSet={disciplinesSet}
              keyDisciplines={keyDisciplines}
              nonKeyDisciplines={nonKeyDisciplines}
              maxDisciplines={maxDisciplines}
              showInfo={showInfo}
              cryptTotal={cryptTotal}
              inSearch={inSearch}
              inMissing={inMissing}
            />
          );
        })}
      </tbody>
    </table>
  );
};

export default DeckCryptTable;
