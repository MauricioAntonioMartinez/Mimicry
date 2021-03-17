import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { useSelector } from "react-redux";
import { RootStore } from "../store";
import { AuthStack } from "./AuthStack";
import { DrawerNavigator } from "./Drawer";

export const AppNavigation = () => {
  const isAuthenticated = useSelector(
    (state: RootStore) => state.auth.isAuthenticated
  );
  return (
    <NavigationContainer>
      {isAuthenticated ? <DrawerNavigator /> : <AuthStack />}
    </NavigationContainer>
  );
};
