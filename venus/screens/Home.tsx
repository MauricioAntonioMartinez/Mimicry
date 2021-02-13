import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { ReadQR } from "../components/ReadQR";
import { RootStore } from "../store";
import * as socketActions from "../store/actions/SocketActions";

export const Home = () => {
  const [scan, setScan] = useState(false);
  const dispatch = useDispatch();
  const isConnected = useSelector((state: RootStore) => state.socket.connected);

  useEffect(() => {
    if (isConnected) {
      setScan(false);
    }
  }, [isConnected]);

  const connectToDesktopHandler = (deskId: string) =>
    dispatch(socketActions.connectToDesktop(deskId));

  return (
    <View style={styles.screen}>
      {scan ? (
        <ReadQR
          onData={connectToDesktopHandler}
          cancel={() => setScan(!scan)}
        />
      ) : (
        <View style={styles.controls}>
          <Text style={styles.scanTitle}>Scan QR </Text>
          {isConnected && (
            <Text style={styles.scanTitle}>Successfully connected</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button color="red" title="scan" onPress={() => setScan(true)} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  scanTitle: {
    fontSize: 22,
    marginVertical: 10,
  },
  controls: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonContainer: {
    width: 150,
  },
});
