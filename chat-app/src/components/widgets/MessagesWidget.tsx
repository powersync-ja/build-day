import { MESSAGES_ROUTE } from '@/app/router';
import { MESSAGES_TABLE, Messages, USERS_TABLE } from '@/library/powersync/AppSchema';
import { List } from '@mui/material';
import { usePowerSync, useQuery } from '@powersync/react';
import { useNavigate } from 'react-router-dom';
import { MessageWidget } from './MessageWidget';

export function MessagesWidget() {
  const powerSync = usePowerSync();
  const navigate = useNavigate();

  const { data: messages } = useQuery<Messages>(`
      SELECT
        ${MESSAGES_TABLE}.*
      FROM
        ${MESSAGES_TABLE}
      `);

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
          message={message.message!}
          onDelete={() => deleteMessage(message.id)}
        />
      ))}
    </List>
  );
}
