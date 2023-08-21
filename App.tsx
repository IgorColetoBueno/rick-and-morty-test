import { ApolloProvider } from "@apollo/react-hooks";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { Provider } from "react-redux";

import apolloClient from "./src/config/graphql";
import { MainStack } from "./src/presentation/navigation";
import { RouteName } from "./src/presentation/navigation/route-names";
import DetailScreen from "./src/presentation/screens/DetailScreen";
import HomeScreen from "./src/presentation/screens/HomeScreen";
import { store } from "./src/presentation/store";

export default function App() {
  const [fontsLoaded] = useFonts({
    get_schwifty: require("./src/assets/fonts/get_schwifty.ttf"),
    poppins: require("./src/assets/fonts/Poppins-Regular.ttf"),
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <StatusBar style="dark" translucent />
        <NavigationContainer onReady={onLayoutRootView}>
          <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name={RouteName.Home} component={HomeScreen} />
            <MainStack.Screen
              name={RouteName.Detail}
              component={DetailScreen}
            />
          </MainStack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </Provider>
  );
}
