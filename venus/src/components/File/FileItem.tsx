import React from "react";
import { StyleSheet, Text } from "react-native";
import { Card } from "../ui/Card";

interface Props {
  name: string;
  size: number;
}

export const FileItem = (props: Props) => {
  return (
    <Card>
      <Text>{props.name}</Text>
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
});
