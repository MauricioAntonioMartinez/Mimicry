import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import { colors } from "../../constant/color";
import { Device } from "../../lib/device";
import DeviceItem from "./DeviceItem";

interface Props {
  devices: Device[];
}

export const Devices = ({ devices }: Props) => {
  return (
    <View style={styles.devices}>
      <Text style={styles.devicesTitle}>Devices</Text>
      <FlatList
        keyExtractor={(item) => item.id}
        data={devices}
        renderItem={({ item }) => <DeviceItem device={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  devices: {
    width: "100%",
  },
  devicesTitle: {
    fontSize: 26,
    padding: 10,
    color: colors.primary,
  },
});
