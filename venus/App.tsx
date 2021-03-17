import AppLoading from "expo-app-loading";
import { BarCodeScanner } from "expo-barcode-scanner";
import * as Notifications from "expo-notifications";
import React, { useEffect, useState } from "react";
import { Platform } from "react-native";
import { Provider, useDispatch } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { NoPermissions } from "./src/components/ui/NoPermissions";
import { AppNavigation } from "./src/navigation";
import * as authActions from "./src/store/actions/AuthActions";
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

const VenusApp = () => {
  const dispatch = useDispatch();
  // const username = useSelector((state: RootStore) => state.auth.user.username);
  useEffect(() => {
    (async () => {
      dispatch(authActions.setUser());
      // dispatch(deviceActions.setDevices());
    })();
  }, []);

  return <AppNavigation />;
};
