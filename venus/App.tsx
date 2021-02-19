import AppLoading from "expo-app-loading";
import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import { Provider, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { io } from "socket.io-client";
import { NoPermissions } from "./src/components/ui/NoPermissions";
import { AppNavigation } from "./src/navigation";
import { RootStore } from "./src/store";
import * as socketActions from "./src/store/actions/SocketActions";
import { devicesReducer } from "./src/store/reducers/DevicesReducer";
import { socketReducer } from "./src/store/reducers/SocketReducer";
const rootReducer = combineReducers({
  socket: socketReducer,
  device: devicesReducer,
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
  const token = useSelector((state: RootStore) => state.auth?.token);
  const tk = useRef(token);
  useEffect(() => {
    const socket = io(ENDPOINT, { auth: { token } });
    dispatch(socketActions.setSocket(socket));
  }, []);

  return <AppNavigation />;
};
