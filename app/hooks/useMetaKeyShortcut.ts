import { useEffect } from "react";

export function useMetaKeyShortcut(keys: Record<string, () => void>, cacheKeys: any[] = []) {
  useEffect(() => {
    const eventHandler = (event: KeyboardEvent) => {
      console.log((event));
      navigator.clipboard
      .read()
      .then(
        async (clipboardContents) => {
          console.log(clipboardContents);
          for (const item of clipboardContents) {
            console.log(item.types);
            if (!item.types.includes("image/png")) {
              return;
            }
            console.log(1);
            const blob = await item.getType("image/png");
            console.log(2);
            console.log(URL.createObjectURL(blob));
          }
        }
      ).catch(
        (error) => console.error(error.message)
      );
      if (
        Object.keys(keys).includes(`${event.key}`) && 
        event.metaKey &&
        keys[`${event.key}`] != null
      ) {
        keys[`${event.key}`]();
        event.preventDefault();
      }

      if (event.key === 'Escape' && keys[event.key] != null) {
        keys[`${event.key}`]();
        event.preventDefault();
      }
    }

    window.addEventListener('keydown', eventHandler);

    return () => {
      window.removeEventListener('keydown', eventHandler);
    }
  }, cacheKeys);
}
