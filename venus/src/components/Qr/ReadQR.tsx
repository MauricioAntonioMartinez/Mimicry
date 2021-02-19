import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import React, { useState } from "react";
import { Button, StyleSheet, View } from "react-native";

interface Props {
  onData(room: string): void;
  cancel(): void;
}

export const ReadQR = ({ onData, cancel }: Props) => {
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    onData(data);
  };

  return (
    <View style={styles.screen}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      <Button title="Cancel" onPress={cancel} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
});
