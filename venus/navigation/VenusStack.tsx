import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { Screens, VenusStackParamList } from "../lib/navigationTypes";
import { Home } from "../screens/Home";

const VenusNavigationStack = createStackNavigator<VenusStackParamList>();

export const VenusStack = () => {
  return (
    <VenusNavigationStack.Navigator>
      <VenusNavigationStack.Screen
        options={{ title: "Venus App" }}
        component={Home}
        name={Screens.Home}
      />
    </VenusNavigationStack.Navigator>
  );
};
