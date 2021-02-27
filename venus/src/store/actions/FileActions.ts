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
import { File } from "../../models/File";

export const sendFile = (): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const socketId = getStore().socket?.socket?.id;
    const file = getStore().file;

    const data = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (data.type !== "success" || !socketId) return;

    try {
      const url = `${API}/upload-multipart`;
      const newFile = new File({
        id: file.id,
        filename: file.filename,
        name: file.filename,
        size: file.size,
        type: file.type,
      });
      if (!_web_)
        await FileSystem.uploadAsync(url, data.uri, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "test",
          parameters: {
            socketId,
          },
        });
      else {
        if (!data.file) return;
        const formData = new FormData();
        formData.append("test", data.file, data.name);

        await axios.post(url + `?socketId=${socketId}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });
        console.log("THIS TRIGGERS");
      }

      dispatch({
        type: Actions.ADD_FILE,
        payload: {
          file: newFile,
        },
      });
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
  size,
  id,
  type,
}: {
  buffer?: Buffer;
  filename: string;
  originalName: string;
  size: number;
  type: string;
  id: string;
}): AppThunk<Promise<any>> => {
  return async (dispatch) => {
    if (_web_ && buffer) {
      const byteArray = new Uint8Array(buffer);
      dispatch({
        type: Actions.ADD_FILE,
        payload: {
          file: new File({ type, filename, id, name: originalName, size }),
        },
      });
      return download(byteArray, originalName);
    }
    console.log(filename);
    return dispatch({
      type: Actions.SET_FILE,
      payload: {
        url: `${API}/${filename}`,
        filename: originalName,
        serverFileName: filename,
        size,
        id,
        type,
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
      const file = store.file;
      await downloadFile(uri);
      const newFile = new File({
        id: file.id,
        filename: file.filename as string,
        name: file.filename,
        size: file.size,
        type: file.type,
      });
      dispatch({ type: Actions.RESET_FILE });
      dispatch({
        type: Actions.ADD_FILE,
        payload: {
          file: newFile,
        },
      });
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
