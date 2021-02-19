import * as AuthSession from "expo-auth-session";
import * as Facebook from "expo-auth-session/providers/facebook";
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
import * as React from "react";
import { Button } from "react-native";

WebBrowser.maybeCompleteAuthSession();

// Endpoint
const discovery = {
  authorizationEndpoint: "https://github.com/login/oauth/authorize",
  tokenEndpoint: "https://github.com/login/oauth/access_token",
  revocationEndpoint:
    "https://github.com/settings/connections/applications/cc998ba56a32aab70037",
};

export const Auth = () => {
  // const [request, response, promptAsync] = useAuthRequest(
  //   {
  //     clientId: "cc998ba56a32aab70037",
  //     scopes: ["identity"],
  //     redirectUri: makeRedirectUri({
  //       useProxy: false,
  //     }),
  //   },
  //   discovery
  // );
  const [request, response, promptAsync] = Facebook.useAuthRequest({
    clientId: "805377986856912",
    redirectUri: AuthSession.makeRedirectUri({
      // For usage in bare and standalone
      native: "fb805377986856912://auth",
    }),
  });
  console.log("Response", response);

  React.useEffect(() => {
    const handleUrl = ({ url }: any) => {
      console.log("URL", url);
    };
    Linking.addEventListener("url", handleUrl);
    return () => {
      Linking.removeEventListener("url", handleUrl);
    };
  }, []);

  React.useEffect(() => {
    if (response?.type === "success") {
      const { code } = response.params;

      console.log(response.authentication);
    }
  }, [response]);

  return (
    <Button
      disabled={!request}
      title="Login"
      onPress={() => {
        promptAsync();
      }}
    />
  );
};
