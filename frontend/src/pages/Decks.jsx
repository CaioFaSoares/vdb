import React, { useState, useEffect, useMemo } from 'react';
import { useSnapshot } from 'valtio';
import {
  useNavigate,
  useLocation,
  useParams,
  useLoaderData,
  defer,
} from 'react-router-dom';
import List from 'assets/images/icons/list.svg';
import {
  AccountLogin,
  AccountRegister,
  DeckButtons,
  DeckCrypt,
  DeckDetails,
  DeckDraw,
  DeckImport,
  DeckLibrary,
  DeckQrModal,
  DeckRecommendation,
  DeckSelect,
  DeckSelectAdvModal,
  Modal,
  Seating,
  ButtonFloat,
  ErrorMessage,
} from 'components';
import { deckStore, useApp, setDeck } from 'context';
import { useDeck, useDeckMissing, useTags } from 'hooks';

const Decks = () => {
  const {
    addRecentDeck,
    isMobile,
    playtest,
    preconDecks,
    setShowFloatingButtons,
    setShowMenuButtons,
    showFloatingButtons,
    showMenuButtons,
    username,
    lastDeckId,
    cryptCardBase,
    libraryCardBase,
  } = useApp();
  const deck = useSnapshot(deckStore).deck;
  const decks = useSnapshot(deckStore).decks;
  const navigate = useNavigate();
  const { deckid } = useParams();
  const { hash } = useLocation();
  const query = new URLSearchParams(useLocation().search);
  const loaderData = useLoaderData();

  if (hash && deckid !== 'deck') {
    const name = query.get('name') ?? '';
    const author = query.get('author') ?? '';
    const description = query.get('description') ?? '';
    const url = `/decks/deck?name=${name}&author=${author}&description=${description}${hash}`;
    navigate(url);
  }

  const [error, setError] = useState(false);
  const [foldedDescription, setFoldedDescription] = useState(!isMobile);
  const [qrUrl, setQrUrl] = useState(false);
  const [showDeckSelectAdv, setShowDeckSelectAdv] = useState(false);
  const [showDraw, setShowDraw] = useState(false);
  const [showSeating, setShowSeating] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showRecommendation, setShowRecommendation] = useState(false);

  const getDeck = async () => {
    const deckData = await loaderData.deck;

    if (deckData.error) {
      if (deckData.error == 400) {
        setError('NO DECK WITH THIS ID');
      } else {
        setError('CONNECTION PROBLEM');
      }
      setDeck(undefined);
      return;
    }

    setError(false);
    const cardsData = useDeck(deckData.cards, cryptCardBase, libraryCardBase);
    if (deckid.length !== 32 || deckData.publicParent) {
      deckData.tags = [];
      Object.values(useTags(cardsData.crypt, cardsData.library)).map((v) => {
        deckData.tags = deckData.tags.concat(v);
      });
    }
    const d = {
      author: deckData.author,
      crypt: cardsData.crypt,
      deckid: deckData.deckid,
      description: deckData.description,
      isAuthor: deckData.isAuthor,
      isBranches: Boolean(deckData.master || deckData.branches?.length > 0),
      isNonEditable: deckData.isNonEditable,
      isPublic: Boolean(deckData.publicParent),
      library: cardsData.library,
      name: deckData.name,
      publicChild: deckData.publicChild,
      publicParent: deckData.publicParent,
      tags: deckData.tags,
      timestamp: deckData.timestamp,
    };
    addRecentDeck(d);
    setDeck(d);
  };

  const handleSelect = (e) => {
    navigate(`/decks/${e.value.replace(' ', '_')}`, { replace: true });
  };

  const { missingCrypt, missingLibrary } = useDeckMissing(deck);

  const allTagsOptions = useMemo(() => {
    const allTags = new Set();

    if (decks) {
      Object.keys(decks).map((id) => {
        if (decks[id].tags) {
          decks[id].tags.map((tag) => {
            allTags.add(tag);
          });
        }
      });
    }

    const options = [...allTags].map((tag) => ({
      label: tag,
      value: tag,
    }));

    return options;
  }, [decks]);

  useEffect(() => {
    if (hash && cryptCardBase && libraryCardBase) {
      const crypt = {};
      const library = {};

      hash
        .slice(1)
        .split(';')
        .map((i) => {
          const j = i.split('=');
          if (j[0] > 200000) {
            crypt[j[0]] = {
              q: parseInt(j[1]),
              c: cryptCardBase[j[0]],
            };
          } else {
            library[j[0]] = {
              q: parseInt(j[1]),
              c: libraryCardBase[j[0]],
            };
          }
        });

      setDeck({
        deckid: 'deck',
        name: query.get('name') ?? '',
        author: query.get('author') ?? '',
        description: query.get('description') ?? '',
        crypt: crypt,
        library: library,
      });
    }
  }, [hash, cryptCardBase, libraryCardBase]);

  useEffect(() => {
    if (cryptCardBase && libraryCardBase && decks !== undefined) {
      if (deckid) {
        if (!deck || deck.deckid != deckid) {
          if (decks[deckid]) {
            setDeck(decks[deckid]);
          } else if (deckid.includes(':')) {
            const deckidFixed = deckid.replace('_', ' ');
            if (preconDecks && preconDecks[deckidFixed]) {
              setDeck(preconDecks[deckidFixed]);
            } else {
              setDeck(undefined);
              setError('NO DECK WITH THIS ID');
            }
          } else if (loaderData) {
            getDeck();
          }
        }
      } else if (lastDeckId) {
        setDeck(decks[lastDeckId]);
      }
    }
  }, [
    deckid,
    loaderData,
    lastDeckId,
    decks,
    preconDecks,
    cryptCardBase,
    libraryCardBase,
  ]);

  useEffect(() => {
    if (deck) {
      setError(false);
      if (!deckid) navigate(`/decks/${deck.deckid}`);
    }
  }, [deck]);

  const X_SPACING = 'space-x-8';
  const Y_SPACING = 'space-y-8';
  const TOP_SPACING = 'pt-8';

  return (
    <div className="deck-container mx-auto">
      <div className={`flex flex-row ${X_SPACING} ${TOP_SPACING}`}>
        <div className={`basis-full lg:basis-10/12 ${Y_SPACING}`}>
          <div className="flex flex-row">
            <div className="md:basis-5/12">
              <DeckSelect
                deckid={deckid}
                deck={deck}
                decks={decks}
                handleSelect={handleSelect}
                setShowDeckSelectAdv={setShowDeckSelectAdv}
                showInfo={showInfo}
                setShowInfo={setShowInfo}
              />
            </div>
            <div className="md:basis-7/12">
              {deck && (showInfo || !isMobile) && (
                <>
                  <DeckDetails
                    deck={deck}
                    folded={foldedDescription}
                    setFolded={setFoldedDescription}
                    allTagsOptions={allTagsOptions}
                  />
                </>
              )}
            </div>
          </div>
          {error && <ErrorMessage>{error}</ErrorMessage>}
          {deck && (
            <div className={`flex flex-row ${X_SPACING}`}>
              {playtest ||
              !(
                Object.keys(deck.crypt).some((cardid) => cardid > 210000) ||
                Object.keys(deck.library).some((cardid) => cardid > 110000)
              ) ? (
                <>
                  <div className="md:basis-7/12">
                    <DeckCrypt deck={deck} />
                  </div>
                  <div className="md:basis-5/12">
                    <DeckLibrary deck={deck} />
                  </div>
                </>
              ) : (
                <>
                  {error && <ErrorMessage>CONTAIN PLAYTEST CARDS</ErrorMessage>}
                </>
              )}
            </div>
          )}
        </div>
        {!isMobile && (
          <div className="hidden lg:flex lg:basis-2/12">
            <div className="top-[77px] z-20 bg-bgPrimary dark:bg-bgPrimaryDark">
              <DeckButtons
                deck={deck}
                setShowInfo={setShowInfo}
                setShowDraw={setShowDraw}
                setShowSeating={setShowSeating}
                setShowRecommendation={setShowRecommendation}
                setQrUrl={setQrUrl}
                missingCrypt={missingCrypt}
                missingLibrary={missingLibrary}
              />
            </div>
          </div>
        )}
      </div>
      {!username && !deckid && !hash && (
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-10">
          <div className="justify-center font-bold text-fgSecondary dark:text-fgSecondaryDark">
            <div className="flex justify-center text-lg">
              Login to create your decks
            </div>
            <div className="flex justify-center">
              (Browse preconstructed decks without login)
            </div>
          </div>
          <div className="space-y-16">
            <AccountLogin />
            <AccountRegister />
          </div>
        </div>
      )}

      {username && decks && Object.keys(decks).length === 0 && !deck && (
        <div className="flex h-[70vh] flex-col items-center justify-center space-y-8">
          <div className="justify-center font-bold text-fgSecondary dark:text-fgSecondaryDark">
            <div className="flex justify-center text-lg">
              You do not have any decks in your collection yet
            </div>
            <div className="flex justify-center text-lg">
              Start by creating new one, import from Lackey / Amaranth / Text or
              browse official preconstructed decks
            </div>
          </div>
          <div className="flex justify-center">
            <DeckImport isOnlyNew={true} />
          </div>
        </div>
      )}

      {showFloatingButtons && (
        <ButtonFloat
          onClick={() => {
            setShowMenuButtons(true);
            setShowFloatingButtons(false);
          }}
          variant="lg:hidden bg-[#707070] opacity-80"
        >
          <List width="35" height="35" viewBox="0 0 16 16" />
        </ButtonFloat>
      )}

      {showMenuButtons && (
        <Modal
          handleClose={() => {
            setShowMenuButtons(false);
            setShowFloatingButtons(true);
          }}
          size="sm"
          centered
        >
          <DeckButtons
            deck={deck}
            setShowInfo={setShowInfo}
            setShowDraw={setShowDraw}
            setShowSeating={setShowSeating}
            setShowRecommendation={setShowRecommendation}
            setQrUrl={setQrUrl}
            missingCrypt={missingCrypt}
            missingLibrary={missingLibrary}
            handleClose={() => {
              setShowMenuButtons(false);
              setShowFloatingButtons(true);
            }}
          />
        </Modal>
      )}
      {showDeckSelectAdv && (
        <DeckSelectAdvModal
          handleClose={() => {
            setShowDeckSelectAdv(false);
            setShowFloatingButtons(true);
          }}
          show={showDeckSelectAdv}
          allTagsOptions={allTagsOptions}
        />
      )}
      {showDraw && <DeckDraw setShow={setShowDraw} deck={deck} />}
      {showSeating && <Seating setShow={setShowSeating} />}
      {showRecommendation && (
        <DeckRecommendation deck={deck} setShow={setShowRecommendation} />
      )}
      {qrUrl && <DeckQrModal qrUrl={qrUrl} setQrUrl={setQrUrl} deck={deck} />}
    </div>
  );
};

export default Decks;

export const loader = async ({ params }) => {
  if (params.deckid === 'deck' || params.deckid.includes(':')) return null;

  const url = `${process.env.API_URL}deck/${params.deckid}`;
  const options = {
    method: 'GET',
    mode: 'cors',
    credentials: 'include',
  };

  const response = fetch(url, options).then((response) => {
    if (!response.ok) return { error: response.status };
    return response.json();
  });

  return defer({ deck: response });
};
