import { List } from '@mui/material';
import { MessageWidget } from './MessageWidget';

interface Props {
  user: any;
  messages: any[];
  onDelete: (id: string) => void;
}

export function MessagesWidget({ messages, user, onDelete }: Props) {
  return (
    <List dense={false}>
      {messages.map((message) => (
        <MessageWidget
          key={message.id}
          name={message.name ?? ''}
          isUserMessage={user?.name === message.name}
          message={message.message!}
          onDelete={() => onDelete(message.id)}
        />
      ))}
    </List>
  );
}
