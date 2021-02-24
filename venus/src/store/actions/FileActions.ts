import axios from "axios";
import download from "downloadjs";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { API } from "../../constant/api";
import { _web_ } from "../../constant/platform";
import { downloadFile } from "../../healpers/downloadFile";
import { Actions } from "../../lib/actions";
import { AppThunk } from "../../lib/reduxTypes";

export const sendFile = (): AppThunk<Promise<any>> => {
  return async (_, getStore) => {
    const socketId = getStore().socket?.socket?.id;

    const data = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (data.type !== "success" || !socketId) return;

    try {
      const url = `${API}/upload-multipart`;
      if (!_web_)
        return FileSystem.uploadAsync(url, data.uri, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "test",
          parameters: {
            socketId,
          },
        });

      if (!data.file) return;
      const formData = new FormData();

      formData.append("test", data.file, data.name);
      const config = {
        headers: {
          "content-type": "multipart/form-data",
        },
      };
      await axios.post(url + `?socketId=${socketId}`, formData, config);
    } catch (error) {
      Alert.alert("Something went wrong", "Couldn't send the file");
      console.log(error.message);
    }
  };
};

export const setFile = ({
  filename,
  buffer,
  originalName,
}: {
  buffer?: Buffer;
  filename: string;
  originalName: string;
}): AppThunk<Promise<any>> => {
  return async (dispatch) => {
    if (_web_ && buffer) {
      const byteArray = new Uint8Array(buffer);
      return download(byteArray, originalName);
    }
    return dispatch({
      type: Actions.SET_FILE,
      payload: {
        url: `${API}/${filename}`,
        filename: originalName,
        serverFileName: filename,
      },
    });
  };
};

export const storeFile = (name: string): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    try {
      const store = getStore();
      const { uri } = await FileSystem.downloadAsync(
        store.file.url as string,
        FileSystem.documentDirectory + name
      );
      await downloadFile(uri);
      //   store.socket.socket?.emit("downloaded", store.file.serverFilename);
      // TODO:  we could emit to delete but other connected users wouldn't download it.
      dispatch({ type: Actions.RESET_FILE });
    } catch (e) {
      Alert.alert("Something went wrong", "Couldn't download the file", [
        {
          text: "Okay",
          onPress: () => {
            dispatch({ type: Actions.RESET_FILE });
          },
        },
      ]);
    }
  };
};

export const resetFile = () => ({
  type: Actions.RESET_FILE,
});
