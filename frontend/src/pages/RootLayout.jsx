import React from 'react';
import { Outlet } from 'react-router-dom';
import { AppProvider, ThemeProvider } from 'context';
import Navigation from 'pages/Navigation.jsx';
import OfflineNotification from 'components/misc/OfflineNotification.jsx';
import { UpdateNotification } from 'components';
import changes from '../../../CHANGES.json';

const RootLayout = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <Navigation />
        <OfflineNotification />
      </ThemeProvider>
      <div className="bg-bgPrimary text-fgPrimary dark:bg-bgPrimaryDark dark:text-fgPrimaryDark">
        <Outlet />
      </div>
      <UpdateNotification appVersion={changes[0].version} />
    </AppProvider>
  );
};

export default RootLayout;
