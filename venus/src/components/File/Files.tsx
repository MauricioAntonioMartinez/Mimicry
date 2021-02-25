import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { _web_ } from "../../constant/platform";
import { FileItem } from "./FileItem";

interface Props {}

const getNumItems = (width: number) => {
  let num = 1;

  if (width > 1600) num = 10;
  else if (width > 1200) num = 8;
  else if (width > 720) num = 6;
  else if (width > 420) num = 2;
  return num;
};

export const Files = (props: Props) => {
  const [items, setItems] = useState(
    getNumItems(Dimensions.get("screen").width)
  );
  useEffect(() => {
    const updateLayOut = (items: any) => {
      console.log(items)
      setItems(getNumItems(items.screen.width));
    };

    Dimensions.addEventListener("change", updateLayOut.bind(this));
    return Dimensions.removeEventListener("change", updateLayOut);
  });

  console.log(items);
  return (
    <FlatList
      numColumns={_web_ ? items : 1}
      keyExtractor={() => new Date().toString()}
      data={[1, 2, 3, 4, 5, 6, 7, 8]}
      renderItem={() => (
        <View style={styles.fileContainer}>
          <FileItem size={199} name="MyImage.png" />
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
