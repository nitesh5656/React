import { View } from "react-native";
import { useState } from "react";
import { styles } from "./HomeStyles";
import { Icon, Input, Text } from "@rneui/themed";
import { debounce } from "../../utils/debounce";
import { fetchUsers } from "../../store/slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { showToast } from "../../utils/toast";
import axiosInstance from "../../utils/interceptor";

const Pincode = () => {
  const { user } = useSelector((user) => user.auth);
  const [isPincodeFocused, setIsPincodeFocused] = useState(false);
  const dispatch = useDispatch();
  const pincodeStyles = [styles.pincode];
  if (isPincodeFocused) pincodeStyles.push(styles.pincodePressed);

  const changePincodeHandler = debounce(async (value) => {
    try {
      if (value.length !== 6) throw new Error("Enter 6 Digits Pincode !");

      await axiosInstance.post("/user/onboarding", {
        pincode: +value,
      });

      dispatch(fetchUsers());
      showToast("Pincode Changed Successfully", "error");
    } catch (err) {
      console.log(err);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  }, 500);

  return (
    <View
      style={{
        backgroundColor: "#E7D6FD",
        width: "100%",
        height: 50,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1,
        bottom: 2,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}>
        <Icon name='location-on' type='material' color='#33056F' />
        <Text
          style={{
            color: "#33056F",
            fontSize: 15,
            marginLeft: 6,
            fontWeight: "700",
          }}>
          Change Your Pincode -{" "}
        </Text>
      </View>

      <View
        style={{
          width: 80,
          height: 36,
          top: 2,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
          padding: 10,
          borderTopLeftRadius: 8,
          borderBottomLeftRadius: 8,
        }}>
        <Input
          containerStyle={{
            backgroundColor: "transparent",
            margin: 0,
            padding: 0,
            height: 35,
            borderBottomColor: "transparent",
            paddingHorizontal: 0,
          }}
          inputContainerStyle={{
            backgroundColor: "#fff",
            margin: 0,
            padding: 0,
            height: 35,
            borderBottomColor: "transparent",
          }}
          inputStyle={{
            color: "#33056F",
            fontSize: 15,
            fontWeight: "700",
          }}
          inputMode='numeric'
          onFocus={() => setIsPincodeFocused(true)}
          onBlur={() => setIsPincodeFocused(false)}
          onChangeText={changePincodeHandler}
          defaultValue={user?.pincode + ""}
          maxLength={6}
        />
      </View>
      <View
        style={{
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(0,0,255,0.3)",
          height: 35,
          paddingHorizontal: 4,
          top: 2,
          borderTopRightRadius: 8,
          borderBottomRightRadius: 8,
        }}>
        <Icon name='search' type='material' color='#33056F' size={22} />
      </View>
    </View>
  );
};

export default Pincode;
