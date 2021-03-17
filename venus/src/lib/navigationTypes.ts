export enum Screens {
  Home = "home",
  Config = "config",
  Devices = "devices",
  Auth = "auth",
  Qr = "Qr",
}

export type VenusStackParamList = {
  [Screens.Home]: undefined;
  [Screens.Config]: undefined;
  [Screens.Qr]: undefined;
};

export type AuthStackParamList = {
  [Screens.Auth]: undefined;
};

export type RootDrawerParamList = {
  [Screens.Home]: undefined;
  [Screens.Devices]: undefined;
};
