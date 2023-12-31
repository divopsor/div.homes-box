'use client';

import { useContext } from 'react';
import { TextArea } from './TextArea';
import { ListItem } from './ListItem';
import { TxtButton } from './TxtButton';
import { AuthContext } from '../../providers';

interface Buttons {
  [name: string]: () => void | Promise<void>;
}

interface EditableListItemProps {
  data: { id: string; contents: string, createdAt: number; updatedAt?: number };
  viewButtons: Buttons;
  editButtons?: Buttons;
  onClick?: (data: EditableListItemProps['data']) => void;
}

export function EditableListItem({
  data,
  viewButtons,
  onClick,
}: EditableListItemProps) {
  const auth = useContext(AuthContext);
  const contents = data.contents.split('\n');

  return (
    <ListItem
      style={{
        padding: '6px',
        marginBottom: '12px',
        border: '1px solid #efefef',
        boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
      }}
      left={
        <TextArea.View 
          style={{ alignItems: 'flex-start', cursor: 'pointer' }} 
          value={`${contents[0]}${contents[1] == null ? '' : `\n${contents[1]}`}`} 
          onClick={() => {
            onClick?.(data);
          }}
        />
      }
      right={(
        auth ? Object.entries(viewButtons).map(([name, onClick]) => (
          <TxtButton
            key={name}
            style={{
              paddingTop: '5px',
              alignItems: 'flex-start'
            }}
            onClick={() => onClick()}
          >
            {name}
          </TxtButton>
        )) : null
      )}
      bottom={
        null
      }
    />
  );
}
