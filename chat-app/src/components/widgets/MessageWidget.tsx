import React from 'react';
import { ListItem, IconButton, ListItemText, Box, Paper, styled, ListItemButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/DeleteOutline';

type Props = {
  name: string;
  message: string;
  isUserMessage: boolean;
  onDelete: () => void;
};

export const MessageWidget: React.FC<Props> = ({ name, message, isUserMessage, onDelete }) => {
  const backgroundColor = isUserMessage ? 'aa00ff' : undefined;
  const justifyContent = isUserMessage ? 'flex-end' : 'flex-start';
  const textAlign = isUserMessage ? 'right' : 'left';
  const left = isUserMessage ? undefined : '0.6rem';
  const right = isUserMessage ? '0.6rem' : undefined;

  return (
    <div style={{ width: '100%', justifyContent, display: 'flex' }}>
      <S.MainPaper
        elevation={1}
        sx={{
          backgroundColor,
          width: '90%',
          borderRadius: '10px',
          '&::after': {
            content: "''",
            display: 'inline-block',
            width: '1rem',
            height: '0.7rem',
            backgroundColor,
            position: 'absolute',
            bottom: '-0.7rem',
            left,
            right,
            clipPath: 'polygon(0 0, 100% 0, 50% 100%)'
          }
        }}
      >
        <ListItem>
          <ListItemButton>
            {isUserMessage ? (
              <Box>
                <IconButton edge="end" aria-label="delete" onClick={onDelete}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ) : undefined}
            <ListItemText primary={message} secondary={name} sx={{ textAlign }} />
          </ListItemButton>
        </ListItem>
      </S.MainPaper>
    </div>
  );
};

export namespace S {
  export const MainPaper = styled(Paper)`
    margin-bottom: 16px;
    position: relative;
  `;
}
