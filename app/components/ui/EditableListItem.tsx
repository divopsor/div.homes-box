'use client';

import { useState } from 'react';
import { Switch } from './Switch';
import { TextArea } from './TextArea';
import { ListItem } from './ListItem';
import { TxtButton } from './TxtButton';
import { Stack } from './Stack';

interface Buttons {
  [name: string]: (_: {
    text: string;
    setMode: (__: 'view' | 'edit') => void;
    setText: (__: string) => void;
  }) => void | Promise<void>;
}

interface EditableListItemProps {
  id: string;
  data: { id: string; contents: string, createdAt: number; updatedAt?: number };
  viewButtons: Buttons;
  editButtons?: Buttons;
}

export function EditableListItem({
  id,
  data,
  viewButtons,
  editButtons,
}: EditableListItemProps) {
  const [text, setText] = useState<string>(data.contents);
  const [mode, setMode] = useState<'view' | 'edit' | 'detail'>('view');

  return (
    <Switch
      value={mode}
      cases={{
        detail: (
          <ListItem
            style={{
              backgroundColor: 'gainsboro',
              padding: '6px',
              marginBottom: '12px',
              border: '1px solid #efefef',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
            }}
            left={
              <TextArea.View 
                style={{ alignItems: 'flex-start' }} 
                value={text} 
              />
            }
            right={Object.entries(viewButtons).map(([name, onClick]) => (
              <TxtButton
                key={name}
                style={{
                  paddingTop: '5px',
                  alignItems: 'flex-start'
                }}
                onClick={() => onClick({ text, setMode, setText })}
              >
                {name}
              </TxtButton>
            ))}
            bottom={
              <Stack.Horizontal style={{
              }}>
                <TextArea.View
                  style={{ 
                    textAlign: 'left',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    width: '50px',
                    fontWeight: 'bold',
                    textDecoration: 'underline'
                  }}
                  value={'▲ 접기'}
                  onClick={() => setMode('view')}
                />
                <TextArea.View
                  style={{ 
                    textAlign: 'right',
                    fontSize: '1rem',
                  }} 
                  value={new Date(data.updatedAt ?? data.createdAt).toLocaleString()} 
                />
              </Stack.Horizontal>
            }
          />
        ),
        view: (
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
                value={text.split('\n')[0]} 
                onClick={() => {
                  setMode('detail');
                }}
              />
            }
            right={Object.entries(viewButtons).map(([name, onClick]) => (
              <TxtButton
                key={name}
                style={{
                  paddingTop: '5px',
                  alignItems: 'flex-start'
                }}
                onClick={() => onClick({ text, setMode, setText })}
              >
                {name}
              </TxtButton>
            ))}
            bottom={
              null
            }
          />
        ),
        edit:
          editButtons == null ? null : (
            <ListItem
              style={{
                padding: '6px',
                marginBottom: '12px',
                border: '1px solid #efefef',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
              }}
              left={
                <TextArea
                  style={{
                    alignItems: 'flex-start',
                    border: 'white 1px solid',
                    borderBottom: '1px solid #c8c8c8',
                  }}
                  value={text}
                  setValue={setText}
                />
              }
              right={Object.entries(editButtons).map(([name, onClick]) => (
                <TxtButton
                  key={name}
                  style={{
                    alignItems: 'flex-start',
                    paddingTop: '5px',
                  }}
                  onClick={() => onClick({ text, setMode, setText })}
                >
                  {name}
                </TxtButton>
              ))}
            />
          ),
      }}
    />
  );
}
