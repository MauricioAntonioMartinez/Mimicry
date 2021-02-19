import QRCode from "qrcode.react";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";

interface Props {}

const ShowQR = (props: Props) => {
  useEffect(() => {}, []);

  return (
    <View style={styles.screen}>
      <Text>This a qr show only in web</Text>
      <QRCode value="This is a test" />
    </View>
  );
};

export default ShowQR;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
