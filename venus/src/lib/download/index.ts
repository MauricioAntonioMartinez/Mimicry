import { Platform } from "react-native";
import { downloadNative } from "./download.native";
import { downloadWeb } from "./download.web";

export default Platform.select({
  web: downloadWeb,
  native: downloadNative,
  default: downloadWeb,
});
