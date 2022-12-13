import React from 'react';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { LanguageMenu } from 'components';
import { useApp } from 'context';

const LanguageSelect = ({ showMenu, setShowMenu }) => {
  const { isMobile, lang, changeLang } = useApp();

  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };
  const SelectedFlag = languages[lang];

  return (
    <>
      {isMobile ? (
        <div>
          <LanguageMenu languages={languages} setShowMenu={setShowMenu} />
        </div>
      ) : (
        <div
          className="relative flex justify-center items-center h-full min-w-[40px]"
          onClick={() => setShowMenu(!showMenu)}
        >
          <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
          {showMenu && (
            <div className="absolute left-0 top-[42] rounded border border-[red] bg-black p-3">
              <LanguageMenu languages={languages} setShowMenu={setShowMenu} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default LanguageSelect;
