import { Box } from '@mui/material';
import React from 'react';
import { NavigationPage } from '@/navigation/NavigationPage';
import { MessagesWidget } from '@/widgets/MessagesWidget';
import { AddMessageWidget } from '@/widgets/AddMessageWidget';
import { usePowerSync, useQuery } from '@powersync/react';
import { MESSAGES_TABLE, USERS_TABLE, User, Message } from '../../../powersync/AppSchema';

export default function MessagesPage() {
  const powersync = usePowerSync();
  const { data: users } = useQuery<User>(`SELECT * FROM ${USERS_TABLE}`);
  const user = users?.[0];

  const { data: messages } = useQuery<Message>(`SELECT * FROM ${MESSAGES_TABLE}`);

  const deleteMessage = async (id: string) => {
    await powersync.writeTransaction(async (tx) => {
      await tx.execute(`DELETE FROM ${MESSAGES_TABLE} WHERE id = ?`, [id]);
    });
  };

  const createMessage = async (message: string) => {
    const randomGroup = Math.random() > 0.5 ? 1 : 2;

    const result = await powersync.execute(
      `INSERT INTO ${MESSAGES_TABLE} (id, created_at, message, name, "group") VALUES (uuid(), datetime(), ?, ?, ?) RETURNING *`,
      [message, user.name, randomGroup]
    );
    const record = result.rows?.item(0);
    if (!record) {
      throw new Error('Failed to create message');
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
