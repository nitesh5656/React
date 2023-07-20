import { View, ImageBackground, TouchableOpacity, Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { styles } from "./LoginStyles";
import { Text, Input, Button, BottomSheet } from "@rneui/themed";
import { CountryPicker } from "react-native-country-codes-picker";
import { showToast } from "../../../utils/toast";
import { login } from "../../../store/slices/authSlice";
import { useDispatch } from "react-redux";
import { API_URL } from "@env";
import axios from "axios";

export default function LoginPanel({ navigation }) {
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState({
    flag: require(`../../../../assets/images/IndianFlag.png`),
    code: "IN",
    dial_code: "+91",
  });
  const dispatch = useDispatch();
  const [phoneNumber, setPhoneNumber] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [verifyOTP, setVerifyOTP] = useState();
  const [verifyOTPDialog, setVerifyOTPDialog] = useState({
    status: false,
    number: null,
    countryCode: countryCode?.dial_code,
  });
  const [token, setToken] = useState("");

  // Timer for verifying OTP
  const [timeLeft, setTimeLeft] = useState(30);

  const startTimer = () => {
    timer = setTimeout(() => {
      if (timeLeft <= 0) {
        clearTimeout(timer);
        return false;
      }
      setTimeLeft(timeLeft - 1);
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => clearTimeout(timer);
  });

  const start = () => {
    setTimeLeft(30);
    clearTimeout(timer);
    startTimer();
  };

  const submitOtpButtonHandler = async () => {
    try {
      if (verifyOTP.length !== 6) throw new Error("Enter Valid OTP !");
      setIsLoading(true);
      if (!token) throw new Error("Please SignUp First");

      const { data } = await axios.post(API_URL + "/auth/verify-otp", {
        token,
        otp: verifyOTP,
      });

      setIsLoading(false);

      AsyncStorage.setItem("accessToken", data.message.accesstoken);
      AsyncStorage.setItem("refreshToken", data.message.refreshtoken);

      data.message.isOnboardingCompleted
        ? dispatch(login(true))
        : navigation.navigate("Onboarding");
        
    } catch (err) {
      console.log(err);
      setIsLoading(false);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  const resendOtpButtonHandler = async () => {
    start();
    try {
      await axios.post(API_URL + "/auth/resend-otp", {
        token: token,
      });
    } catch (err) {
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  const submitButtonHandler = async () => {
    setIsLoading(true);
    try {
      if (!phoneNumber && phoneNumber?.length !== 10)
        throw new Error("Enter Valid Phone Number !");

      const { data } = await axios.post(API_URL + "/auth/login", {
        number: phoneNumber,
      });

      setIsLoading(false);
      setPhoneNumber(null);
      setToken(data.message);

      setVerifyOTPDialog({
        status: true,
        number: phoneNumber,
        countryCode: countryCode?.dial_code,
      });
      start();

      showToast("Enter This Otp Here " + data.otp, "success");
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
          <View style={styles.loginContainer}>
            <View>
              <Text style={styles.headingText}>Welcome to</Text>
              <Text style={styles.headingText}>Ask Your Needs</Text>
            </View>

            <View style={styles.countryCodeContainer}>
              <TouchableOpacity
                onPress={() => setShow(true)}
                style={{
                  //   width: 100,
                  height: 60,
                  backgroundColor: "white",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  gap: 10,
                  borderRadius: 7,
                  paddingHorizontal: 7,
                }}>
                <Image
                  style={{ width: 30, height: 20 }}
                  source={countryCode?.flag}
                  //   resizeMode="cover"
                />
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "700",
                  }}>
                  ({countryCode?.code})
                </Text>
                <Text
                  style={{
                    color: "black",
                    fontSize: 18,
                    fontWeight: "700",
                  }}>
                  {countryCode?.dial_code}
                </Text>
              </TouchableOpacity>

              {/* // For showing picker just put show state to show prop */}
              <CountryPicker
                show={show}
                // when picker button press you will get the country object with dial code
                pickerButtonOnPress={(item) => {
                  setCountryCode(item);
                  setShow(false);
                }}
                onBackdropPress={() => setShow(false)}
                style={{
                  modal: {
                    height: 500,
                    // backgroundColor: 'red'
                    paddingTop: 10,
                  },
                  textInput: {
                    // height: 80,
                    // borderRadius: 0,
                    marginTop: 10,
                  },
                }}
              />
              <Input
                placeholder='Phone Number'
                containerStyle={{
                  backgroundColor: "transparent",
                  margin: 0,
                  padding: 0,
                  height: "100%",
                  width: "55%",
                  borderBottomColor: "transparent",
                  alignItems: "center",
                  paddingTop: 8.5,
                }}
                inputContainerStyle={{
                  backgroundColor: "transparent",
                  margin: 0,
                  borderBottomColor: "transparent",
                }}
                inputMode='numeric'
                autoComplete='off'
                onChangeText={(number) => setPhoneNumber(number)}
                value={phoneNumber}
              />
            </View>

            <View style={styles.loginButtonContainer}>
              <Button
                title={isLoading && !verifyOTP ? "Wait..." : "Send OTP"}
                disabled={isLoading}
                titleStyle={styles.loginButtonTitle}
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.loginButton}
                onPress={submitButtonHandler}
              />
            </View>

            <View>
              <Text
                style={{
                  width: 250,
                  color: "#fff",
                  textAlign: "center",
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                By continuing you agree to our Terms of Service, Privacy Policy,
                Content Policy.
              </Text>
            </View>
          </View>
          
          <BottomSheet
            modalProps={{}}
            isVisible={verifyOTPDialog.status}
            containerStyle={styles.bottomSheetContainer}
            onBackdropPress={() => setVerifyOTPDialog({ status: false })}>
            <View style={styles.verifyOTPContainer}>
              <Text style={styles.verificationHeading}>
                Enter verification code
              </Text>
              <Text style={styles.verifyOTPText}>
                We have sent a verification code to
              </Text>
              <View style={styles.verificationNumber}>
                <Text style={styles.verificationNumberText}>
                  {verifyOTPDialog.countryCode}-
                </Text>
                <Text style={styles.verificationNumberText}>
                  {verifyOTPDialog.number}
                </Text>
              </View>

              <View
                style={{
                  marginTop: 20,
                  justifyContent: "center",
                  alignItems: "center",
                }}>
                <Input
                  placeholder='Enter OTP'
                  containerStyle={{
                    width: "90%",
                    height: 60,
                    borderColor: "#f5f5f5",
                    borderWidth: 2,
                    margin: "auto",
                  }}
                  inputContainerStyle={{
                    height: 60,
                    backgroundColor: "transparent",
                    borderBottomColor: "transparent",
                  }}
                  inputMode='numeric'
                  textAlign='center'
                  cursorColor={"#F37130"}
                  onChangeText={(number) => setVerifyOTP(number)}
                />
              </View>

              {timeLeft !== 0 && (
                <View style={{ marginTop: 20 }}>
                  <Text
                    style={{
                      textAlign: "center",
                      fontSize: 16,
                      fontWeight: "700",
                    }}>
                    00:
                    {timeLeft.toString()?.length === 1
                      ? "0" + timeLeft
                      : timeLeft}
                  </Text>
                </View>
              )}

              {timeLeft === 0 && (
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginTop: 10,
                  }}>
                  <Text style={styles.verificationNumberText}>
                    Didn't receive the OTP?
                  </Text>
                  <Button
                    title={"Resend Now"}
                    containerStyle={{
                      backgroundColor: "transparent",
                      bottom: 4,
                    }}
                    buttonStyle={{
                      // backgroundColor: 'transparent',
                      color: "#000",
                      padding: 0,
                      margin: 0,
                      fontSize: 20,
                    }}
                    type='clear'
                    titleStyle={{
                      fontSize: 18,
                    }}
                    disabled={timeLeft === 0 ? false : true}
                    onPress={resendOtpButtonHandler}
                  />
                </View>
              )}

              <View style={styles.submitButtonContainer}>
                <Button
                  title={isLoading ? "Submitting" : "Submit"}
                  titleStyle={styles.loginButtonTitle}
                  disabled={isLoading}
                  containerStyle={[styles.buttonContainer, styles.submitButton]}
                  buttonStyle={styles.loginButton}
                  onPress={submitOtpButtonHandler}
                />
              </View>
            </View>
          </BottomSheet>
        </View>
      </ImageBackground>
      {/* <StatusBar style="auto" backgroundColor="rgba(0,0,0,0.4)" /> */}
    </View>
  );
}
