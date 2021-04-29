import express from "express";
import { Room } from "../models/room/model";
import { User } from "../models/user/User";

export const roomRouter = express.Router();

roomRouter.get("/rooms", async (req, res) => {
  const user = await User.findOne({ username: "mcuve" });
  if (!user) return;
  const rooms = await Room.find({ owner: user._id });
  console.log(rooms);
  return res.status(200).json(rooms);
});

roomRouter.post("/rooms", async (req, res) => {
  const user = await User.findOne({ username: "mcuve" });

  if (!user) throw new Error("User not found.");

  const room = await Room.build({ owner: user._id, users: [] }).save();

  return res.status(201).json(room);
});
