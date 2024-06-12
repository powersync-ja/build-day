import { Box, TextField, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { NavigationPage } from '@/navigation/NavigationPage';
import { useNavigate } from 'react-router-dom';
import { MESSAGES_ROUTE } from '../../router';
import AddIcon from '@mui/icons-material/Save';

export default function UserPage() {
  const navigate = useNavigate();
  const user = { name: 'John Doe' };
  const [name, setName] = React.useState('');

  const createUser = async (name: string) => {
    // TO BE IMPLEMENTED
  };

  useEffect(() => {
    if (user) {
      navigate(MESSAGES_ROUTE);
    }
  }, [user]);

  return (
    <NavigationPage title="User">
      <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} flexDirection={'row'}>
        <TextField label="Enter your name" fullWidth onChange={(event) => setName(event.target.value)} autoFocus />
        <IconButton disabled={name.length < 3} onClick={() => createUser(name)}>
          <AddIcon color="primary" sx={{ fontSize: 40 }} />
        </IconButton>
      </Box>
    </NavigationPage>
  );
}
