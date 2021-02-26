import React, { PropsWithChildren } from "react";
import { Platform, StyleSheet, TouchableOpacity } from "react-native";
import { _android_ } from "../../constant/platform";

export const Card: React.FC<PropsWithChildren<{}>> = ({ children }) => {
  let TouchableCmp: any = TouchableOpacity;
  if (_android_ && Platform.Version > 21) {
    TouchableCmp = TouchableOpacity;
  }

  return <TouchableCmp style={styles.container}>{children}</TouchableCmp>;
};

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      web: {
        borderWidth: 1,
        borderColor: "#ccc",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
    }),
  },
});
