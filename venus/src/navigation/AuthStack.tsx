import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { colors } from "../constant/color";
import { AuthStackParamList, Screens } from "../lib/navigationTypes";
import { AuthScreen } from "../screens/Auth";

const AuthNavigationStack = createStackNavigator<AuthStackParamList>();

export const AuthStack = () => {
  return (
    <AuthNavigationStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.light,
        },
      })}
    >
      <AuthNavigationStack.Screen
        options={{ title: "Welcome to mimicry" }}
        component={AuthScreen}
        name={Screens.Auth}
      />
    </AuthNavigationStack.Navigator>
  );
};
