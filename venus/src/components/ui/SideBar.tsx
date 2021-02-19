import React from "react";
import { StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";
import { ClipBoard } from "../ClipBoard/ClipBoard";
import { Devices } from "../Device/Devices";

const SideBar = () => {
  const devices = useSelector((state: RootStore) => state.device.devices);
  return (
    <View style={styles.sideBar}>
      <ClipBoard />
      <Devices devices={devices} />
    </View>
  );
};

export default SideBar;

const styles = StyleSheet.create({
  sideBar: {
    justifyContent: "space-between",
    alignItems: "center",
    borderRightWidth: 1,
    borderColor: "#ccc",
    paddingVertical: 20,
    width: 300,
  },
  devices: {
    width: "100%",
  },
  devicesTitle: {
    fontSize: 26,
    padding: 10,
  },
});
