import React from "react";
import { Platform, StyleSheet, View } from "react-native";
import FileView from "../components/File/FileView";
import { PickNameModal } from "../components/modals/PickName.native";
import SideBar from "../components/ui/SideBar";
import { _web_ } from "../constant/platform";

export const Home = () => {
  return (
    <View style={styles.screen}>
      {_web_ ? <SideBar /> : <PickNameModal />}
      <View style={styles.main}>
        <FileView />
        {/* <Controls /> */}
        {/* <Auth /> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: "100%",
    ...Platform.select({
      native: {},
      default: {
        flexDirection: "row",
      },
    }),
  },
  main: {
    ...Platform.select({
      native: {
        flex: 1,
      },
      default: {
        flex: 1,
      },
    }),
  },
});
