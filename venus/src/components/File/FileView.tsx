import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constant/color";
import { FileControls } from "./FileControls";
import { Files } from "./Files";

interface Props {}

const FileView = (props: Props) => {
  return (
    <View style={styles.screen}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Your Files</Text>
      </View>
      <View style={styles.controls}>
        <FileControls />
      </View>
      <View style={styles.files}>
        <Files />
      </View>
    </View>
  );
};

export default FileView;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 32,
    color: colors.warning,
  },
  titleContainer: {
    padding: 20,
    height: 70,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  controls: {
    padding: 20,
    width: "100%",
    height: 60,
  },
  files: {
    height: "88%",
    padding: 10,
  },
});
