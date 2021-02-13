import { BarCodeScanner } from "expo-barcode-scanner";
import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, createStore } from "redux";
import ReduxThunk from "redux-thunk";
import { NoPermissions } from "./components/NoPermissions";
import { AppNavigation } from "./navigation";
import { socketReducer } from "./store/reducers/SocketReducer";

const rootReducer = combineReducers({
  socket: socketReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  if (!hasPermission) return <NoPermissions />;

  return (
    <Provider store={store}>
      <AppNavigation />
    </Provider>
  );
}
