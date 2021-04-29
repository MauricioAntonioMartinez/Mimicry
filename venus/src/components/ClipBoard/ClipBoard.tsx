import React, { useState } from "react";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { colors } from "../../constant/color";
import * as clipBoardActions from "../../store/actions/ClipBoardActions";
import { ClipBoardHistory } from "./ClipBoardHistory";

interface Props {}

export const ClipBoard = (props: Props) => {
  const [clip, setClip] = useState("");
  const dispatch = useDispatch();

  const sendClipHandler = () => dispatch(clipBoardActions.sendClipBoard(clip));

  return (
    <View style={styles.clipBoardContainer}>
      <Text style={styles.title}>Send to ClipBoard</Text>
      <View style={styles.actions}>
        <TextInput
          placeholder="https://www...."
          style={styles.input}
          onChangeText={(c) => setClip(c)}
          value={clip}
        />
        <View style={styles.button}>
          <Button
            color={colors.primary}
            onPress={sendClipHandler}
            title="Send"
          />
        </View>
      </View>
      <ClipBoardHistory />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    padding: 10,
    color: colors.secondary,
  },
  clipBoardContainer: {
    flex: 1,
    width: "100%",
  },
  input: {
    padding: 5,
    backgroundColor: colors.light,
    borderWidth: 0.5,
    borderColor: "black",
    width: "80%",
    height: 33,
  },
  actions: {
    width: "100%",
    height: "40px",
    flexDirection: "row",
  },
  button: {
    width: "20%",
  },
});
