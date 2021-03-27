import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Platform, StyleSheet, TextInput, View } from "react-native";
import { useDispatch } from "react-redux";
import { Button } from "../components/ui/Button";
import { colors } from "../constant/color";
import * as authActions from "../store/actions/AuthActions";

WebBrowser.maybeCompleteAuthSession();

export const AuthScreen = () => {
  const dispatch = useDispatch();
  const [fields, setFields] = React.useState({ username: "", password: "" });
  const submitHandler = () => {
    dispatch(authActions.loginUser(fields));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <TextInput
          placeholder="Username"
          style={styles.input}
          onChangeText={(v) => setFields({ ...fields, username: v })}
        />
        <TextInput
          placeholder="Password"
          style={styles.input}
          onChangeText={(v) => setFields({ ...fields, password: v })}
        />
        <View style={styles.buttonWrapper}>
          <Button
            color={colors.primary}
            title="Login"
            onPress={submitHandler}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  input: {
    padding: 8,
    width: "100%",
    margin: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  buttonWrapper: {
    marginVertical: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: 10,
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
      },
      web: {
        width: "50%",
        borderWidth: 1,
        flex: 1 / 2,
        borderColor: "#ccc",
        boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px;",
      },
    }),
  },
});
