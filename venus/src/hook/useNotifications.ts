import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { useEffect, useState } from "react";
import { _web_ } from "../constant/platform";

export const useNotifications = () => {
  if (_web_) return;
  const [token, setToken] = useState<string | undefined>();
  useEffect(() => {
    (async () => {
      let token;
      const { status: initialStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      if (initialStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        if (status !== "granted") return;
      }
      const res = await Notifications.getExpoPushTokenAsync();
      token = res.data;
      setToken(token);
    })();
  }, []);

  return token;
};
