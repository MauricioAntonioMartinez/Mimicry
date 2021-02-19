import { Ionicons } from "@expo/vector-icons";
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import { colors } from "../constant/color";
import { _android_ } from "../constant/platform";
import { RootDrawerParamList, Screens } from "../lib/navigationTypes";
import { DevicesStack } from "./DevicesNavigation";
import { VenusStack } from "./VenusStack";

const Drawer = createDrawerNavigator<RootDrawerParamList>();

export const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={Screens.Home}
      drawerContentOptions={{ activeTintColor: colors.secondary }}
    >
      <Drawer.Screen
        name={Screens.Home}
        component={VenusStack}
        options={({ navigation }) => ({
          drawerIcon: ({ color }) => (
            <Ionicons
              name={_android_ ? "md-headset" : "ios-headset"}
              size={23}
              color={color}
            />
          ),
        })}
      />
      <Drawer.Screen
        name={Screens.Devices}
        component={DevicesStack}
        options={({ navigation }) => ({
          drawerIcon: ({ color }) => (
            <Ionicons name={"desktop-sharp"} size={23} color={color} />
          ),
        })}
      />
    </Drawer.Navigator>
  );
};
