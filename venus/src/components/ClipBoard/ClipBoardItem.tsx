import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { colors } from "../../constant/color";

interface Props {
  clip: string;
}

export const ClipBoardItem = ({ clip }: Props) => {
  return (
    <View style={styles.clip}>
      <Text>{clip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clip: {
    width: "100%",
    padding: 8,
    borderWidth: 1,
    borderColor: colors.secondary,
  },
});
