import { View, Text } from "react-native";
import React from "react";
import Shell from "../../components/shells/MainShell";
import NoOrders from "../../components/orderHistory/NoOrders";
import OrderHistoryPanel from "../../components/orderHistory";

export default function OrderHistoryScreen({ navigation }) {

  return (
    <Shell navigation={navigation} >
      <OrderHistoryPanel navigation={navigation} />
      {/* <NoOrders navigation={navigation} /> */}
    </Shell>
  );
}
