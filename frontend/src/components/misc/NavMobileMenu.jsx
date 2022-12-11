import React, { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import PersonFill from 'assets/images/icons/person-fill.svg';
import InfoCircleFill from 'assets/images/icons/info-circle-fill.svg';
import ToggleOn from 'assets/images/icons/toggle-on.svg';
import ToggleOff from 'assets/images/icons/toggle-off.svg';
import List from 'assets/images/icons/list.svg';
import { LanguageSelect, ThemeSelect } from 'components';
import { useApp } from 'context';

const NavMobileMenu = ({ showMenu, setShowMenu }) => {
  const { inventoryMode, toggleInventoryMode, username } = useApp();
  const menuRef = useRef(null);

  return (
    <div
      ref={menuRef}
      className="relative  text-white"
      onClick={() => setShowMenu(!showMenu)}
    >
      <List width="30" height="30" viewBox="0 0 16 16" />
      {showMenu && (
        <div className="nav-menu absolute text-lg">
          <NavLink
            to="/account"
            onClick={() => setShowMenu(false)}
            className="nav-link  "
          >
            <div className="main-font flex items-center">
              <div className="flex min-w-[30px] justify-center">
                <PersonFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div>{username ? 'Account' : 'Login'}</div>
            </div>
          </NavLink>
          <NavLink
            to="/"
            end
            onClick={() => setShowMenu(false)}
            className="nav-link  "
          >
            <div className="main-font flex items-center">
              <div className="flex min-w-[30px] justify-center">
                <InfoCircleFill height="20" width="20" viewBox="0 0 16 16" />
              </div>
              <div>About</div>
            </div>
          </NavLink>

          <ThemeSelect setShowMenu={setShowMenu} />
          <div
            className="flex items-center  "
            onClick={() => {
              toggleInventoryMode();
              setShowMenu(false);
            }}
          >
            <div className="flex min-w-[30px] justify-center">
              {inventoryMode ? (
                <ToggleOn height="26" width="26" viewBox="0 0 16 16" />
              ) : (
                <ToggleOff height="26" width="26" viewBox="0 0 16 16" />
              )}
            </div>
            <div
              className={`${inventoryMode ? '' : 'gray'} whitespace-nowrap `}
            >
              Inventory Mode
            </div>
          </div>
          <div className="flex items-center justify-between ">
            <LanguageSelect setShowMenu={setShowMenu} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NavMobileMenu;
