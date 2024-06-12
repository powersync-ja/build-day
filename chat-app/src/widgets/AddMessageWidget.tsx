import React from 'react';
import { IconButton, Box, Paper, styled, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/SendOutlined';

type Props = {
  onPress: (message: string) => void;
};

export const AddMessageWidget: React.FC<Props> = ({ onPress }) => {
  const [message, setMessage] = React.useState('');

  const handleOnSendClicked = () => {
    onPress(message);
    setMessage('');
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleOnSendClicked();
    }
  };

  return (
    <S.MainPaper elevation={1}>
      <Box
        display={'flex'}
        flexDirection={'row'}
        sx={{ marginTop: '50px' }}
        justifyContent={'space-between'}
        alignItems={'center'}
      >
        <TextField
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          label="Type a message"
          onKeyDown={handleKeyPress}
          fullWidth
          autoFocus
        />
        <IconButton aria-label="delete" onClick={handleOnSendClicked}>
          <SendIcon color="primary" />
        </IconButton>
      </Box>
    </S.MainPaper>
  );
};

export namespace S {
  export const MainPaper = styled(Paper)`
    margin-bottom: 10px;
  `;
}
