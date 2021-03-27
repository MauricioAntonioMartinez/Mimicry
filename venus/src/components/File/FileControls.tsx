import React from "react";
import { StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../constant/color";
import * as fileActions from "../../store/actions/FileActions";
import { Button } from "../ui/Button";

export const FileControls = () => {
  const dispatch = useDispatch();
  return (
    <Button
      color={colors.primary}
      title="Send File"
      onPress={() => dispatch(fileActions.sendFile())}
    />
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
