import mongoose from "mongoose";
import { DeviceAttrs } from "./Device";

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
        // type: mongoose.Types.ObjectId,
        // ref: "Device",
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
});

UserSchema.static("build", (attrs: UserAttrs) => {
  return new User(attrs);
});

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
