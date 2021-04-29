import AppLoading from "expo-app-loading";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { NoPermissions } from "./components/ui/NoPermissions";
import { AppNavigation } from "./navigation";
import { authReducer } from "./store/reducers/AuthReducer";
import { clipBoardReducer } from "./store/reducers/ClipBoardReducer";
import { devicesReducer } from "./store/reducers/DevicesReducer";
import { fileReducer } from "./store/reducers/FileReducer";
import { socketReducer } from "./store/reducers/SocketReducer";

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
  clipBoard: clipBoardReducer,
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
      <AppNavigation />
    </Provider>
  );
}
