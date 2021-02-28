import { v4 as uuidv4 } from "uuid";
import { wsServer } from "../..";
import { DeviceAttrs } from "../Device";
import { UserSchema } from "./User";

UserSchema.methods.filterDevices = function ({
  prevId,
  ...device
}: DeviceAttrs & { prevId: string }) {
  const newId = uuidv4();
  this.devices = this.devices.filter((d) => d.socketId !== prevId);
  device.pushToken = wsServer.socket.handshake.auth.token;
  this.devices.push({
    socketId: newId,
    device,
  });

  const devices = this.devices.map((d) => {
    Reflect.deleteProperty(d, "pushToken");
    return {
      id: d.socketId,
      ...d.device,
    };
  });
  return { devices, id: newId };
};

UserSchema.methods.filterFiles = function () {
  const filteredFiles = this.files.filter(
    (d) => new Date(d.expiration) > new Date()
  );
  this.files = filteredFiles;
  return this.files;
};

UserSchema.methods.addFile = function ({
  filename,
  size,
  mimetype,
}: {
  mimetype: string;
  size: number;
  filename: string;
}) {
  const expiration = new Date().getTime() + this.expirationType;
  const id = uuidv4();
  this.files.push({
    id,
    type: mimetype,
    size: size,
    filename: filename,
    expiration: new Date(expiration),
  });
  return { id, expiration };
};

UserSchema.methods.removeFile = function (id: string) {
  this.files = this.files.filter((f) => f.id !== id);
};
