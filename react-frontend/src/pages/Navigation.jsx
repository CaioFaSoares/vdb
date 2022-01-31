import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import LightningFill from 'assets/images/icons/lightning-fill.svg';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import SunFill from 'assets/images/icons/sun-fill.svg';
import MoonFill from 'assets/images/icons/moon-fill.svg';
import { useApp, useTheme, useSearchForms } from 'context';
import { NavMobileMenu, LanguageSelect } from 'components';
import cryptDefaults from 'components/forms_data/defaultsCryptForm.json';
import libraryDefaults from 'components/forms_data/defaultsLibraryForm.json';
import twdDefaults from 'components/forms_data/defaultsTwdForm.json';
import { sanitizeFormState } from 'utils';

function Navigation(props) {
  const { inventoryMode, toggleInventoryMode, isMobile, username, activeDeck } =
    useApp();

  const { setCryptFormState, twdFormState, cryptFormState, libraryFormState } =
    useSearchForms();

  const { isDarkTheme, toggleTheme } = useTheme();
  const location = useLocation();

  let twdUrl = '/twd';
  let cryptUrl = '/crypt';
  let libraryUrl = '/library';
  let decksUrl = '/decks';

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
  }
  if (activeDeck.deckid) {
    decksUrl = `/decks?id=${activeDeck.deckid}`;
  }

  return (
    <Navbar
      fixed={isMobile ? 'bottom' : null}
      sticky={isMobile ? null : 'top'}
      variant="dark"
    >
      <Nav className="container justify-content-between px-0">
        <div className="d-flex align-items-center">
          {isMobile ? (
            <NavMobileMenu />
          ) : (
            <>
              <LanguageSelect />
              <div className="white-font px-3" onClick={() => toggleTheme()}>
                {isDarkTheme ? <MoonFill /> : <SunFill />}
              </div>
            </>
          )}
          {username &&
            !isMobile &&
            (location.pathname == '/decks' ||
              location.pathname == '/crypt' ||
              location.pathname == '/diff' ||
              location.pathname == '/library' ||
              location.pathname == '/twd') && (
              <div
                className="d-flex align-items-center px-3"
                onClick={() => {
                  toggleInventoryMode();
                  setCryptFormState((prevState) => ({
                    ...prevState,
                    text: {
                      ...prevState['text'],
                      value: 'kek',
                    },
                  }));
                }}
              >
                <div
                  className={
                    inventoryMode
                      ? 'd-flex white-font-toggle'
                      : 'd-flex gray-font-toggle'
                  }
                >
                  {inventoryMode ? (
                    <ToggleOn viewBox="0 0 16 16" />
                  ) : (
                    <ToggleOff viewBox="0 0 16 16" />
                  )}
                </div>
                <div
                  className={
                    inventoryMode
                      ? 'd-inline ps-2 white-font'
                      : 'd-inline ps-2 gray-font'
                  }
                >
                  Inventory Mode
                </div>
              </div>
            )}
        </div>
        <div className="d-flex align-items-center">
          {!isMobile && (
            <>
              <NavLink to="/account" className="nav-link pe-2 ps-1">
                {username ? <PersonFill /> : 'Login'}
              </NavLink>
              <NavLink to="/about" className="nav-link pe-2 ps-1">
                {isMobile ? <InfoCircleFill /> : 'About'}
              </NavLink>
            </>
          )}
          <NavLink to={twdUrl} className="nav-link pe-2 ps-1">
            TWD
          </NavLink>
          <NavLink to="/inventory" className="nav-link pe-2 ps-1">
            {isMobile ? 'Inv' : 'Inventory'}
          </NavLink>
          <NavLink to={decksUrl} className="nav-link pe-2 ps-1">
            Decks
          </NavLink>
          <NavLink to={cryptUrl} className="nav-link pe-2 ps-1">
            Crypt
          </NavLink>
          <NavLink to={libraryUrl} className="nav-link pe-2 ps-1">
            Library
          </NavLink>
          <NavLink to="/cards" className="nav-link pe-3 ps-2">
            <LightningFill width="18" height="18" viewBox="0 0 16 16" />
          </NavLink>
        </div>
      </Nav>
    </Navbar>
  );
}

export default Navigation;
