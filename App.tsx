import { NavigationContainer } from "@react-navigation/native";
import { MainStack } from "./src/presentation/navigation";
import { RouteName } from "./src/presentation/navigation/route-names";
import DetailScreen from "./src/presentation/screens/DetailScreen";
import HomeScreen from "./src/presentation/screens/HomeScreen";
import { ApolloProvider } from "@apollo/react-hooks";
import apolloClient from "./src/config/graphql";
import { StatusBar } from "expo-status-bar";

export default function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <StatusBar style="auto" />
      <NavigationContainer>
        <MainStack.Navigator>
          <MainStack.Screen name={RouteName.Home} component={HomeScreen} />
          <MainStack.Screen name={RouteName.Detail} component={DetailScreen} />
        </MainStack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}
