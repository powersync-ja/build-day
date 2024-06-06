import React from 'react';
import {
  ListItem,
  IconButton,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Box,
  Paper,
  styled,
  ListItemButton
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';
import ListIcon from '@mui/icons-material/ListAltOutlined';

type Props = {
  name: string;
  message: string;
  onDelete: () => void;
  onPress: () => void;
};

export const MessageWidget: React.FC<Props> = ({ name, message, onDelete }) => {
  return (
    <S.MainPaper elevation={1}>
      <ListItem
        disablePadding
        secondaryAction={
          <Box>
            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        }
      >
        <ListItemButton>
          <ListItemAvatar>
            <Avatar>
              <ListIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary={message} secondary={name} />
        </ListItemButton>
      </ListItem>
    </S.MainPaper>
  );
};

export namespace S {
  export const MainPaper = styled(Paper)`
    margin-bottom: 10px;
  `;
}
