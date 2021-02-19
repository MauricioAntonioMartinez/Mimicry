import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../components/ui/CustomHeaderButton";
import { colors } from "../constant/color";
import { _web_ } from "../constant/platform";
import { Screens } from "../lib/navigationTypes";
import { DevicesScreen } from "../screens/DevicesScreen";

const DevicesNavigationStack = createStackNavigator();

export const DevicesStack = () => {
  return (
    <DevicesNavigationStack.Navigator
      screenOptions={({ navigation }) => ({
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTitleStyle: {
          color: colors.light,
        },
        headerLeft: !_web_
          ? () => {
              return (
                <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                  <Item
                    title="Menu"
                    iconName="ios-menu"
                    color={colors.light}
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              );
            }
          : undefined,
      })}
    >
      <DevicesNavigationStack.Screen
        options={{ title: "Connected Devices" }}
        component={DevicesScreen}
        name={Screens.Devices}
      />
    </DevicesNavigationStack.Navigator>
  );
};
