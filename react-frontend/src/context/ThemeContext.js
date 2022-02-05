import React, { useState, useLayoutEffect } from 'react';
import {
  initFromStorage,
  setLocalStorage,
  getLocalStorage,
} from 'services/storageServices.js';

const ThemeContext = React.createContext({
  theme: 'auto',
  toggleTheme: () => {},
});

const THEME = 'theme';

export default ThemeContext;

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  if (!context) throw new Error(`useTheme must be used within a ThemeProvider`);

  return context;
};

export const ThemeProvider = (props) => {
  const [theme, setTheme] = useState(getLocalStorage(THEME));

  useLayoutEffect(() => {
    initFromStorage(THEME, 'auto', setTheme);
    const getTheme = () => {
      switch (theme) {
        case 'light':
          return light;
        case 'dark':
          return dark;
        default:
          return [];
      }
    };
    const t = getTheme();
    applyTheme(t);
  }, [theme]);

  const applyTheme = (t) => {
    const root = document.getElementsByTagName('html')[0];
    root.style.cssText = t.join(';');
  };

  const toggleTheme = () => {
    const getNextTheme = () => {
      switch (theme) {
        case 'dark':
          return ['light', light];
        case 'light':
          return ['auto', []];
        default:
          return ['dark', dark];
      }
    };
    const nextTheme = getNextTheme();
    setTheme(() => nextTheme[1]);
    setLocalStorage(THEME, nextTheme[0]);
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {props.children}
    </ThemeContext.Provider>
  );
};

const light = [
  '--fg-primary: #202530',
  '--fg-secondary: #6060cc',
  '--fg-button: #6060b0',
  '--fg-name: #3060b0',
  '--fg-red: #c00000',
  '--fg-green: #00a000',
  '--bg-nav: #303040',
  '--bg-primary: #ffffff',
  '--bg-secondary: #e0e5ff',
  '--bg-third: #f0f5ff',
  '--bg-error: #f08090',
  '--bg-warning: #ffb050',
  '--bg-button: #ffffff',
  '--bg-button-hover: #80b0ff',
  '--bg-button-error: #f06060',
  '--bg-button-error-hover: #ff8080',
  '--bg-button-secondary: #ffffff',
  '--bg-menu-focused: #8085ff',
  '--bg-menu-selected: #c0c5ff',
  '--bg-checkbox: #ffffff',
  '--bg-checkbox-selected: #7070ff',
  '--border-primary: #80b0ff',
  '--border-secondary: #e0e5ff',
  '--border-third: #a0b0ff',
  '--border-button: #a0b0ff',
  '--border-nest-modal: #707085',
  '--disciplines-shadow: #ffffff',
  '--clan-icon-brightness: 100%',
  '--icons-brightness: 100%',
  '--logo-brightness: 100%',
];

const dark = [
  '--fg-primary: #e0e0e0',
  '--fg-secondary: #80b0ff',
  '--fg-button: #c0c0e0',
  '--fg-name: #d59000',
  '--fg-red: #f04030',
  '--fg-green: #00d000',
  '--bg-nav: #303040',
  '--bg-primary: #252530',
  '--bg-secondary: #353545',
  '--bg-third: #303040',
  '--bg-error: #901000',
  '--bg-warning: #c06500',
  '--bg-button: #404050',
  '--bg-button-hover: #505060',
  '--bg-button-error: #901000',
  '--bg-button-error-hover: #b03525',
  '--bg-button-secondary: #303040',
  '--bg-menu-focused: #505060',
  '--bg-menu-selected: #353545',
  '--bg-checkbox: #e0e0e0',
  '--bg-checkbox-selected: #6060a0',
  '--border-primary: #606070',
  '--border-secondary: #353540',
  '--border-third: #303040',
  '--border-button: #404050',
  '--border-nest-modal: #404050',
  '--disciplines-shadow: #b0b0b0',
  '--clan-icon-brightness: 65%',
  '--icons-brightness: 85%',
  '--logo-brightness: 150%',
];
