import AppLoading from "expo-app-loading";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { io } from "socket.io-client";
import { NoPermissions } from "./src/components/ui/NoPermissions";
import { getToken } from "./src/healpers/getToken";
import { AppNavigation } from "./src/navigation";
import { RootStore } from "./src/store";
import * as authActions from "./src/store/actions/AuthActions";
import * as deviceActions from "./src/store/actions/DeviceActions";
import * as socketActions from "./src/store/actions/SocketActions";
import { authReducer } from "./src/store/reducers/AuthReducer";
import { devicesReducer } from "./src/store/reducers/DevicesReducer";
import { fileReducer } from "./src/store/reducers/FileReducer";
import { socketReducer } from "./src/store/reducers/SocketReducer";

Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldShowAlert: true,
      shouldPlaySound: true,
      shouldSetBadge: true,
    };
  },
});

const rootReducer = combineReducers({
  socket: socketReducer,
  device: devicesReducer,
  auth: authReducer,
  file: fileReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      setLoading(false);
      if (Platform.OS !== "web") {
        const { status } = await BarCodeScanner.requestPermissionsAsync();
        setHasPermission(status === "granted");
      }
    })();
  }, []);

  if (loading) return <AppLoading />;

  if (!hasPermission && Platform.OS !== "web") return <NoPermissions />;

  return (
    <Provider store={store}>
      <VenusApp />
    </Provider>
  );
}

const ENDPOINT = "ws://192.168.1.19:4000";

const VenusApp = () => {
  const dispatch = useDispatch();
  const username = useSelector((state: RootStore) => state.auth.user.username);
  useEffect(() => {
    (async () => {
      const token = await getToken();
      const socket = io(ENDPOINT, { auth: { token, username } });
      dispatch(socketActions.setSocket(socket));
      dispatch(authActions.setUser());
      dispatch(deviceActions.setDevices());
      return () => dispatch(socketActions.leaveSocket());
    })();
  }, [username]);

  return <AppNavigation />;
};
