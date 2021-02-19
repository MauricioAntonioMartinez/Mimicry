import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { DrawerNavigator } from "./Drawer";

export const AppNavigation = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  );
};
