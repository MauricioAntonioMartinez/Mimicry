import mongoose from "mongoose";
import { wsServer } from "..";
import { Device, DeviceAttrs } from "./Device";
import { File } from "./File";

interface UserAttrs {
  name: string;
  username: string;
  roomId: string;
}

export interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  roomId: string;
  devices: { socketId: string; device: DeviceAttrs }[];
  files: File[];
  filterDevices(props: DeviceAttrs & { prevId: string }): Device[];
  filterFiles(): void;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attrs: UserAttrs): UserDoc;
}

const UserSchema = new mongoose.Schema<UserDoc>({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  roomId: {
    type: String,
    required: true,
  },
  devices: [
    {
      socketId: String,
      device: {
        name: { type: String, required: false },
        type: {
          type: String,
          required: true,
          enum: ["ios", "android", "windows", "macos", "web"],
        },
        os: {
          type: String,
          required: true,
        },
        version: {
          type: String,
          required: true,
        },
        pushToken: String,
      },
    },
  ],
  files: [
    {
      filename: String,
      id: String,
      name: String,
      size: Number,
      type: String,
      expiration: Date,
    },
  ],
});

UserSchema.methods.filterDevices = function ({
  prevId,
  ...device
}: DeviceAttrs & { prevId: string }) {
  this.devices = this.devices.filter((d) => d.socketId !== prevId);
  device.pushToken = wsServer.socket.handshake.auth.token;
  this.devices.push({
    socketId: wsServer.socket.id,
    device,
  });

  const devices = this.devices.map((d) => {
    Reflect.deleteProperty(d, "pushToken");
    return {
      id: d.socketId,
      ...d.device,
    };
  });
  return devices;
};

UserSchema.methods.filterFiles = function () {
  const filteredFiles = this.files.filter((d) => d.expiration > new Date());
  this.files = filteredFiles;
  return this.files;
};

UserSchema.static("build", (attrs: UserAttrs) => {
  return new User(attrs);
});

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
