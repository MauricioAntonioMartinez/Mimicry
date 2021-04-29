import mongoose from "mongoose";

interface RoomAttrs {
  users: mongoose.Types.ObjectId[];
  owner: string;
}

interface RoomDoc extends mongoose.Document {
  id: string;
  users: mongoose.Types.ObjectId[];
}

interface RoomModel extends mongoose.Model<RoomDoc> {
  build(attrs: RoomAttrs): RoomDoc;
}

const RoomSchema = new mongoose.Schema<RoomDoc>(
  {
    users: {
      type: [String],
      default: [],
    },
    owner: {
      ref: "User",
      type: mongoose.Types.ObjectId,
      required: true,
    },
  },
  {
    toObject: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete doc._id;
        delete ret._id;
      },
    },
    toJSON: {
      transform: function (doc, ret) {
        ret.id = ret._id;
        delete doc._id;
        delete ret._id;
      },
    },
  }
);

RoomSchema.static("build", (attrs: RoomAttrs) => {
  return new Room(attrs);
});

export const Room = mongoose.model<RoomDoc, RoomModel>("Room", RoomSchema);
