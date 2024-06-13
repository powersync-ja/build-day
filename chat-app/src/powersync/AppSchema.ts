import { Schema, TableV2, column } from '@powersync/web';

export const MESSAGES_TABLE = 'messages';
export const USERS_TABLE = 'users';

const messages = new TableV2({
  name: column.text,
  message: column.text,
  group: column.integer,
  created_at: column.text
});

const users = new TableV2(
  {
    name: column.text,
    created_at: column.text
  },
  {
    localOnly: true
  }
);

export const AppSchema = new Schema({
  messages,
  users
});

export type Database = (typeof AppSchema)['types'];
export type Message = Database['messages'];
export type Messages = Message[];
export type User = Database['users'];
export type Users = User[];
