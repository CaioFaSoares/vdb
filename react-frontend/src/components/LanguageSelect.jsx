import React, { useRef, useState } from 'react';
import { Overlay, Popover } from 'react-bootstrap';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import { useApp } from 'context';

const LanguageSelect = (props) => {
  const { isMobile, lang, changeLang } = useApp();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef(null);

  const languages = { 'en-EN': FlagEn, 'es-ES': FlagEs, 'fr-FR': FlagFr };

  const options = Object.keys(languages).map((l) => {
    const Flag = languages[l];
    return (
      <div
        key={l}
        className={lang == l ? 'flag-active mx-2' : 'mx-2'}
        onClick={() => {
          changeLang(l);
          setShowMenu(false);
          props.setShowMenu(false);
        }}
      >
        <Flag width="18" height="18" viewBox="0 0 500 500" />
      </div>
    );
  });

  const Menu = () => (
    <>
      <div className="px-2 pb-1">Card Language:</div>
      <div className="d-flex align-items-center justify-content-between">
        {options}
      </div>
    </>
  );

  const SelectedFlag = languages[lang];

  return (
    <>
      {isMobile ? (
        <div>
          <Menu />
        </div>
      ) : (
        <>
          <div
            ref={menuRef}
            className="px-3"
            onClick={() => setShowMenu(!showMenu)}
          >
            <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
          </div>
          <Overlay
            target={menuRef}
            show={showMenu}
            placement="bottom"
            popperConfig={{
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [0, 15],
                  },
                },
              ],
            }}
          >
            {({
              placement,
              popperConfig,
              arrowProps,
              show: _show,
              popper,
              ...props
            }) => (
              <Popover {...props} className="navMenu">
                <Popover.Body>
                  <Menu />
                </Popover.Body>
              </Popover>
            )}
          </Overlay>
        </>
      )}
    </>
  );
};

export default LanguageSelect;
