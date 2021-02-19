import mongoose from "mongoose";

export interface DeviceAttrs {
  name?: string;
  host?: string;
  type: "ios" | "android" | "windows" | "macos" | "web";
  osName: string;
  osVersion: string;
}

interface DeviceDoc extends mongoose.Document {
  name?: string;
  host?: string;
  type: "ios" | "android" | "windows" | "macos" | "web";
  osName: string;
  osVersion: string;
  owner: string;
}

interface DeviceModel extends mongoose.Model<DeviceDoc> {
  build(attrs: DeviceAttrs): DeviceDoc;
}

const deviceSchema = new mongoose.Schema<DeviceDoc>({
  name: { type: String, required: false },
  host: { type: String, required: false },
  type: {
    type: String,
    required: true,
    enum: ["ios", "android", "windows", "macos", "web"],
  },
  osName: {
    type: String,
    required: true,
  },
  osVersion: {
    type: String,
    required: true,
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
  },
});

deviceSchema.static("build", (attrs: DeviceAttrs) => {
  return new Device(attrs);
});

export const Device = mongoose.model<DeviceDoc, DeviceModel>(
  "Device",
  deviceSchema
);
