import { View, Text } from "react-native";
import React from "react";
import { Image } from "react-native";
import { Button } from "@rneui/themed";

export default function NoOrders({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../assets/images/Vector.png")}
          alt="img"
          style={{
            width: 150,
            height: 150,
          }}
        />
        <Text style={{
            fontWeight: '900',
            fontSize: 28,
            opacity: 0.6,
            marginTop: 10,
            textAlign: 'center',
        }}>No History Yet</Text>

        <Text style={{
            width: 250,
            textAlign: "center",
            fontWeight: '700',
            opacity: 0.4,
        }}>Hit the ordering button down below to create an order.</Text>
      </View>

      <View style={{
        justifyContent:'center',
        alignItems: 'center',
        marginBottom: 20,
      }}>
        <Button 
            title={"Start Ordering"} 
            buttonStyle={{
                backgroundColor: '#33056F',
                borderRadius: 50,
                height: 60,
                width: 300,
                }}
            onPress={()=> navigation.navigate("Home")}
            />
      </View>
    </View>
  );
}
