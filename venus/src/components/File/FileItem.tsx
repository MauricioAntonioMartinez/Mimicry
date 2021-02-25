import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constant/color";
import { Card } from "../ui/Card";

interface Props {
  name: string;
  size: number;
}

export const FileItem = (props: Props) => {
  return (
    <Card>
      <View style={styles.container}>
        <View style={styles.image}></View>
        <View style={styles.content}>
          <Text style={styles.fileName}>{props.name}</Text>
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
  image: {
    height: "70%",
  },
  content: {
    borderTopWidth: 1,
    borderTopColor: colors.secondary,
    padding: 5,
    height: "30%",
  },
  fileName: {
    fontSize: 28,
    color: colors.primary,
  },
});
