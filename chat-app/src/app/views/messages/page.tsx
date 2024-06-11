import { usePowerSync, useQuery } from '@powersync/react';
import { Box } from '@mui/material';
import React from 'react';
import { NavigationPage } from '@/components/navigation/NavigationPage';
import { MessagesWidget } from '@/components/widgets/MessagesWidget';
import { MESSAGES_TABLE, Message, USERS_TABLE, User } from '@/library/powersync/AppSchema';
import { AddMessageWidget } from '../../../components/widgets/AddMessageWidget';

export default function MessagesPage() {
  const powerSync = usePowerSync();
  const { data: users } = useQuery<User>(`SELECT * FROM ${USERS_TABLE}`);
  const user = users?.[0];
  const { data: messages } = useQuery<Message>(`SELECT * FROM ${MESSAGES_TABLE}`);

  const deleteMessage = async (id: string) => {
    await powerSync.writeTransaction(async (db) => {
      await db.execute(`DELETE FROM ${MESSAGES_TABLE} WHERE id = ?`, [id]);
    });
  };

  const createMessage = async (message: string) => {
    const randomGroup = Math.random() < 0.5 ? 1 : 2;
    const res = await powerSync.execute(
      `INSERT INTO ${MESSAGES_TABLE} (id, created_at, message, name, "group") VALUES (uuid(), datetime(), ?, ?, ?) RETURNING *`,
      [message, user.name, randomGroup]
    );

    const resultRecord = res.rows?.item(0);
    if (!resultRecord) {
      throw new Error('Could not create message');
    }
  };

  return (
    <NavigationPage title="Messages">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '90vh'
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            overflowY: 'auto'
          }}
        >
          <MessagesWidget onDelete={(id) => deleteMessage(id)} messages={messages} user={user} />
        </Box>
        <Box
          sx={{
            position: 'static',
            bottom: 0,
            zIndex: 1,
            padding: '12px'
          }}
        >
          <AddMessageWidget onPress={(message) => createMessage(message)} />
        </Box>
      </Box>
    </NavigationPage>
  );
}
