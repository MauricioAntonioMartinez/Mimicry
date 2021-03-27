import axios from "axios";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { Alert } from "react-native";
import { API } from "../../constant/api";
import { _web_ } from "../../constant/platform";
import { Actions } from "../../lib/actions";
import downloadFile from "../../lib/download";
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

    const { name, type } = data;
    const url = `${API}/upload-multipart`;
    let newFile = new File({
      id: file.id,
      filename: file.filename,
      name,
      size: file.size,
      type,
      expiration: file.expiration,
    });

    try {
      if (!_web_) {
        const res = await FileSystem.uploadAsync(url, data.uri, {
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
          fieldName: "test",
          parameters: {
            hostId,
          },
        });
        newFile.type = res.mimeType || "";
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
        newFile.type = res.data.type;
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

    if (localHostId === hostId) return;

    if (_web_) {
      const didSave = await downloadFile(filename, originalName);
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
      console.log("STORE FILE");
      await downloadFile(store.file.serverFilename, name);
      console.log("FILE DOWNLOADED");

      const file = store.file;
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
      console.log(e.message);
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

export const downloadFileHandler = (filename: string): AppThunk<any> => {
  return async () => {
    try {
      await downloadFile(filename, filename);
      Alert.alert(
        "File successfully downloaded, check your file system storage"
      );
    } catch (error) {
      console.log(error.message);
      Alert.alert(
        "Something went wrong",
        "We couldn't download the image sorry."
      );
    }
  };
};

export const resetFile = () => ({
  type: Actions.RESET_FILE,
});
