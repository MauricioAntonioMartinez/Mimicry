import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "../../constant/color";
import { Button } from "../ui/Button";

export const FileControls = () => {
  return (
    <Button color={colors.secondary} title="Send File" onPress={() => {}} />
  );
};

const styles = StyleSheet.create({
  controlsContainer: {
    width: "100%",
    height: "20%",
    padding: 10,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});
