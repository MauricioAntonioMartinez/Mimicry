import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { HeaderButtons, Item } from "react-navigation-header-buttons";
import { useDispatch, useSelector } from "react-redux";
import { CustomHeaderButton } from "../components/ui/CustomHeaderButton";
import { colors } from "../constant/color";
import { _ios_, _web_ } from "../constant/platform";
import { Screens, VenusStackParamList } from "../lib/navigationTypes";
import { Home } from "../screens/Home";
import { RootStore } from "../store";
import * as authActions from "../store/actions/AuthActions";
import * as socketActions from "../store/actions/SocketActions";

const VenusNavigationStack = createStackNavigator<VenusStackParamList>();

export const VenusStack = () => {
  const isConnected = useSelector((store: RootStore) => store.socket.connected);
  const dispatch = useDispatch();

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
                iconName={_ios_ ? "ios-barcode" : "md-barcode"}
                onPress={() => {}}
              />
              {isConnected && (
                <Item
                  title="Sync Devices"
                  iconName={"sync-circle"}
                  onPress={() => {
                    if (isConnected) dispatch(authActions.syncApp());
                  }}
                />
              )}
              <Item
                title="Disconnect"
                iconName={isConnected ? "ios-ellipse" : "ios-ellipse"}
                color={isConnected ? "green" : "white"}
                onPress={() => {
                  if (isConnected) dispatch(socketActions.leaveSocket());
                }}
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
