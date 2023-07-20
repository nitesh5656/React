import { View, Image } from "react-native";
import { Header, Icon } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import Pincode from "../../components/home/Pincode";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import axios from "axios";
import { API_URL } from "@env";
import { showToast } from "../../utils/toast";
import { useDispatch } from "react-redux";
import { getAsyncStorage } from "../../utils/extra";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screenHeight } from "../../utils/Dimensions";

export default function ComingSoonScreen({ navigation }) {
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
  return (
    <>
      {/* <Shell navigation={navigation}> */}
      <Header
        containerStyle={{
          backgroundColor: "#33056F",
          borderBottomColor: "transparent",
          height: 100,
        }}
        // leftComponent={
        //   <TouchableOpacity
        //     activeOpacity={0.8}
        //     style={{
        //       width: 40,
        //       height: 40,
        //       justifyContent: "center",
        //       alignItems: "center",
        //     }}>
        //     <Icon name='menu' type='feather' color='#fff' />
        //   </TouchableOpacity>
        // }
        centerComponent={
          <Image
            style={{
              width: 200,
              height: 80,
            }}
            resizeMode="contain"
            source={require("../../../assets/images/logoWhite.png")}
          />
        }
        rightComponent={
          <TouchableOpacity
            onPress={logoutButtonHandler}
            activeOpacity={0.8}
            style={{
              width: 40,
              height: 40,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {/* <Icon name='bell' type='material-community' color='#fff' /> */}
            <MaterialIcon name="logout" size={28} color={"#fff"} />
          </TouchableOpacity>
        }
        // leftContainerStyle={{
        //   height: 80,
        //   justifyContent: "center",
        //   padding: 0,
        //   margin: 0,
        // }}
        rightContainerStyle={{
          height: 80,
          justifyContent: "center",
          padding: 0,
          margin: 0,
        }}
      />

      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
          gap: 6,
        }}
      >
        <Pincode />

        <View
          style={{
            flex: 1,
            backgroundColor: "#fff",
            marginTop: 6,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{
            position: 'absolute',
            top: 80,
          }}>
            <Image
              source={require("../../../assets/images/coming-soon-1.gif")}
              alt="gif"
              style={{ width: 250, height: 250, zIndex: 1 }}
            />
            <Image
              source={require("../../../assets/images/coming-soon-2.gif")}
              alt="gif"
              style={{ width: 250, height: 250, bottom: 100 }}
            />
          </View>
        </View>
      </View>
      {/* </Shell> */}
    </>
  );
}
