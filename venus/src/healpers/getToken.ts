import * as Notifications from "expo-notifications";
import * as Permissions from "expo-permissions";
import { _web_ } from "../constant/platform";

export const getToken = async () => {
  if (_web_) return;
  const { status: initialStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  if (initialStatus !== "granted") {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    if (status !== "granted") return;
  }
  const res = await Notifications.getExpoPushTokenAsync();
  return res.data;
};
