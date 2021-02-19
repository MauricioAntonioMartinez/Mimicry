import React, { PropsWithChildren } from "react";
import { Platform, StyleSheet, View, ViewStyle } from "react-native";

export const Card: React.FC<PropsWithChildren<{ style?: ViewStyle }>> = ({
  children,
  style,
}) => {
  console.log(style);
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    padding: 10,

    ...Platform.select({
      android: {
        elevation: 1,
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
        borderRightWidth: 1,
        backgroundColor: "red",
      },
    }),
  },
});
