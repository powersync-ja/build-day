import { usePowerSync, useQuery } from '@powersync/react';
import { Box, TextField, IconButton } from '@mui/material';
import React, { useEffect } from 'react';
import { NavigationPage } from '@/components/navigation/NavigationPage';
import { USERS_TABLE, Users } from '@/library/powersync/AppSchema';
import { useNavigate } from 'react-router-dom';
import { MESSAGES_ROUTE } from '../../router';
import AddIcon from '@mui/icons-material/Save';

export default function UserPage() {
  const powerSync = usePowerSync();
  const navigate = useNavigate();
  const { data: users } = useQuery<Users>('SELECT * FROM users');
  const user = users?.[0];
  const [name, setName] = React.useState('');

  const createUser = async (name: string) => {
    const res = await powerSync.execute(
      `INSERT INTO ${USERS_TABLE} (id, created_at, name) VALUES (uuid(), datetime(), ?) RETURNING *`,
      [name]
    );

    const resultRecord = res.rows?.item(0);
    if (!resultRecord) {
      throw new Error('Could not create user');
    }
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
