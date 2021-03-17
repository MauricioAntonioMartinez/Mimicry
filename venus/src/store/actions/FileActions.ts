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
import { File, ReceivedFile } from "../../models/File";

export const sendFile = (): AppThunk<Promise<any>> => {
  return async (dispatch, getStore) => {
    const hostId = getStore().device.hostId;
    const file = getStore().file;

    const data = await DocumentPicker.getDocumentAsync({
      copyToCacheDirectory: true,
    });

    if (data.type !== "success" || !hostId) return;

    try {
      const { name } = data;
      const url = `${API}/upload-multipart`;
      let newFile = new File({
        id: file.id,
        filename: file.filename,
        name,
        size: file.size,
        type: file.type,
        expiration: file.expiration,
      });
      if (!_web_) {
        await FileSystem.uploadAsync(url, data.uri, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "test",
          parameters: {
            hostId,
          },
        });
      } else {
        if (!data.file) return;
        const formData = new FormData();
        formData.append("test", data.file, data.name);

        const res = await axios.post(url + `?hostId=${hostId}`, formData, {
          headers: {
            "content-type": "multipart/form-data",
          },
        });

        newFile.id = res.data.id;
        newFile.name = res.data.name;
        newFile.filename = res.data.filename;
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
  originalName,
  size,
  hostId,
  type,
  id,
  expiration,
}: ReceivedFile): AppThunk<Promise<any>> => {
  return async (dispatch, getState) => {
    const localHostId = getState().device.hostId;

    console.log(localHostId, hostId);

    if (localHostId === hostId) return;

    if (_web_) {
      const url = `${API}/${filename}`;
      const res = await axios.get(url, { responseType: "blob" });
      const didSave = await download(res.data, originalName);
      if (!didSave) return;
      return dispatch({
        type: Actions.ADD_FILE,
        payload: {
          file: new File({
            type,
            filename,
            id,
            name: originalName,
            size,
            expiration,
          }),
        },
      });
    }

    dispatch({
      type: Actions.SET_FILE,
      payload: {
        url: `${API}/${filename}`,
        filename: originalName,
        serverFileName: filename,
        size,
        id,
        type,
        expiration,
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
        expiration: file.expiration,
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
