import { Platform } from "react-native";
import { ReadQR } from "./ReadQR";
import ShowQR from "./ShowQR";

export default Platform.select({
  web: ShowQR,
  native: ReadQR,
});
