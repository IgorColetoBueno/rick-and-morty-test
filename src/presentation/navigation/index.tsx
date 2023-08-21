import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { RouteName } from "./route-names";

export type BaseStackParams = {
  [RouteName.Home]: undefined;
  [RouteName.Detail]: { id: string };
};

export const MainStack = createNativeStackNavigator<BaseStackParams>();
