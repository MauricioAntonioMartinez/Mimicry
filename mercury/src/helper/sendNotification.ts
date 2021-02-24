import Expo, { ExpoPushMessage } from "expo-server-sdk";
import { expo } from "../constants/expo";
import { DeviceAttrs } from "../models/Device";

export const sendNotifications = async (
  { body, title, data }: { title: string; body: string; data?: any },
  devices: { socketId: string; device: DeviceAttrs }[],
  socketId?: string
) => {
  const notifications = devices.reduce<ExpoPushMessage[]>(
    (messages, { device, socketId: sktId }) => {
      if (Expo.isExpoPushToken(device.pushToken) && socketId !== sktId)
        messages.push({
          to: device.pushToken,
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
