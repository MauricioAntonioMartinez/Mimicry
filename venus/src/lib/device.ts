export interface Device {
  id: string;
  name?: string;
  host?: string;
  type: "ios" | "android" | "windows" | "macos" | "web";
  os: string;
  version: string;
}
