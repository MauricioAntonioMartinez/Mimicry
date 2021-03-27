import React from "react";
import { Button, Image, StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../constant/color";
import { Preview } from "../../constant/previews";
import { File } from "../../models/File";
import * as fileActions from "../../store/actions/FileActions";
import { Card } from "../ui/Card";

interface Props {
  file: File;
}

export const FileItem = ({ file }: Props) => {
  console.log(file);

  const dispatch = useDispatch();

  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: file?.getUri() || Preview.unknown,
            }}
          />
        </View>
        <View style={styles.content}>
          <Text style={styles.fileName}>{file.name}</Text>
          <Button
            title="Download"
            onPress={() =>
              dispatch(fileActions.downloadFileHandler(file.filename))
            }
          />
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  fileContainer: {
    margin: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  container: {
    width: 300,
    height: 250,
  },
  imageContainer: {
    height: "70%",
    width: "100%",
  },
  image: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    padding: 5,
    height: "30%",
  },
  fileName: {
    fontSize: 22,
    color: colors.primary,
  },
});
