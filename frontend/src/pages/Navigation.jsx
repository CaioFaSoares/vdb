import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSnapshot } from 'valtio';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import { useApp } from 'context';
import { NavMobileMenu, LanguageSelect, ThemeSelect } from 'components';
import cryptDefaults from 'components/forms_data/defaultsCryptForm.json';
import libraryDefaults from 'components/forms_data/defaultsLibraryForm.json';
import twdDefaults from 'components/forms_data/defaultsTwdForm.json';
import pdaDefaults from 'components/forms_data/defaultsPdaForm.json';
import { sanitizeFormState } from 'utils';
import {
  searchCryptForm,
  searchLibraryForm,
  searchTwdForm,
  searchPdaForm,
  searchResults,
  deckStore,
} from 'context';

const Navigation = () => {
  const { inventoryMode, toggleInventoryMode, isMobile, username } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const location = useLocation();
  const deck = useSnapshot(deckStore).deck;
  const quickCard = useSnapshot(searchResults).quickCard;
  const cryptFormState = useSnapshot(searchCryptForm);
  const libraryFormState = useSnapshot(searchLibraryForm);
  const twdFormState = useSnapshot(searchTwdForm);
  const pdaFormState = useSnapshot(searchPdaForm);

  let pdaUrl = '/pda';
  let twdUrl = '/twd';
  let cryptUrl = '/crypt';
  let libraryUrl = '/library';
  let decksUrl = '/decks';
  let cardsUrl = '/cards';

  if (!isMobile) {
    if (JSON.stringify(cryptFormState) != JSON.stringify(cryptDefaults)) {
      const input = sanitizeFormState('crypt', cryptFormState);
      cryptUrl = `/crypt?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(libraryFormState) != JSON.stringify(libraryDefaults)) {
      const input = sanitizeFormState('library', libraryFormState);
      libraryUrl = `/library?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(twdFormState) != JSON.stringify(twdDefaults)) {
      const input = sanitizeFormState('twd', twdFormState);
      twdUrl = `/twd?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
    if (JSON.stringify(pdaFormState) != JSON.stringify(pdaDefaults)) {
      const input = sanitizeFormState('pda', pdaFormState);
      pdaUrl = `/pda?q=${encodeURIComponent(JSON.stringify(input))}`;
    }
  }
  if (deck?.deckid) decksUrl = `/decks/${deck.deckid}`;
  if (quickCard) cardsUrl = `/cards/${quickCard}`;

  return (
    <nav
      className={`${
        isMobile ? 'fixed bottom-0' : 'sticky top-0'
      } z-50 bg-green-900`}
    >
      <div className="flex h-[42px] justify-between">
        <div className="flex items-center space-x-6 ">
          {isMobile ? (
            <NavMobileMenu showMenu={showMenu} setShowMenu={setShowMenu} />
          ) : (
            <>
              <LanguageSelect showMenu={showMenu} setShowMenu={setShowMenu} />
              <ThemeSelect />
            </>
          )}
          {username &&
            !isMobile &&
            location.pathname !== '/account' &&
            location.pathname !== '/' &&
            location.pathname !== '/changelog' &&
            location.pathname !== '/documentation' &&
            location.pathname !== '/inventory' && (
              <div
                className={`flex items-center space-x-4 ${
                  inventoryMode ? 'text-white' : 'text-neutral-500-font'
                }`}
                onClick={() => {
                  toggleInventoryMode();
                }}
              >
                <div>
                  {inventoryMode ? (
                    <ToggleOn width="26" height="26" viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff width="26" height="26" viewBox="0 0 16 16" />
                  )}
                </div>
                Inventory Mode
              </div>
            )}
        </div>
        <div className="flex items-center">
          {!isMobile && (
            <>
              <NavLink
                to="/account"
                className={`nav-link flex h-full items-center ${
                  username ? '' : ''
                }`}
              >
                {username ? (
                  <PersonFill width="20" height="20" viewBox="0 1 16 16" />
                ) : (
                  'Login'
                )}
              </NavLink>
              <NavLink
                to="/"
                end
                className="nav-link flex h-full items-center "
              >
                About
              </NavLink>
            </>
          )}
          <NavLink to={pdaUrl} className="nav-link flex h-full items-center ">
            PDA
          </NavLink>
          <NavLink to={twdUrl} className="nav-link flex h-full items-center ">
            TWD
          </NavLink>
          <NavLink
            to="/inventory"
            className="nav-link flex h-full items-center "
          >
            {isMobile ? 'INV' : 'Inventory'}
          </NavLink>
          <NavLink to={decksUrl} className="nav-link flex h-full items-center ">
            {isMobile ? 'DKS' : 'Decks'}
          </NavLink>
          <NavLink to={cryptUrl} className="nav-link flex h-full items-center ">
            {isMobile ? 'CRY' : 'Crypt'}
          </NavLink>
          <NavLink
            to={libraryUrl}
            className="nav-link flex h-full items-center "
          >
            {isMobile ? 'LIB' : 'Library'}
          </NavLink>
          <NavLink
            to={cardsUrl}
            aria-label="Quick card search"
            className="nav-link flex h-full items-center "
          >
            <LightningFill width="18" height="18" viewBox="0 0 16 16" />
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
