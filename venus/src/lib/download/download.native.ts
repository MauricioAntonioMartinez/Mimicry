import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";
import { API } from "../../constant/api";

export const downloadNative = async (filename: string, pickedName: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    const res = await FileSystem.downloadAsync(
      `${API}/${filename}`,
      FileSystem.documentDirectory + pickedName,
      {
        cache: false,
      }
    );
    const asset = await MediaLibrary.createAssetAsync(res.uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    Alert.alert("Success", "File was successfully downloaded!");
    return true;
  }
  return false;
};
