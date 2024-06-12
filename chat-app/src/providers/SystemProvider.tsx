import { NavigationPanelContextProvider } from '@/navigation/NavigationPanelContext';
import { CircularProgress } from '@mui/material';
import Logger from 'js-logger';
import React, { Suspense } from 'react';

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    // Linting thinks this is a hook due to it's name
    Logger.useDefaults(); // eslint-disable-line
    Logger.setLevel(Logger.DEBUG);
  }, []);

  return (
    <Suspense fallback={<CircularProgress />}>
      <NavigationPanelContextProvider>{children}</NavigationPanelContextProvider>
    </Suspense>
  );
};

export default SystemProvider;
