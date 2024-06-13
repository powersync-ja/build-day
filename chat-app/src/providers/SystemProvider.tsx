import { NavigationPanelContextProvider } from '@/navigation/NavigationPanelContext';
import { CircularProgress } from '@mui/material';
import { WASQLitePowerSyncDatabaseOpenFactory } from '@powersync/web';
import Logger from 'js-logger';
import React, { Suspense, useState } from 'react';
import { AppSchema } from '../powersync/AppSchema';
import { PowerSyncContext } from '@powersync/react';
import { DemoConnector } from '../powersync/DemoConnector';

const db = new WASQLitePowerSyncDatabaseOpenFactory({
  dbFilename: 'example.db',
  schema: AppSchema
}).getInstance();

const ConnectorContext = React.createContext<DemoConnector | null>(null);
export const useConnect = () => React.useContext(ConnectorContext);

export const SystemProvider = ({ children }: { children: React.ReactNode }) => {
  const [powersync] = useState(db);

  const [connector] = useState(new DemoConnector());

  React.useEffect(() => {
    // Linting thinks this is a hook due to it's name
    Logger.useDefaults(); // eslint-disable-line
    Logger.setLevel(Logger.DEBUG);

    (window as any).powersync = powersync;

    powersync.init();
    powersync.connect(connector);
  }, [powersync, connector]);

  return (
    <Suspense fallback={<CircularProgress />}>
      <PowerSyncContext.Provider value={powersync}>
        <ConnectorContext.Provider value={connector}>
          <NavigationPanelContextProvider>{children}</NavigationPanelContextProvider>
        </ConnectorContext.Provider>
      </PowerSyncContext.Provider>
    </Suspense>
  );
};

export default SystemProvider;
