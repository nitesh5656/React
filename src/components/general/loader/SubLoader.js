import { View, Text, Image, ImageBackground } from "react-native";
import React from "react";

export default function SubLoader({ navigation }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* <ImageBackground
        source={require("../../../../assets/images/backgroundImg.jpg")}
        style={{
          flex: 1,
          resizeMode: "cover",
        }}
      > */}
        <View style={{
            flex: 1,
            // backgroundColor: 'rgba(0,0,0,0.7)',
            right: 30,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            <Image 
                source={require("../../../../assets/images/logoGif.gif")}
                style={{
                    width: 100,
                    height: 100,
                }}
                />
        </View>
      {/* </ImageBackground> */}
    </View>
  );
}
