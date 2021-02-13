import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { io } from "socket.io-client";
import * as socketActions from "../store/actions/SocketActions";
import { VenusStack } from "./VenusStack";

const ENDPOINT = "ws://192.168.1.19:3000";

export const AppNavigation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const socket = io(ENDPOINT);
    dispatch(socketActions.setSocket(socket));
  }, []);

  return (
    <NavigationContainer>
      <VenusStack />
    </NavigationContainer>
  );
};
