import mongoose from "mongoose";

type ClipBoard = string;

interface ClipBoardAttrs {
  clipBoard: ClipBoard[];
  owner: string; // it can be a user id or a room id
  refTo: "User" | "Room";
}

interface ClipBoardDoc extends mongoose.Document {
  id: string;
  clipBoard: ClipBoard[];
  owner: string;
  refTo: "User" | "Room";
}

interface ClipBoardModel extends mongoose.Model<ClipBoardDoc> {
  build(attrs: ClipBoardAttrs): ClipBoardDoc;
}

const ClipBoardSchema = new mongoose.Schema<ClipBoardDoc>(
  {
    clipBoards: {
      type: [String],
      default: [],
    },
    refTo: {
      type: String,
      required: true,
    },
    owner: {
      refPath: "refTo",
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

ClipBoardSchema.static("build", (attrs: ClipBoardAttrs) => {
  return new ClipBoard(attrs);
});

export const ClipBoard = mongoose.model<ClipBoardDoc, ClipBoardModel>(
  "ClipBoard",
  ClipBoardSchema
);
