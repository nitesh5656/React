import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import ProfileScreen from "../screen/profile";
import OrderHistoryScreen from "../screen/orderhistory";
import OffersAndPromosScreen from "../screen/Offers";
import ChangeLanguageScreen from "../screen/changeLanguage";
import ComplaintsScreen from "../screen/complaints";
import PrivacyPolicyScreen from "../screen/privacyPolicy";
import SecurityScreen from "../screen/suggestions";
import SupportScreen from "../screen/support";

const Drawer = createDrawerNavigator();

export default function MenuStack() {
  return (
    <Drawer.Navigator initialRouteName="Profile Screen">
      <Drawer.Screen name="Profile Screen" component={ProfileScreen} />
      <Drawer.Screen name="Orders Screen" component={OrderHistoryScreen} />
      <Drawer.Screen name="Offers and Promos" component={OffersAndPromosScreen} />
      <Drawer.Screen name="Change Language" component={ChangeLanguageScreen} />
      <Drawer.Screen name="Complaints" component={ComplaintsScreen} />
      <Drawer.Screen name="Privacy Policy" component={PrivacyPolicyScreen} />
      <Drawer.Screen name="Security" component={SecurityScreen} />
      <Drawer.Screen name="Support" component={SupportScreen} />
    </Drawer.Navigator>
  );
}
