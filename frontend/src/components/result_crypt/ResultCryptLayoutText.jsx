import React from 'react';
import { useApp } from '@/context';
import {
  ButtonCloseModal,
  CardPopover,
  ConditionalTooltip,
  Hr,
  ResultClanImage,
  ResultCryptCapacity,
  ResultCryptDisciplines,
  ResultCryptGroup,
  ResultName,
  ResultLayoutTextText,
} from '@/components';
import { getLegality } from '@/utils';

const ResultCryptLayoutText = ({
  card,
  setCard,
  handleClose,
  noClose,
  inPopover,
}) => {
  const { isNarrow, isMobile, cryptCardBase } = useApp();
  const isLegal = getLegality(card);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between whitespace-nowrap">
        <div className="flex items-center space-x-2 whitespace-nowrap">
          <ResultClanImage value={card.Clan} />
          <div className="space-x-2 font-bold text-fgName dark:text-fgNameDark">
            <ResultName card={card} />
            {card.Adv[1] && (
              <ConditionalTooltip
                overlay={<CardPopover card={cryptCardBase[card.Adv[1]]} />}
                disabled={isMobile}
                noPadding
              >
                <div
                  className="inline text-fgSecondary dark:text-fgSecondaryDark"
                  onClick={() => setCard(cryptCardBase[card.Adv[1]])}
                >
                  {inPopover ? (
                    <>
                      {!card.Adv[0] && (
                        <>
                          [has
                          <img
                            className="inline h-[25px] ps-1 pb-1"
                            src={`${
                              import.meta.env.VITE_BASE_URL
                            }/images/misc/advanced.svg`}
                            title="Advanced"
                          />
                          ]
                        </>
                      )}
                    </>
                  ) : (
                    <>[see {`${card.Adv[0] ? 'Base' : 'Adv'}`}]</>
                  )}
                </div>
              </ConditionalTooltip>
            )}
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <ResultCryptGroup value={card.Group} />
          <div
            className={
              noClose || inPopover || isNarrow
                ? 'hidden max-h-0 max-w-0 opacity-0'
                : 'flex justify-center'
            }
          >
            <ButtonCloseModal handleClick={handleClose} />
          </div>
        </div>
      </div>
      <Hr />
      <div>
        <ResultLayoutTextText cardid={card.Id} />
      </div>
      <Hr />
      <div className="flex items-center justify-between">
        <ResultCryptDisciplines value={card.Disciplines} />
        <ResultCryptCapacity card={card} />
      </div>
      <Hr />
      {isLegal && (
        <div
          className="text-fgRed dark:text-fgRedDark"
          title={`Not Tournament Legal until ${isLegal}`}
        >
          Not Tournament Legal until {isLegal}
        </div>
      )}
    </div>
  );
};

export default ResultCryptLayoutText;
