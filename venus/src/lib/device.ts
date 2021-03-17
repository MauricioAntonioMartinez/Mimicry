export interface Device {
  id: string;
  name: string | null;
  type: "ios" | "android" | "windows" | "macos" | "web";
  os: string;
  version: string | null;
}
