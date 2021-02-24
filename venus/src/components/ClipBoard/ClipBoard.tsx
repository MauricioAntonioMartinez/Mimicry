import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../constant/color";

interface Props {}

export const ClipBoard = (props: Props) => {
  return (
    <View style={styles.clipBoardContainer}>
      <Text style={styles.title}>Send to ClipBoard</Text>
      <View style={styles.actions}>
        <TextInput placeholder="https://www...." style={styles.input} />
        <View style={styles.button}>
          <Button color={colors.primary} onPress={() => {}} title="Send" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    padding: 10,
    color: colors.secondary,
  },
  clipBoardContainer: {
    flex: 1,
    width: "100%",
  },
  input: {
    padding: 5,
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: "black",
    width: "80%",
    height: 33,
  },
  actions: {
    flex: 1,
    width: "100%",
    flexDirection: "row",
  },
  button: {
    width: "20%",
  },
});
