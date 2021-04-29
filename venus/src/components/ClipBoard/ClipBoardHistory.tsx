import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useSelector } from "react-redux";
import { RootStore } from "../../store";
import { ClipBoardItem } from "./ClipBoardItem";

interface Props {}

export const ClipBoardHistory = (props: Props) => {
  const clips = useSelector((state: RootStore) => state.clipBoard.clips);
  return (
    <View style={styles.history}>
      <FlatList
        data={clips}
        renderItem={({ item }) => <ClipBoardItem clip={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  history: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
