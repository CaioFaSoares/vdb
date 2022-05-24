import React from 'react';
import { Stack } from 'react-bootstrap';
import {
  DeckSearchSimilarButton,
  DeckCloneButton,
  DeckDeleteButton,
  DeckCopyUrlButton,
  DeckImport,
  DeckExportButton,
  DeckProxyButton,
  DeckMissingButton,
  DeckRecommendationButton,
  DeckDrawButton,
  DeckDiffButton,
  DeckBranchCreateButton,
  DeckBranchDeleteButton,
  DeckPublicButton,
} from 'components';

import { useApp } from 'context';

const DeckButtons = ({
  deck,
  src,
  isPublic,
  isAuthor,
  isBranches,
  missingCrypt,
  missingLibrary,
  setShowInfo,
  setShowDraw,
  setShowQr,
  setShowRecommendation,
}) => {
  const { inventoryMode, username } = useApp();

  return (
    <Stack gap={1}>
      <DeckImport setShowInfo={setShowInfo} />
      {deck && (
        <>
          {username && <DeckCloneButton deck={deck} src={src} />}
          <DeckExportButton deck={deck} src={src} />
          {isAuthor && !isPublic && <DeckDeleteButton deck={deck} />}
          {isAuthor && !isPublic && <DeckBranchCreateButton deck={deck} />}
          {isAuthor && !isPublic && isBranches && (
            <DeckBranchDeleteButton deck={deck} />
          )}
          {isAuthor && <DeckPublicButton deck={deck} />}

          <DeckDiffButton deckid={deck.deckid} />
          <DeckCopyUrlButton setShowQr={setShowQr} deck={deck} />
          <DeckProxyButton
            deck={deck}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
          />
          <DeckRecommendationButton
            setShowRecommendation={setShowRecommendation}
          />
          <DeckSearchSimilarButton deck={deck} />
          <DeckDrawButton setShowDraw={setShowDraw} />
          {inventoryMode && (
            <DeckMissingButton
              deck={deck}
              missingCrypt={missingCrypt}
              missingLibrary={missingLibrary}
            />
          )}
        </>
      )}
    </Stack>
  );
};

export default DeckButtons;
