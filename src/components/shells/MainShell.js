import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { Header, Icon, SearchBar, Dialog, Divider } from "@rneui/themed";
import React, { useState } from "react";
import { styles } from "./MainShellStyles";
import { screenHeight } from "../../utils/Dimensions";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";
import { getAsyncStorage } from "../../utils/extra";
import { useDispatch } from "react-redux";
import { showToast } from "../../utils/toast";
import axios from "axios";
import { logout } from "../../store/slices/authSlice";

export default function Shell({ navigation, children }) {
  const [showLeftMenu, setShowLeftMenu] = useState(false);
  const dispatch = useDispatch();

  const logoutButtonHandler = async () => {
    try {
      await axios.get(API_URL + "/auth/logout", {
        headers: {
          Authorization: `JWT ${await getAsyncStorage("refreshToken")}`,
        },
      });

      await AsyncStorage.removeItem("accessToken");
      await AsyncStorage.removeItem("refreshToken");
      showToast("Logged Out Successfully", "success");
      dispatch(logout(false));
      navigation.navigate("Login");
    } catch (err) {
      console.log(err);
    }
  };

  const leftMenu = [
    {
      name: "Profile",
      icon: <FontAwesomeIcon name="user-circle-o" size={24} color={"#fff"} />,
      naviagte: "Profile",
    },
    {
      name: "MyOrders",
      icon: (
        <MaterialCommunityIcon
          name="cart-arrow-down"
          size={28}
          color={"#fff"}
        />
      ),
      naviagte: "Order History",
    },
    // {
    //   name: "Offer and Promo",
    //   icon: (
    //     <MaterialCommunityIcon name="tag-outline" size={28} color={"#fff"} />
    //   ),
    //   naviagte: "Offers and Promos",
    // },
    {
      name: "Change Language",
      icon: <FontAwesomeIcon name="language" size={28} color={"#fff"} />,
      naviagte: "Change Language",
    },
    {
      name: "Complaints",
      icon: (
        <MaterialCommunityIcon name="playlist-edit" size={28} color={"#fff"} />
      ),
      naviagte: "Complaints",
    },
    {
      name: "Privacy Policy",
      icon: (
        <MaterialCommunityIcon name="file-document" size={28} color={"#fff"} />
      ),
      naviagte: "Privacy Policy",
    },
    // {
    //   name: "Suggestions",
    //   icon: (
    //     <MaterialCommunityIcon
    //       name='tooltip-edit-outline'
    //       size={28}
    //       color={"#fff"}
    //     />
    //   ),
    //   naviagte: "Suggestions",
    // },
    {
      name: "Support",
      icon: <MaterialIcon name="contact-support" size={28} color={"#fff"} />,
      naviagte: "Support",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Header
          containerStyle={styles.headerContainer}
          leftComponent={
            <TouchableOpacity
              onPress={() => setShowLeftMenu(true)}
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="menu" type="feather" color="#fff" />
            </TouchableOpacity>
          }
          centerComponent={
            <Image
              style={styles.logo}
              resizeMode="contain"
              source={require("../../../assets/images/logoWhite.png")}
            />
          }
          rightComponent={
            <TouchableOpacity
              onPress={() => navigation.navigate("Notification")}
              activeOpacity={0.8}
              style={{
                width: 40,
                height: 40,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Icon name="bell" type="material-community" color="#fff" />
            </TouchableOpacity>
          }
          leftContainerStyle={{
            height: 80,
            justifyContent: "center",
            padding: 0,
            margin: 0,
          }}
          rightContainerStyle={{
            height: 80,
            justifyContent: "center",
            padding: 0,
            margin: 0,
          }}
        />
        <View
          style={{
            backgroundColor: "rgba(51, 5, 111,1)",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <SearchBar
            placeholder="Search Here..."
            containerStyle={{
              backgroundColor: "transparent",
              width: "100%",
              padding: 0,
              margin: 0,
              borderBottomColor: "transparent",
              borderTopColor: "transparent",
              paddingHorizontal: 15,
              paddingBottom: 10,
            }}
            inputContainerStyle={{
              backgroundColor: "#fff",
              width: "100%",
              height: 40,
            }}
            onPressIn={() => navigation.navigate("Search")}
          />
        </View>

        <ScrollView
          contentContainerStyle={{
            flex: 1,
          }}
        >
          {children}
        </ScrollView>
      </View>
      {showLeftMenu && (
        <Dialog
          isVisible={showLeftMenu}
          onBackdropPress={() => setShowLeftMenu(false)}
          overlayStyle={{
            width: 280,
            height: screenHeight,
            alignSelf: "flex-start",
            backgroundColor: "#F37130",
          }}
        >
          <View style={{ flex: 1 }}>
            {leftMenu.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    navigation.navigate(item.naviagte);
                    setShowLeftMenu(false);
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 20,
                      alignItems: "center",
                      marginTop: 20,
                    }}
                  >
                    {item.icon}
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        fontSize: 20,
                      }}
                    >
                      {item.name}
                    </Text>
                  </View>
                  <Divider
                    style={{
                      width: 150,
                      marginTop: 10,
                      left: 40,
                    }}
                  />
                </TouchableOpacity>
              );
            })}
          </View>

          <View
            style={{
              flexDirection: "row",
              gap: 10,
              alignItems: "center",
              marginBottom: 10,
              left: 10,
            }}
            onStartShouldSetResponder={logoutButtonHandler}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
                fontSize: 20,
              }}
            >
              Sign-out
            </Text>
            <MaterialIcon name="logout" size={28} color={"#fff"} />
          </View>
        </Dialog>
      )}
    </>
  );
}
