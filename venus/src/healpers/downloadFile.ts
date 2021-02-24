import * as MediaLibrary from "expo-media-library";
import { Alert } from "react-native";

export const downloadFile = async (uri: string) => {
  const { status } = await MediaLibrary.requestPermissionsAsync();
  if (status === "granted") {
    const asset = await MediaLibrary.createAssetAsync(uri);
    await MediaLibrary.createAlbumAsync("Download", asset, false);
    Alert.alert("Success", "File was successfully downloaded!");
  }
};
