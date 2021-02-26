import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { _web_ } from "../../constant/platform";
import { useMediaQuery } from "../../hook/useMediQuery";
import { RootStore } from "../../store";
import { FileItem } from "./FileItem";

export const Files = () => {
  const items = useMediaQuery();
  const files = useSelector((state: RootStore) => state.file.files);
  return (
    <FlatList
      key={items}
      numColumns={_web_ ? items : 1}
      keyExtractor={({ id }) => id}
      data={files}
      renderItem={({ item }) => (
        <View style={styles.fileContainer}>
          <FileItem file={item} />
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  fileContainer: {
    margin: 10,
  },
});
