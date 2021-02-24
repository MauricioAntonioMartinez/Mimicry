import React from "react";
import { Button as RNButton, StyleSheet, View } from "react-native";

interface Props {
  onPress(): void;
  title: string;
  color: string;
}

export const Button = (props: Props) => {
  return (
    <View style={styles.buttonContainer}>
      <RNButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    width: 100,
  },
});
