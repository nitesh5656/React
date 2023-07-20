import { View, Linking, Dimensions, Image, ScrollView, RefreshControl } from "react-native";
import React, { useState } from "react";
import { Button } from "@rneui/themed";
import { useSelector } from "react-redux";
import Advertisment from "./Advertisment";
import DailyNeeds from "./DailyNeeds";
import FoodAndBeverages from "./FoodAndBeverages";
import Services from "./Services";
import Pincode from "./Pincode";
import Language from "./Language";

const screenWidth = Dimensions.get("window").width;

export default function HomepagePanel({ navigation }) {
  const { user } = useSelector((state) => state.auth);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
    // Perform any necessary data fetching or updates here
    
    // After the data fetching or updates, set refreshing to false to stop the spinner
    setRefreshing(false);
  };

  return (
    <ScrollView 
    refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      {/* Pincode */}
      <Pincode />

      {/* Language Selection */}
      <Language />

      {/* Contact Info */}
      <View style={{ flexDirection: "row", justifyContent: "space-around" }}>
        <Button
          title='Call'
          icon={{
            name: "call",
            type: "ionicons",
            size: 18,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#33056F",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 160,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() => Linking.openURL(`tel:${user?.contact?.mobile}`)}
        />
        <Button
          title='Whatsapp'
          icon={{
            name: "whatsapp",
            type: "material-community",
            size: 18,
            color: "white",
          }}
          iconContainerStyle={{ marginRight: 10 }}
          titleStyle={{ fontWeight: "700" }}
          buttonStyle={{
            backgroundColor: "#33056F",
            borderColor: "transparent",
            borderWidth: 0,
            borderRadius: 30,
          }}
          containerStyle={{
            width: 160,
            marginHorizontal: 50,
            marginVertical: 10,
          }}
          onPress={() =>
            Linking.openURL(`whatsapp://send?phone=${user.contact.whatsapp}`)
          }
        />
      </View>

      {/* Advertisement */}
      <Advertisment />

      {/* Daily Needs */}
      <DailyNeeds navigation={navigation} />

      {/* Food & Beverages */}
      <FoodAndBeverages navigation={navigation} />
      {/* Ask for a Service */}
      <Services navigation={navigation} />

      {/* Footer Banner */}
      {/* <Image
        style={{ width: screenWidth, height: 200 }}
        source={require("../../../assets/images/FooterBanner.jpg")}
      /> */}
    </ScrollView>
  );
}
