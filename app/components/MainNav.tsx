import { Stack } from "./ui/Stack";

export function MainNav() {
  return (
    <Stack.Horizontal align="space-between">
      <h1>Getting Things Done</h1>

      <Stack.Horizontal align="right">
        <h4
          css={{
            marginRight: '10px',
          }}
        >
          guest
        </h4>

        <button
          onClick={() => {}}
          css={{
            border: 'unset',
            background: 'unset',
            wordBreak: 'keep-all',
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
        >
          로그인
        </button>
      </Stack.Horizontal>
    </Stack.Horizontal>
  );
}
