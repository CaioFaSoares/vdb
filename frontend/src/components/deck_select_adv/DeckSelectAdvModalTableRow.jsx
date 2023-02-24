import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EyeFill from '@/assets/images/icons/eye-fill.svg';
import Shuffle from '@/assets/images/icons/shuffle.svg';
import PinAngleFill from '@/assets/images/icons/pin-angle-fill.svg';
import At from '@/assets/images/icons/at.svg';
import {
  DeckPreview,
  DeckTags,
  DeckDeleteButton,
  DeckHideButton,
  DeckFreezeButton,
  DeckBranchDeleteButton,
  DeckCopyUrlButton,
  DeckPublicToggleButton,
  ResultClanImage,
  Tooltip,
  Button,
  Checkbox,
} from '@/components';
import { useApp, deckUpdate } from '@/context';
import { getClan } from '@/utils';

const DeckSelectAdvModalTableRow = ({
  deck,
  idx,
  handleClose,
  allTagsOptions,
  selectedDecks,
  toggleSelect,
  revFilter,
}) => {
  const { inventoryMode, isMobile, isDesktop } = useApp();
  const navigate = useNavigate();
  const [showDeck, setShowDeck] = useState();

  const handleOpen = (deckid) => {
    navigate(`/decks/${deckid}`);
    handleClose();
  };

  const clan = getClan(deck.crypt);

  const inventoryType = deck.inventoryType;
  const toggleInventoryState = (deckid) => {
    if (!inventoryType) {
      deckUpdate(deckid, 'inventoryType', 's');
    } else if (inventoryType === 's') {
      deckUpdate(deckid, 'inventoryType', 'h');
    } else if (inventoryType === 'h') {
      deckUpdate(deckid, 'inventoryType', '');
    }
  };

  return (
    <tr
      className={`border-y border-bgSecondary dark:border-bgSecondaryDark ${
        idx % 2
          ? 'bg-bgThird dark:bg-bgThirdDark'
          : 'bg-bgPrimary dark:bg-bgPrimaryDark'
      }`}
    >
      <td className="min-w-[30px]">
        <Checkbox
          checked={selectedDecks[deck.deckid] ?? false}
          onChange={() => toggleSelect(deck.deckid)}
          className="justify-center"
        />
      </td>
      {inventoryMode && !isMobile && (
        <td>
          <div className="flex justify-center">
            <Button
              variant="primary"
              onClick={() => toggleInventoryState(deck.deckid)}
              title={
                deck.inventoryType === 's'
                  ? 'Flexible'
                  : deck.inventoryType === 'h'
                  ? 'Fixed'
                  : 'Virtual'
              }
            >
              {deck.inventoryType == 's' ? (
                <Shuffle />
              ) : deck.inventoryType == 'h' ? (
                <PinAngleFill />
              ) : (
                <At />
              )}
            </Button>
          </div>
        </td>
      )}
      {!isMobile && (
        <td onClick={() => handleOpen(deck.deckid)}>
          <div className="flex justify-center">
            {clan && <ResultClanImage value={clan} />}
          </div>
        </td>
      )}

      <td
        className="min-w-[45vw] cursor-pointer sm:min-w-[340px]"
        onClick={() => handleOpen(deck.deckid)}
      >
        <div
          className="flex justify-between text-fgName dark:text-fgNameDark"
          title={deck.name}
        >
          {deck.name}
          {deck.branchName &&
            (deck.master || (deck.branches && deck.branches.length > 0)) && (
              <div className="inline" title={deck.branchName}>
                {deck.branchName}
              </div>
            )}
        </div>
      </td>
      {isDesktop && (
        <td className="min-w-[30px]">
          <div
            className="flex justify-center"
            onMouseEnter={() => setShowDeck(deck.deckid)}
            onMouseLeave={() => setShowDeck(false)}
          >
            <Tooltip
              size="lg"
              show={showDeck === deck.deckid}
              overlay={<DeckPreview deck={deck} setShow={setShowDeck} />}
            >
              <EyeFill />
            </Tooltip>
          </div>
        </td>
      )}
      {!isMobile && (
        <td
          className="min-w-[100px] cursor-pointer whitespace-nowrap"
          onClick={() => handleOpen(deck.deckid)}
        >
          {new Date(deck.timestamp).toISOString().slice(0, 10)}
        </td>
      )}
      <td className="w-full">
        <DeckTags deck={deck} allTagsOptions={allTagsOptions} />
      </td>
      <td>
        <div className="flex justify-end space-x-1">
          <DeckHideButton deck={deck} />
          {!isMobile && (
            <>
              <DeckFreezeButton deck={deck} />
              <DeckPublicToggleButton deck={deck} inAdv />
            </>
          )}
          {isDesktop && (
            <>
              <DeckCopyUrlButton deck={deck} noText isAuthor />
              {revFilter &&
              (deck.master || (deck.branches && deck.branches.length > 0)) ? (
                <DeckBranchDeleteButton noText deck={deck} />
              ) : (
                <DeckDeleteButton noText deck={deck} />
              )}
            </>
          )}
        </div>
      </td>
    </tr>
  );
};

export default DeckSelectAdvModalTableRow;
