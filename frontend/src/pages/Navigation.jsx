import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useSnapshot } from 'valtio';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
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
    <Navbar
      fixed={isMobile ? 'bottom' : null}
      sticky={isMobile ? null : 'top'}
      variant="dark"
    >
      <Nav className="container justify-between px-0">
        <div className="flex items-center">
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
                className="flex items-center px-3"
                onClick={() => {
                  toggleInventoryMode();
                }}
              >
                <div
                  className={`flex ${
                    inventoryMode ? 'text-white' : 'text-neutral-500-font'
                  }`}
                >
                  {inventoryMode ? (
                    <ToggleOn width="26" height="26" viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff width="26" height="26" viewBox="0 0 16 16" />
                  )}
                </div>
                <div
                  className={`inline ps-2 ${
                    inventoryMode ? 'text-white' : 'text-neutral-500-font'
                  }`}
                >
                  Inventory Mode
                </div>
              </div>
            )}
        </div>
        <div className="flex items-center">
          {!isMobile && (
            <>
              <NavLink
                to="/account"
                className={`nav-link ${username ? 'icon-only' : ''}`}
              >
                {username ? (
                  <PersonFill
                    className="inline"
                    width="18"
                    height="18"
                    viewBox="0 2 16 16"
                  />
                ) : (
                  'Login'
                )}
              </NavLink>
              <NavLink to="/" end className="nav-link">
                About
              </NavLink>
            </>
          )}
          <NavLink to={pdaUrl} className="nav-link">
            PDA
          </NavLink>
          <NavLink to={twdUrl} className="nav-link">
            TWD
          </NavLink>
          <NavLink to="/inventory" className="nav-link">
            {isMobile ? 'INV' : 'Inventory'}
          </NavLink>
          <NavLink to={decksUrl} className="nav-link">
            {isMobile ? 'DKS' : 'Decks'}
          </NavLink>
          <NavLink to={cryptUrl} className="nav-link">
            {isMobile ? 'CRY' : 'Crypt'}
          </NavLink>
          <NavLink to={libraryUrl} className="nav-link">
            {isMobile ? 'LIB' : 'Library'}
          </NavLink>
          <NavLink
            to={cardsUrl}
            aria-label="Quick card search"
            className="nav-link icon-only"
          >
            <LightningFill
              className="inline"
              width="18"
              height="18"
              viewBox="0 0 16 16"
            />{' '}
          </NavLink>
        </div>
      </Nav>
    </Navbar>
  );
};

export default Navigation;
