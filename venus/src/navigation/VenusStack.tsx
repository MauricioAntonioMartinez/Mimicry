import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { CustomHeaderButton } from "../components/ui/CustomHeaderButton";
import { colors } from "../constant/color";
import { _ios_, _web_ } from "../constant/platform";
import { Screens, VenusStackParamList } from "../lib/navigationTypes";
import { Home } from "../screens/Home";

const VenusNavigationStack = createStackNavigator<VenusStackParamList>();

export const VenusStack = () => {
  return (
    <VenusNavigationStack.Navigator
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
                    onPress={() => {
                      navigation.toggleDrawer();
                    }}
                  />
                </HeaderButtons>
              );
            }
          : undefined,
        headerRight: () => {
          return (
            <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
              <Item
                title="Qr"
                iconName={_ios_ ? "ios-barcode" : "ios-barcode"}
                onPress={() => {}}
              />
            </HeaderButtons>
          );
        },
      })}
    >
      <VenusNavigationStack.Screen
        options={{ title: "Mimicry" }}
        component={Home}
        name={Screens.Home}
      />
    </VenusNavigationStack.Navigator>
  );
};
