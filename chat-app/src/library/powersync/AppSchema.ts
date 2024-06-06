import { column, Schema, TableV2 } from '@powersync/web';

export const MESSAGES_TABLE = 'messages';
export const USERS_TABLE = 'users';

// Potentially add user pic using attachments
const users = new TableV2(
  {
    name: column.text,
    created_at: column.text
  },
  { localOnly: true }
);

const messages = new TableV2({
  name: column.text,
  message: column.text,
  group: column.integer,
  created_at: column.text
});

export const AppSchema = new Schema({
  users,
  messages
});

export type Database = (typeof AppSchema)['types'];
export type Messages = Database['messages'];
export type Users = Database['users'];
