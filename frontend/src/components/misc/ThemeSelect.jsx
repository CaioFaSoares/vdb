import React from 'react';
import PcDisplay from 'assets/images/icons/pc-display.svg';
import SunFill from 'assets/images/icons/sun-fill.svg';
import MoonFill from 'assets/images/icons/moon-fill.svg';
import { useApp, useTheme } from 'context';

const ThemeSelect = ({ setShowMenu }) => {
  const { theme, toggleTheme } = useTheme();
  const { isMobile } = useApp();

  return (
    <div
      className={`flex h-full min-w-[40px] items-center justify-center ${
        isMobile ? '' : 'text-white'
      }   `}
      onClick={() => {
        toggleTheme();
        isMobile && setShowMenu(false);
      }}
    >
      {isMobile ? (
        <>
          <div className="flex min-w-[30px] justify-center">
            {theme === 'dark' && (
              <MoonFill height="20" width="20" viewBox="0 0 16 16" />
            )}
            {theme === 'light' && (
              <SunFill height="20" width="20" viewBox="0 0 16 16" />
            )}
            {theme === 'auto' && (
              <PcDisplay height="20" width="20" viewBox="0 0 16 16" />
            )}
          </div>
          <div className="whitespace-nowrap ">
            {theme === 'dark' && 'Dark Theme'}
            {theme === 'light' && 'Light Theme'}
            {theme === 'auto' && 'System Theme'}
          </div>
        </>
      ) : (
        <>
          {theme === 'dark' && <MoonFill />}
          {theme === 'light' && <SunFill />}
          {theme === 'auto' && <PcDisplay />}
        </>
      )}
    </div>
  );
};

export default ThemeSelect;
