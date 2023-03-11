import React from 'react';
import { Menu } from '@headlessui/react';

const MenuButton = ({ title, icon, variant = 'primary', text }) => {
  const outlineStyle =
    'rounded outline-bgCheckboxSelected focus:outline outline-1 dark:outline-bgCheckboxSelectedDark';

  const customStyle = {
    primary:
      'text-fgThird dark:text-fgThirdDark bg-bgButton dark:bg-bgButtonDark border border-borderSecondary dark:border-borderSecondaryDark disabled:opacity-40 disabled:text-fgPrimary dark:disabled:text-fgPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark',
    secondary:
      'text-fgThird dark:text-fgThirdDark bg-bgButtonSecondary dark:bg-bgButtonSecondaryDark border border-borderThird dark:border-borderThirdDark hover:border-borderPrimary dark:hover:border-borderPrimaryDark hover:bg-borderPrimary dark:hover:bg-borderPrimaryDark',
  };

  return (
    <Menu.Button
      className={`${customStyle[variant]} flex items-center justify-center min-h-[41px] gap-2 rounded px-3 py-1.5 w-full ${outlineStyle}`}
      title={title}
    >
      {icon}
      {text && <div>{text}</div>}
    </Menu.Button>
  );
};

export default MenuButton;
