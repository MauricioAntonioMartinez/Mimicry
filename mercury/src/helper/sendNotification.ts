import Expo, { ExpoPushMessage } from "expo-server-sdk";
import { expo } from "../constants/expo";
import { DeviceAttrs } from "../models/Device";

export const sendNotifications = async (
  { body, title, data }: { title: string; body: string; data?: any },
  devices: DeviceAttrs [],
  id?: string
) => {
  const notifications = devices.reduce<ExpoPushMessage[]>(
    (messages, { id:deviceId,pushToken }) => {
      if (Expo.isExpoPushToken(pushToken) && id !== deviceId)
        messages.push({
          to: pushToken,
          body,
          title,
          data,
          sound: "default",
        } as ExpoPushMessage);

      return messages;
    },
    []
  );
  const chunks = expo.chunkPushNotifications(notifications);
  for (let chunk of chunks) {
    try {
      await expo.sendPushNotificationsAsync(chunk);
    } catch (error) {
      console.error(error);
    }
  }
};
