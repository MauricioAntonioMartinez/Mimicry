import React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { colors } from "../../constant/color";
import { _android_, _web_ } from "../../constant/platform";
import { Device } from "../../lib/device";

interface Props {
  device: Device;
}

const DeviceItem = ({ device }: Props) => {
  let TouchableCmp: any = TouchableOpacity;
  if (_android_ && Platform.Version > 21) {
    TouchableCmp = TouchableOpacity;
  }

  const isWeb = device.type === "web";

  console.log(device);
  return (
    <TouchableCmp style={styles.item}>
      <View style={styles.main}>
        <View style={styles.active}></View>
        <Text style={styles.name}>
          {isWeb ? device.os : device.name}
          <Text style={styles.nameLight}>
            {` `}
            {isWeb ? device.version : device.type}
          </Text>
        </Text>
      </View>
      {/* {device.type !== "web" && (
        <View style={styles.osContainer}>
          <Text style={styles.os}>
            {device.os}
            <Text style={styles.version}>{device.version}</Text>
          </Text>
        </View>
      )} */}
    </TouchableCmp>
  );
};

export default DeviceItem;
const styles = StyleSheet.create({
  main: {
    justifyContent: "space-between",
    width: "100%",
  },
  active: {
    width: 12,
    height: 12,
    borderRadius: 12 / 2,
    backgroundColor: "red",
    marginBottom: _web_ ? 3 : 0,
  },
  name: {
    fontSize: 24,
    color: colors.primary,
  },
  nameLight: {
    fontSize: 12,
    color: colors.secondary,
  },
  osContainer: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
  os: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
  },
  version: {
    fontSize: 12,
    color: colors.primary,
  },
  item: {
    padding: 10,
    flex: 1,
    justifyContent: "space-between",
    // textAlignVertical: "center",
    borderColor: "black",
    ...Platform.select({
      native: {
        margin: 5,
        padding: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 4,
      },
      default: {
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightColor: "red",
        borderRightWidth: 10,
        width: "100%",
      },
    }),
  },
});
