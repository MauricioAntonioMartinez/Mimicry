import mongoose from "mongoose";

interface UserAttrs {
  name: string;
  username: string;
  roomId: string;
}

interface UserDoc extends mongoose.Document {
  name: string;
  username: string;
  roomId: string;
  devices: { device: string; active: boolean }[];
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
      deviceId: {
        type: mongoose.Types.ObjectId,
        ref: "Device",
      },
      active: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

UserSchema.static("build", (attrs: UserAttrs) => {
  return new User(attrs);
});

export const User = mongoose.model<UserDoc, UserModel>("User", UserSchema);
