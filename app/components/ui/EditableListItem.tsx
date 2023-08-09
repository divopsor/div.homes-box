import { useState } from "react";
import { Switch } from "./Switch";
import { TextArea } from "./TextArea";
import { ListItem } from "./ListItem";
import { TxtButton } from "./TxtButton";

interface Buttons {
  [name: string]: (_: {
    text: string;
    setMode: (__: "view" | "edit") => void;
    setText: (__: string) => void;
  }) => void | Promise<void>;
}

interface EditableListItemProps {
  id: string;
  data: { id: string; contents: string };
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
  const [mode, setMode] = useState<"view" | "edit">("view");

  return (
    <Switch
      value={mode}
      cases={{
        view: (
          <ListItem
            css={{
              padding: '6px',
              marginBottom: '12px',
              border: '1px solid #efefef',
              boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
            }}
            left={<TextArea.View css={{alignItem: 'flex-start'}} value={text} />}
            right={Object.entries(viewButtons).map(([name, onClick]) => (
              <TxtButton
                key={name}
                css={{
                  paddingTop: '5px',
                  alignItem: 'flex-start'
                }}
                onClick={() => onClick({ text, setMode, setText })}
              >
                {name}
              </TxtButton>
            ))}
          />
        ),
        edit:
          editButtons == null ? null : (
            <ListItem
              css={{
                padding: '6px',
                marginBottom: '12px',
                border: '1px solid #efefef',
                boxShadow: 'rgba(0, 0, 0, 0.2) 0px 1px 2px 0px, rgba(0, 0, 0, 0.19) 0px 2px 5px 0px',
              }}
              left={
                <TextArea
                  css={{
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
                  css={{
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
