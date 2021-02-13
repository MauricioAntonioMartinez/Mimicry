import { BarCodeScannedCallback, BarCodeScanner } from "expo-barcode-scanner";
import * as Device from "expo-device";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { io, Socket } from "socket.io-client";

const ENDPOINT = "ws://192.168.1.19:3000";

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);
  const [response, setResponse] = useState();
  const [room, setRoom] = useState<string | null>();
  const [socket, setSocket] = useState<Socket | null>();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  useEffect(() => {
    const socket = io(ENDPOINT);
    setSocket(socket);
    socket.on("FromAPI", (data: any) => {
      setResponse(data);
    });
  }, []);

  const sendData = (id: string) => {
    if (socket) {
      setRoom(id);
      socket.emit("join", id);
      socket.emit("send", {
        room: id,
        data: {
          brand: Device.brand,
          manufacturer: Device.manufacturer,
          modelName: Device.modelName,
          productName: Device.productName,
          OS: Device.osName,
          name: Device.deviceName,
        },
      });
    }
  };

  const handleBarCodeScanned: BarCodeScannedCallback = ({ type, data }) => {
    setScanned(true);
    sendData(data);
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  const changeColor = (color: string) => {
    if (!socket) return;
    console.log(color);

    socket.emit("color", { room, color });
  };

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned && (
        <Button title={"Tap to Scan Again"} onPress={() => setScanned(false)} />
      )}
      {scanned && (
        <View>
          <View style={styles.color}>
            <Button
              color="red"
              title="Red"
              onPress={changeColor.bind(null, "red")}
            />
          </View>

          <View style={styles.color}>
            <Button
              color="green"
              title="Green"
              onPress={changeColor.bind(null, "green")}
            />
          </View>

          <View style={styles.color}>
            <Button
              color="blue"
              title="Blue"
              onPress={changeColor.bind(null, "blue")}
            />
          </View>

          <View style={styles.color}>
            <Button
              color="purple"
              title="Purple"
              onPress={changeColor.bind(null, "purple")}
            />
          </View>
        </View>
      )}
      <Text>{response}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  color: {
    marginTop: 10,
  },
});
