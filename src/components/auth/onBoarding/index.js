import { View, Text, ImageBackground, Image } from "react-native";
import { Button, Card, Input } from "@rneui/themed";
import React, { useState } from "react";
import { styles } from "./OnboardingStyles";
import axiosInstance from "../../../utils/interceptor";
import { showToast } from "../../../utils/toast";
import { login } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "@env";

export default function OnBoardingPanel({ navigation }) {
  const [pincode, setPincode] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const OboardUserHandler = async () => {
    try {
      if (!pincode || pincode.length !== 6)
        throw new Error("Enter Valid Pincode !");
      setIsLoading(true);

      await axiosInstance.post(API_URL + "/user/onboarding", {
        pincode,
      });
    
      setIsLoading(false);
      dispatch(login(true));
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../assets/images/backgroundImg.jpg")}
        style={styles.backgroundImage}>
        <View style={styles.imageOverlay}>
          <Card
            containerStyle={{
              width: "90%",
              paddingBottom: 30,
              borderRadius: 10,
            }}>
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                height: 60,
              }}>
              <Image
                source={require("../../../../assets/images/logo.png")}
                resizeMode='contain'
                style={{ aspectRatio: 16 / 9 }}
              />
            </View>
            <View
              style={{
                marginTop: 10,
                gap: 5,
              }}>
              <Text style={{ fontSize: 16 }}>Pincode : </Text>
              <Input
                placeholder='Enter Pincode'
                containerStyle={{
                  width: "100%",
                  height: 50,
                  borderColor: "rgba(0,0,0,0.5)",
                  borderWidth: 2,
                  margin: "auto",
                  borderRadius: 7,
                }}
                inputContainerStyle={{
                  height: 50,
                  backgroundColor: "transparent",
                  borderBottomColor: "transparent",
                }}
                inputMode='numeric'
                // textAlign="center"
                cursorColor={"#F37130"}
                onChangeText={(number) => setPincode(number)}
              />
            </View>

            <Text
              style={{
                marginTop: 10,
                fontSize: 14,
                textAlign: "center",
                opacity: 0.5,
              }}>
              Ask your needs is availabe in soecified locations right now. For
              the best experience, please add your home pincode.
            </Text>

            <View style={styles.submitButtonContainer}>
              <Button
                title={isLoading ? "Wait.." : "Submit"}
                titleStyle={styles.loginButtonTitle}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.loginButton}
                disabled={isLoading}
                onPress={OboardUserHandler}
              />
            </View>
          </Card>
        </View>
      </ImageBackground>
    </View>
  );
}
