import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import React, { useEffect, useState } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { _web_ } from "../../constant/platform";
import { RootStore } from "../../store";
import * as socketActions from "../../store/actions/SocketActions";
import Qr from "../Qr";
import { Card } from "../ui/Card";

export const Controls = () => {
  const [scan, setScan] = useState(false);
  const dispatch = useDispatch();
  const numUsers = useSelector((state: RootStore) => state.device.qtyActive);
  const isConnected = useSelector((state: RootStore) => state.socket.connected);

  useEffect(() => {
    if (isConnected) {
      setScan(false);
    }
  }, [isConnected]);

  const filePickerHandler = async () => {
    const data = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });
    if (data.type === "success") {
      console.log(data);
      try {
        const url = "http://192.168.1.20:4000/upload-multipart";
        if (!_web_)
          await FileSystem.uploadAsync(url, data.uri, {
            uploadType: FileSystem.FileSystemUploadType.MULTIPART,
            fieldName: "test",
          });
        else {
          if (!data.file) return;
          const formData = new FormData();

          formData.append("test", data.file, data.name);
          const config = {
            headers: {
              "content-type": "multipart/form-data",
            },
          };
          await axios.post(url, formData, config);
        }
      } catch (error) {
        console.log(error.message);
      }
    }
  };

  const leaveHandler = () => {
    dispatch(socketActions.leaveSocket());
  };

  return (
    <Card>
      {scan && Qr ? (
        <Qr onData={() => {}} cancel={() => setScan(!scan)} />
      ) : (
        <View style={styles.controls}>
          <Text style={styles.scanTitle}>Scan QR Active({numUsers})</Text>
          {isConnected && (
            <Text style={styles.scanTitle}>Successfully connected</Text>
          )}
          <View style={styles.buttonContainer}>
            <Button title="Scan" color="red" onPress={() => setScan(true)} />
            <Button
              title="Pick File"
              color="blue"
              onPress={filePickerHandler}
            />

            <Button title="Leave" color="black" onPress={leaveHandler} />
          </View>
        </View>
      )}
    </Card>
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
