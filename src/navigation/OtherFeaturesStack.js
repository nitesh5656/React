import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import MaintenanceScreen from "../screen/maintenance";
import NetworkFailureScreen from "../screen/networkFailure";
import ComingSoonScreen from "../screen/comingsoon";

const Stack = createNativeStackNavigator();

export default function OtherFeaturesStack({shownItem}) {
  return (
    <Stack.Navigator initialRouteName={shownItem}>
      <Stack.Screen
        name="Maintenance"
        component={MaintenanceScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Network Failure"
        component={NetworkFailureScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Comingsoon"
        component={ComingSoonScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
