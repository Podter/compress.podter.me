import { useCallback, useEffect } from "react";
import { toast } from "sonner";
import { useRegisterSW } from "virtual:pwa-register/react";

export function usePWA() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW();

  const closeToast = useCallback(() => {
    setOfflineReady(false);
    setNeedRefresh(false);
  }, [setOfflineReady, setNeedRefresh]);

  useEffect(() => {
    if (offlineReady) {
      toast("App ready to work offline", {
        id: "offline-ready",
        onDismiss: closeToast,
        onAutoClose: closeToast,
        action: {
          label: "Close",
          onClick: closeToast,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offlineReady]);

  useEffect(() => {
    if (needRefresh) {
      toast("New content available, click on reload button to update.", {
        id: "new-content",
        action: {
          label: "Reload",
          onClick: () => updateServiceWorker(true),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [needRefresh]);
}
