import React from 'react';
import FlagEn from 'assets/images/flags/en.svg';
import FlagEs from 'assets/images/flags/es.svg';
import FlagFr from 'assets/images/flags/fr.svg';
import FlagBr from 'assets/images/flags/br.svg';
import { LanguageMenu } from 'components';
import { useApp } from 'context';

const LanguageSelectButton = ({ showMenu, setShowMenu }) => {
  const { lang } = useApp();
  const languages = {
    'en-EN': FlagEn,
    'es-ES': FlagEs,
    'fr-FR': FlagFr,
    'pt-PT': FlagBr,
  };
  const SelectedFlag = languages[lang];

  return (
    <div
      className="relative flex h-full min-w-[40px] items-center justify-center"
      onClick={() => setShowMenu(!showMenu)}
    >
      <SelectedFlag width="18" height="18" viewBox="0 0 500 500" />
      {showMenu && (
        <div className="absolute left-1 top-11 rounded border border-borderPrimary bg-bgPrimary p-3 dark:border-borderPrimaryDark dark:bg-bgPrimaryDark">
          <LanguageMenu setShowMenu={setShowMenu} />
        </div>
      )}
    </div>
  );
};

export default LanguageSelectButton;
