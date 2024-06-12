import { Box } from '@mui/material';
import React, { useState } from 'react';
import { NavigationPage } from '@/navigation/NavigationPage';
import { MessagesWidget } from '@/widgets/MessagesWidget';
import { AddMessageWidget } from '@/widgets/AddMessageWidget';

export default function MessagesPage() {
  // Basic user and messages data
  // Will be changed to use PowerSync
  const user = { name: 'John Doe' };
  const [messages, setMessages] = useState([{ id: '1', name: 'John Doe', message: 'Hello World' }]);

  const deleteMessage = async (id: string) => {
    setMessages((prev) => prev.filter((message) => message.id !== id));
  };

  const createMessage = async (message: string) => {
    setMessages((prev) => [...prev, { id: `${prev.length + 1}`, name: user.name, message }]);
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
