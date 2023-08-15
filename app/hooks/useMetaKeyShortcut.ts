import { useEffect } from "react";

export function useMetaKeyShortcut(keys: Record<string, () => void>) {
  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      if (
        Object.keys(keys).includes(`${event.key}`) && 
        event.metaKey &&
        keys[`${event.key}`] != null
      ) {
        keys[`${event.key}`]();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', eventHandler);

    return () => {
      window.removeEventListener('keydown', eventHandler);
    }
  }, []);
}
