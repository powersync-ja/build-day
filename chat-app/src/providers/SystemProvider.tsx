import { NavigationPanelContextProvider } from '@/navigation/NavigationPanelContext';
import { CircularProgress } from '@mui/material';
import { WASQLitePowerSyncDatabaseOpenFactory } from '@powersync/web';
import Logger from 'js-logger';
import React, { Suspense, useState } from 'react';
import { AppSchema } from '../powersync/AppSchema';
import { PowerSyncContext } from '@powersync/react';

const db = new WASQLitePowerSyncDatabaseOpenFactory({
  dbFilename: 'example.db',
  schema: AppSchema
}).getInstance();


export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  const [powersync] = useState(db);

  React.useEffect(() => {
    // Linting thinks this is a hook due to it's name
    Logger.useDefaults(); // eslint-disable-line
    Logger.setLevel(Logger.DEBUG);

    (window as any).powersync = powersync;

    powersync.init();
  }, [powersync]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <PowerSyncContext.Provider value={powersync}>
          <NavigationPanelContextProvider>{children}</NavigationPanelContextProvider>
      </PowerSyncContext.Provider>
    </Suspense>
  );
};

export default SystemProvider;
