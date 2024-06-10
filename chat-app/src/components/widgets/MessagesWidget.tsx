import { MESSAGES_TABLE, Messages, USERS_TABLE, Users } from '@/library/powersync/AppSchema';
import { List } from '@mui/material';
import { usePowerSync, useQuery } from '@powersync/react';
import { MessageWidget } from './MessageWidget';

export function MessagesWidget() {
  const powerSync = usePowerSync();

  const { data: messages } = useQuery<Messages>(`
      SELECT
        ${MESSAGES_TABLE}.*
      FROM
        ${MESSAGES_TABLE}
      `);

  const { data: users } = useQuery<Users>(`
      SELECT
        ${USERS_TABLE}.*
      FROM
        ${USERS_TABLE}
      `);
  const user = users?.[0];

  const deleteMessage = async (id: string) => {
    await powerSync.writeTransaction(async (db) => {
      // Delete messages
      await db.execute(`DELETE FROM ${MESSAGES_TABLE} WHERE id = ?`, [id]);
    });
  };

  return (
    <List dense={false}>
      {messages.map((message) => (
        <MessageWidget
          key={message.id}
          name={message.name ?? ''}
          isUserMessage={user?.name === message.name}
          message={message.message!}
          onDelete={() => deleteMessage(message.id)}
        />
      ))}
    </List>
  );
}
