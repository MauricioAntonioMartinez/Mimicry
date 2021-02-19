import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const NoPermissions = () => {
  return (
    <View style={styles.screen}>
      <Text>You need to allow all permissions to use this app properly.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
