import React from "react";
import { StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Devices } from "../components/Device/Devices";
import { RootStore } from "../store";

export const DevicesScreen = () => {
  const devices = useSelector((state: RootStore) => state.device.devices);
  return <Devices devices={devices} />;
};

