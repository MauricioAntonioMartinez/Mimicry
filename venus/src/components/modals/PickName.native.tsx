import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { useDispatch, useSelector } from "react-redux";
import { colors } from "../../constant/color";
import { RootStore } from "../../store";
import * as fileActions from "../../store/actions/FileActions";
import { Button } from "../ui/Button";

interface Props {}

export const PickNameModal = (props: Props) => {
  const shouldPickName = useSelector(
    (state: RootStore) => state.file.shouldPickName
  );
  const name = useSelector((state: RootStore) => state.file.filename);
  const [filename, setFileName] = useState<string | undefined>();
  const dispatch = useDispatch();

  useEffect(() => {
    if (name) setFileName(name);
  }, [name]);

  const saveHandler = () => {
    if (!filename?.trim() || !filename.match(/\.[0-9a-z]+$/i)) {
      return Alert.alert(
        "Error",
        "file should not be empty or have and the extension"
      );
    }
    dispatch(fileActions.storeFile(filename));
  };

  const cancelDownloadHandler = () => dispatch(fileActions.resetFile());

  return (
    <Modal
      backdropOpacity={0.8}
      animationIn="zoomInDown"
      animationOut="zoomOutUp"
      animationInTiming={600}
      animationOutTiming={600}
      backdropTransitionInTiming={600}
      backdropTransitionOutTiming={600}
      isVisible={shouldPickName}
      onBackdropPress={cancelDownloadHandler}
      onBackButtonPress={cancelDownloadHandler}
    >
      <View style={styles.content}>
        <Text style={styles.contentTitle}>Set the file name 🚀</Text>
        <TextInput
          value={filename}
          onChangeText={(text) => setFileName(text)}
          style={styles.input}
          placeholder="file.png"
        />
        <View style={styles.buttons}>
          <Button
            color={colors.primary}
            onPress={cancelDownloadHandler}
            title="Close"
          />
          <Button color={colors.secondary} onPress={saveHandler} title="Save" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: "white",
    padding: 22,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 12,
  },
  buttons: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
  },
  input: {
    marginVertical: 15,
    fontSize: 18,
    borderRadius: 4,
    borderColor: "rgba(0, 0, 0, 0.1)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderWidth: 2,
    minWidth: 200,
  },
});
