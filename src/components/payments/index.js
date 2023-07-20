import { View, Text } from "react-native";
import { useState } from "react";
import { Button, CheckBox, Dialog, Divider } from "@rneui/themed";
import { screenWidth } from "../../utils/Dimensions";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import OrderStatus from "./OrderStatus";
import { showToast } from "../../utils/toast";
import axiosInstance from "../../utils/interceptor";
import { useSelector, useDispatch } from "react-redux";
import { RAZORPAY_TEST_KEY } from "@env";
import RazorpayCheckout from "react-native-razorpay";
import { updateUser } from "../../store/slices/authSlice";

export default function PaymentsPanel({ navigation, totalPrice, address }) {
  const { user } = useSelector((state) => state.auth);
  const [isPaidOnline, setIsPaidOnline] = useState(true);
  const [showOrderStatus, setShowOrderStatus] = useState({
    status: false,
    orderStatus: "",
  });
  const dispatch = useDispatch();

  const payButtonHandler = async () => {
    try {
      const { data } = await axiosInstance.get(
        `/payment/create-order?lat=${address.latitude}&long=${
          address.longitude
        }&isPaidOnline=${isPaidOnline}&address=${JSON.stringify(address)}`
      );
      if (isPaidOnline) displayRazorpay(data.message);
      else {
        showToast(data.message, "success");
        dispatch(
          updateUser({
            cart: [],
          })
        );
        setTimeout(() => {
          navigation.navigate("Order History");
        }, 2000);
      }
    } catch (err) {
      console.log(err);
      if (err.response) return showToast(err.response.data.message, "error");
      showToast(err.message, "error");
    }
  };

  const displayRazorpay = (data) => {
    try {
      var options = {
        description: "Ask Your Needs",
        image: "https://i.imgur.com/3g7nmJC.jpg",
        currency: data.currency,
        key: RAZORPAY_TEST_KEY,
        amount: data.amount,
        name: "Ask Your Needs",
        order_id: data.order_id,
        prefill: {
          email: user.email,
          contact: address.mobile,
          name: address.name,
        },
        theme: { color: "#53a20e" },
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          try {
            await axiosInstance.post("/payment/verify", {
              paymentId: data.razorpay_payment_id,
              orderId: data.razorpay_order_id,
              razorpaySignature: data.razorpay_signature,
            });
            setShowOrderStatus({ status: true, orderStatus: "success" });
            setTimeout(() => {
              navigation.navigate("Order History");
            }, 2000);
          } catch (err) {
            showToast("Payment Failed", err);
          }
        })
        .catch((error) => {
          console.log(error);
          alert(`Error: ${error.code} | ${error.description}`);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "#E7D6FD",
          flex: 1,
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: "#E7D6FD",
            padding: 20,
            gap: 20,
          }}>
          <View>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
                marginBottom: 10,
                textAlign: "center",
              }}>
              Select a Payment Option:
            </Text>

            <View
              style={{
                borderRadius: 10,
                padding: 10,
                backgroundColor: "#fff",
              }}>
              <CheckBox
                checked={isPaidOnline === false}
                onPress={() => setIsPaidOnline(false)}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={"Pay on Delivery"}
              />
              <Divider />
              <CheckBox
                checked={isPaidOnline === true}
                onPress={() => setIsPaidOnline(true)}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                title={"Pay Online"}
              />
            </View>
          </View>

          <View>
            <View>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 18,
                  marginBottom: 10,
                  textAlign: "center",
                }}>
                Delivery Address
              </Text>
            </View>

            <View
              style={{
                borderRadius: 10,
                padding: 20,
                backgroundColor: "#fff",
                gap: 10,
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 18,
                  }}>
                  {address.name}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  gap: 10,
                }}>
                <FontAwesomeIcon
                  name='mobile-alt'
                  size={22}
                  color={"#33056F"}
                />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                  }}>
                  +91-{address.number}
                </Text>
              </View>

              <View
                style={{
                  gap: 10,
                  flexDirection: "row",
                }}>
                <EntypoIcon name='location' size={22} color={"#33056F"} />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                  }}>
                  {address.address}
                </Text>
              </View>
            </View>
          </View>

          <View
            style={{
              borderRadius: 10,
              padding: 20,
              backgroundColor: "#fff",
              gap: 10,
              flexDirection: "row",
              alignItems: "center",
            }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
              }}>
              Total Amount :
            </Text>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 18,
              }}>
              ₹ {totalPrice}/-
            </Text>
          </View>
        </View>

        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            marginVertical: 20,
          }}>
          <Button
            title={"PAY NOW"}
            buttonStyle={{
              backgroundColor: "#33056F",
              borderRadius: 50,
              height: 60,
              width: 300,
            }}
            onPress={() => payButtonHandler()}
          />
        </View>
      </View>

      {showOrderStatus.status && (
        <Dialog
          isVisible={showOrderStatus.status}
          overlayStyle={{
            width: screenWidth,
            flex: 1,
          }}>
          <OrderStatus
            navigation={navigation}
            status={showOrderStatus.orderStatus}
          />
        </Dialog>
      )}
    </>
  );
}
