import { usePowerSync, useQuery } from '@powersync/react';
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
  styled
} from '@mui/material';
import Fab from '@mui/material/Fab';
import React from 'react';
import { NavigationPage } from '@/components/navigation/NavigationPage';
import { MessagesWidget } from '@/components/widgets/MessagesWidget';
import { MESSAGES_TABLE, USERS_TABLE, Users } from '@/library/powersync/AppSchema';
import { useConnector } from '@/components/providers/SystemProvider';

export default function MessagesPage() {
  const powerSync = usePowerSync();
  const { data: users } = useQuery<Users>('SELECT * FROM users');
  const user = users?.[0];

  const [showPrompt, setShowPrompt] = React.useState(false);
  const messageInputRef = React.createRef<HTMLInputElement>();

  const createMessage = async (message: string) => {
    const randomGroup = Math.random() < 0.5 ? 1 : 2;
    console.log("randomGroup", randomGroup)
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
      <Box>
        <S.FloatingActionButton onClick={() => setShowPrompt(true)}>
          <AddIcon />
        </S.FloatingActionButton>
        <Box>
          <MessagesWidget />
        </Box>
        <Dialog
          open={showPrompt}
          onClose={() => setShowPrompt(false)}
          PaperProps={{
            component: 'form',
            onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              await createMessage(messageInputRef.current!.value);
              setShowPrompt(false);
            }
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{'Create Todo List'}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">Write a message</DialogContentText>
            <TextField sx={{ marginTop: '10px' }} fullWidth inputRef={messageInputRef} label="Message" autoFocus />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setShowPrompt(false)}>Cancel</Button>
            <Button type="submit">Create</Button>
          </DialogActions>
        </Dialog>
      </Box>
    </NavigationPage>
  );
}

namespace S {
  export const FloatingActionButton = styled(Fab)`
    position: absolute;
    bottom: 20px;
    right: 20px;
  `;
}
