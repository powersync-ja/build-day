import { Box, TextField, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { NavigationPage } from '@/navigation/NavigationPage';
import { useNavigate } from 'react-router-dom';
import { MESSAGES_ROUTE } from '../../router';
import AddIcon from '@mui/icons-material/Save';
import { usePowerSync, useQuery } from '@powersync/react';
import { USERS_TABLE, Users } from '../../../powersync/AppSchema';

export default function UserPage() {
  const navigate = useNavigate();

  const powersync = usePowerSync();
  const { data: users } = useQuery<Users>(`SELECT * FROM ${USERS_TABLE}`);
  const user = users?.[0];

  const [name, setName] = React.useState('');

  const createUser = async (name: string) => {
    await powersync.execute(`INSERT INTO ${USERS_TABLE} (id, created_at, name) VALUES (uuid(), datetime(), ?)`, [name]);
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
