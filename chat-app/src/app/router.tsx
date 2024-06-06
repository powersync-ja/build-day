import { Outlet, createBrowserRouter } from 'react-router-dom';
import EntryPage from './page';
import MessagesPage from './views/messages/page';
import UserPage from './views/user/page';
import ViewsLayout from './views/layout';
import SQLConsolePage from './views/sql-console/page';

export const MESSAGES_ROUTE = '/views/messages';
export const USER_ROUTE = '/views/user';
export const SQL_CONSOLE_ROUTE = '/sql-console';

export const DEFAULT_ENTRY_ROUTE = USER_ROUTE;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <EntryPage />
  },
  {
    element: (
      <ViewsLayout>
        <Outlet />
      </ViewsLayout>
    ),
    children: [
      {
        path: USER_ROUTE,
        element: <UserPage />
      },
      {
        path: MESSAGES_ROUTE,
        element: <MessagesPage />
      },
      {
        path: SQL_CONSOLE_ROUTE,
        element: <SQLConsolePage />
      }
    ]
  }
]);
