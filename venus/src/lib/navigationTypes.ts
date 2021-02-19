export enum Screens {
  Home = "home",
  Config = "config",
  Devices = "devices",
  Qr = "Qr",
}

export type VenusStackParamList = {
  [Screens.Home]: undefined;
  [Screens.Config]: undefined;
  [Screens.Qr]: undefined;
};

export type RootDrawerParamList = {
  [Screens.Home]: undefined;
  [Screens.Devices]: undefined;
};
