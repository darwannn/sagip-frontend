import { useEffect } from "react";

export default function useUnsaveChangesWarning(condition: boolean) {
  useEffect(() => {
    const beforeUnloadHandler = (event: BeforeUnloadEvent) => {
      if (condition) {
        event.preventDefault();
        event.returnValue = true;
      }
    };
    window.addEventListener("beforeunload", beforeUnloadHandler);
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [condition]);
}
