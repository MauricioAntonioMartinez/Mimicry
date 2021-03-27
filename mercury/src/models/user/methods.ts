import { v4 as uuidv4 } from "uuid";
import { DeviceAttrs } from "../Device";
import { UserSchema } from "./User";

UserSchema.methods.filterDevices = function (device: DeviceAttrs) {
  const hostId = uuidv4();
  const prevId = device.id;
  if (prevId) this.devices = this.devices.filter((d) => d.id !== prevId);
  this.devices.push({
    ...device,
    id: hostId,
  });

  const devices = this.devices.map((d) => {
    const device = { ...d };
    Reflect.deleteProperty(device, "pushToken");
    return d;
  });
  return { devices, hostId };
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
  name,
  type,
}: {
  type: string;
  size: number;
  filename: string;
  name: string;
}) {
  const expiration = new Date().getTime() + this.expirationType;
  const id = uuidv4();
  this.files.push({
    id,
    type,
    size,
    filename,
    name,
    expiration: new Date(expiration),
  });
  return { id, expiration };
};

UserSchema.methods.removeFile = function (id: string) {
  this.files = this.files.filter((f) => f.id !== id);
};
