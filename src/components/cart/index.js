import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { IMAGE_URL } from "@env";
import React, { useEffect } from "react";
import { BottomSheet, Button, Card } from "@rneui/themed";
import { categoryImgWidth, screenWidth } from "../../utils/Dimensions";
import { useState } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome5";
import EntypoIcon from "react-native-vector-icons/Entypo";
import Address from "../profile/Address";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";
import { removeCartHandler, addToCartButton } from "../../utils/cart";
import { useDispatch } from "react-redux";
import DailyNeedsProducts from "../dailyneeds/DailyNeedsProductUI";
import { showToast } from "../../utils/toast";

export default function CartPanel({ navigation, data, type, address }) {
  const { user } = useSelector((user) => user.auth);
  const [deliverCharges, setDeliverCharges] = useState(null);
  const [showAddressOverlay, setShowAddressOverlay] = React.useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [isNotPresent, setIsNotPresent] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(`/user/cart`);
        setCartItems(data.message);
      } catch (err) {
        setCartItems([]);
      }
    })();
  }, [user?.cart]);

  useEffect(() => {
    (async () => {
      if (address) {
        try {
          setIsNotPresent(false);
          const { data } = await axiosInstance.get(
            `/deliveryCharge?lat=${address.latitude}&long=${address.longitude}`
          );
          setDeliverCharges(data.deliveryCharge);
        } catch (err) {
          if (err.response) {
            if (err.response.data.message === "Not Present")
              return setIsNotPresent(true);

            return showToast(
              "Something Went Wrong to fetching delivery Details",
              "error"
            );
          }
        }
      }
    })();
  }, [address]);

  function percentage(num, per) {
    return (num / 100) * per;
  }

  function isCurrentTimeInRange(startTime, endTime) {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();

    const start = convertTimeStringToDate(startTime);
    const end = convertTimeStringToDate(endTime);

    if (end >= start) {
      return now >= start && now <= end;
    } else {
      return (
        currentHour > start.getHours() ||
        (currentHour === start.getHours() &&
          currentMinute >= start.getMinutes()) ||
        currentHour < end.getHours() ||
        (currentHour === end.getHours() && currentMinute <= end.getMinutes())
      );
    }
  }

  function convertTimeStringToDate(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const now = new Date();
    return new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      hours,
      minutes
    );
  }

  let checkIsEmergencyTime = (cartProduct) => {
    let isEmergencyTime = false;
    let isAvailableTime = false;

    cartProduct?.emergencyTime?.forEach((time) => {
      if (isCurrentTimeInRange(time.startTime, time.closeTime))
        isEmergencyTime = true;
    });
    cartProduct?.availableTime?.forEach((time) => {
      if (isCurrentTimeInRange(time.startTime, time.closeTime))
        isAvailableTime = true;
    });

    if (isAvailableTime) return false;
    if (isEmergencyTime) return true;

    return null;
  };

  const getTotalPrice = () => {
    let totalPrice = 0;
    let totalGST = 0;
    let totalPriceWithOutDiscount = 0;

    if (user?.cart?.serviceType?.type === "DAILYNEEDS") {
      user?.cart?.items?.map((product) => {
        let cartProduct = cartItems.find((item) => item._id === product.id);
        let cartProductPrice = cartProduct?.productPriceInfo?.find(
          (variant) => variant._id === product.unitId
        );

        let discountedPrice =
          cartProduct?.discountType === "PERCENTAGE"
            ? +cartProductPrice?.productPrice -
              (+cartProductPrice?.productPrice * +cartProduct?.discountValue) /
                100
            : +cartProductPrice?.productPrice - +cartProduct?.discountValue;

        totalPriceWithOutDiscount =
          +totalPriceWithOutDiscount + +cartProductPrice?.productPrice;

        let discountPrice = Math.ceil(discountedPrice);
        let taxedAmount = Math.ceil(
          percentage(
            +cartProductPrice?.productPrice,
            +cartProduct?.tax?.percentage
          )
        );
        totalGST = totalGST + taxedAmount;
        totalPrice = totalPrice + discountPrice;
      });
    }

    if (user?.cart?.serviceType?.type === "FOODANDBEVERAGES") {
      user?.cart?.items?.map((product) => {
        let cartProduct = cartItems.find((item) => item._id === product);

        let discountedPrice =
          cartProduct?.discountType === "PERCENTAGE"
            ? +cartProduct?.productPrice -
              (+cartProduct?.productPrice * +cartProduct?.discountValue) / 100
            : +cartProduct?.productPrice - +cartProduct?.discountValue;

        totalPriceWithOutDiscount =
          +totalPriceWithOutDiscount + +cartProduct?.productPrice;

        let discountPrice = Math.ceil(discountedPrice);
        let taxedAmount = Math.ceil(
          percentage(+cartProduct?.productPrice, +cartProduct?.tax?.percentage)
        );
        totalGST = totalGST + taxedAmount;
        totalPrice = totalPrice + discountPrice;
      });
    }

    if (user?.cart?.serviceType?.type === "SERVICES") {
      user?.cart?.items?.map((product) => {
        let cartProduct = cartItems.find((item) => item._id === product);
        let isEmergencyTime = checkIsEmergencyTime(cartProduct);

        if (isEmergencyTime == false)
          totalPrice = totalPrice + +cartProduct?.serviceCharge;

        if (isEmergencyTime) {
          totalPrice = totalPrice + +cartProduct?.emergencyCharge;
        }
      });
    }

    return {
      totalPrice,
      totalGST,
      totalsavings: totalPriceWithOutDiscount - totalPrice,
    };
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              paddingTop: 10,
            }}>
            ITEMS ADDED
          </Text>
          {user?.cart?.serviceType?.type === "SERVICES" && (
            <ServiceCartItems
              navigation={navigation}
              data={cartItems}
              checkIsEmergencyTime={checkIsEmergencyTime}
            />
          )}
          {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" && (
            <FoodAndBeveragesItem
              navigation={navigation}
              data={cartItems}
              type={type}
            />
          )}
          {user?.cart?.serviceType?.type === "DAILYNEEDS" && (
            <DailyNeedsItem navigation={navigation} data={cartItems} />
          )}
        </View>

        {type === "Ask for a Service" && (
          <View>
            <Text
              style={{
                textAlign: "center",
                fontSize: 20,
                fontWeight: "700",
                paddingTop: 10,
              }}>
              CHOOSE TIME-SLOT
            </Text>
            <ChooseTimeSlot navigation={navigation} />
          </View>
        )}

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              paddingTop: 10,
              marginBottom: 6,
            }}>
            ADDRESS
          </Text>
          {address && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => navigation.navigate("Select Address")}>
              <View
                style={{
                  borderRadius: 10,
                  padding: 20,
                  backgroundColor: "#fff",
                  gap: 10,
                  borderColor: "rgba(0,0,0,0.25)",
                  borderWidth: 1,
                  marginHorizontal: 10,
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
                    {address.number}
                  </Text>
                </View>

                <View
                  style={{
                    gap: 10,
                    flexDirection: "row",
                    width: "90%",
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
            </TouchableOpacity>
          )}
          <AddressPanel navigation={navigation} address={address} />
        </View>

        <View>
          <Text
            style={{
              textAlign: "center",
              fontSize: 20,
              fontWeight: "700",
              paddingTop: 10,
            }}>
            BILL SUMMARY
          </Text>
          <BillSummary
            navigation={navigation}
            deliverCharges={deliverCharges}
            data={data}
            type={type}
            getTotalPrice={getTotalPrice}
          />
        </View>
      </ScrollView>

      <View
        style={{
          // height: 100,
          backgroundColor: "transparent",
        }}>
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 30,
          }}>
          <Card
            containerStyle={{
              margin: 0,
              // borderRadius: 30,
              borderTopLeftRadius: 30,
              borderTopRightRadius: 30,
              backgroundColor: `${isNotPresent ? "#FF9431" : "#fff"}`,
            }}>
            <View
              style={{
                flexDirection: "row",
                
              }}>
              {isNotPresent ? (
                <View>
                  <Text style={{ 
                    color: '#fff',
                    fontWeight: '700',
                    fontSize: 16,
                  }}>We are Not Present In Your Location</Text>
                </View>
              ) : (
                <>
                  <View
                    style={{
                      alignItems: "center",
                      justifyContent: "center",
                      flex: 1,
                    }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 18,
                      }}>
                      ₹{" "}
                      {deliverCharges
                        ? getTotalPrice().totalPrice +
                          getTotalPrice().totalGST +
                          deliverCharges
                        : getTotalPrice().totalPrice + getTotalPrice().totalGST}
                    </Text>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 12,
                      }}>
                      Total Amount
                    </Text>
                  </View>

                  <View>
                    <Button
                      onPress={() =>
                        navigation.navigate("Payments", {
                          totalPrice: deliverCharges
                            ? getTotalPrice().totalPrice +
                              getTotalPrice().totalGST +
                              deliverCharges
                            : getTotalPrice().totalPrice +
                              getTotalPrice().totalGST,
                          address: address,
                        })
                      }
                      disabled={deliverCharges === null}
                      title={"Proceed To Pay"}
                      buttonStyle={{
                        backgroundColor: "#F37130",
                        borderRadius: 10,
                      }}
                    />
                  </View>
                </>
              )}
            </View>
          </Card>
        </View>
      </View>

      {showAddressOverlay && (
        <BottomSheet
          modalProps={{}}
          isVisible={showAddressOverlay}
          onBackdropPress={() => setShowAddressOverlay(false)}
          backdropStyle={{
            backgroundColor: "rgba(0,0,0,0.55)",
          }}
          overlayStyle={{
            width: screenWidth,
          }}>
          <Address
            navigation={navigation}
            onClose={() => setShowAddressOverlay(false)}
          />
        </BottomSheet>
      )}
    </View>
  );
}

const DailyNeedsItem = ({ navigation, data }) => {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const CartItemsList = ({ navigation, item }) => {
    let discountedPrice =
      item?.discountType === "PERCENTAGE"
        ? item?.productPrice - (item?.productPrice * item?.discountValue) / 100
        : item?.productPrice - item?.discountValue;

    let finalPrice = Math.ceil(discountedPrice);

    return (
      <View
        style={{
          padding: 0,
        }}>
        <Card
          containerStyle={{
            padding: 8,
            margin: 0,
          }}
          wrapperStyle={{
            flexDirection: "row",
            flex: 1,
            gap: 10,
          }}>
          <Card.Image
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode='contain'
            source={{
              uri:
                IMAGE_URL +
                `${
                  user?.cart?.serviceType?.type === "DAILYNEEDS" &&
                  "/dailyneeds/products/"
                }` +
                item?.img,
            }}
            onPress={() =>
              navigation.navigate("DailyNeeds ProductDetails", {
                type: "DailyNeeds",
                productId: item._id,
                dailyNeedTypeId: item.dailyNeed,
              })
            }
          />
          <View
            style={{
              paddingTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                {item?.name}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                ({item?.productSize} {item?.productUnit?.unitValue})
              </Text>
            </View>

            <View>
              {item?.discountValue > 0 ? (
                <View>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 22,
                      color: "#FF9431",
                    }}>
                    ₹ {finalPrice}/-
                  </Text>

                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      color: "#33056F",
                      textDecorationLine: "line-through",
                    }}>
                    ₹ {item?.productPrice}/-
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: "#FF9431",
                    }}>
                    ₹ {item?.productPrice}/-
                  </Text>
                </View>
              )}
            </View>

            {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
            user?.cart?.items?.some((cartItem) => cartItem === item._id) ? (
              <View style={{ marginVertical: 6 }}>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#FF9431",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignContent: "center",
                    }}>
                    <Button
                      containerStyle={{
                        backgroundColor: "transparent",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      onPress={() =>
                        removeCartHandler(
                          user,
                          dispatch,
                          item._id,
                          "FOODANDBEVERAGES",
                          item.restaurantMenu
                        )
                      }>
                      {" "}
                      -{" "}
                    </Button>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        textAlignVertical: "center",
                      }}>
                      {
                        user?.cart?.items?.filter(
                          (cartItem) => cartItem === item._id
                        ).length
                      }
                    </Text>
                    <Button
                      containerStyle={{
                        backgroundColor: "transparent",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      onPress={() =>
                        addToCartButton(
                          item.restaurantMenu,
                          user,
                          item._id,
                          dispatch,
                          "FOODANDBEVERAGES"
                        )
                      }>
                      {" "}
                      +{" "}
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity>
                <Button
                  onPress={() =>
                    addToCartButton(
                      item.restaurantMenu,
                      user,
                      item._id,
                      dispatch,
                      "FOODANDBEVERAGES"
                    )
                  }
                  buttonStyle={{ backgroundColor: "#FF9431" }}
                  containerStyle={{ borderRadius: 10 }}
                  titleStyle={{ fontWeight: "700", fontSize: 14 }}>
                  ADD TO CART
                </Button>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={
          {
            // backgroundColor: "#fff",
          }
        }>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <DailyNeedsProducts
              product={item}
              navigation={navigation}
              activeId={item?.dailyNeed?._id}
            />
          )}
          keyExtractor={(item) => item._id}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "center",
            gap: 10,
            paddingVertical: 3,
          }}
        />
      </View>
    </View>
  );
};

const FoodAndBeveragesItem = ({ navigation, data }) => {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const CartItemsList = ({ navigation, item }) => {
    let discountedPrice =
      item?.discountType === "PERCENTAGE"
        ? item?.productPrice - (item?.productPrice * item?.discountValue) / 100
        : item?.productPrice - item?.discountValue;

    let finalPrice = Math.ceil(discountedPrice);

    return (
      <View
        style={{
          padding: 0,
        }}>
        <Card
          containerStyle={{
            padding: 8,
            margin: 0,
          }}
          wrapperStyle={{
            flexDirection: "row",
            flex: 1,
            gap: 10,
          }}>
          <Card.Image
            style={{
              height: 50,
              width: 50,
            }}
            resizeMode='contain'
            source={{
              uri:
                IMAGE_URL +
                `${
                  user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
                  "/restaurant/products/"
                }` +
                item?.img,
            }}
            onPress={() =>
              navigation.navigate("FoodAndBeverages ProductDetails", {
                type: "Food And Beverages",
                productId: item._id,
                foodAndBeveragesId: item.restaurantMenu,
              })
            }
          />
          <View
            style={{
              paddingTop: 5,
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <View>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                {item?.name}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                ({item?.productSize} {item?.productUnit?.unitValue})
              </Text>
            </View>

            <View>
              {item?.discountValue > 0 ? (
                <View>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 22,
                      color: "#FF9431",
                    }}>
                    ₹ {finalPrice}/-
                  </Text>

                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      color: "#33056F",
                      textDecorationLine: "line-through",
                    }}>
                    ₹ {item?.productPrice}/-
                  </Text>
                </View>
              ) : (
                <View>
                  <Text
                    style={{
                      fontSize: 22,
                      fontWeight: "700",
                      color: "#FF9431",
                    }}>
                    ₹ {item?.productPrice}/-
                  </Text>
                </View>
              )}
            </View>

            {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
            user?.cart?.items?.some((cartItem) => cartItem === item._id) ? (
              <View style={{ marginVertical: 6 }}>
                <TouchableOpacity>
                  <View
                    style={{
                      backgroundColor: "#FF9431",
                      borderRadius: 30,
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                      alignContent: "center",
                    }}>
                    <Button
                      containerStyle={{
                        backgroundColor: "transparent",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      onPress={() =>
                        removeCartHandler(
                          user,
                          dispatch,
                          item._id,
                          "FOODANDBEVERAGES",
                          item.restaurantMenu
                        )
                      }>
                      {" "}
                      -{" "}
                    </Button>
                    <Text
                      style={{
                        color: "#fff",
                        fontWeight: "700",
                        textAlignVertical: "center",
                      }}>
                      {
                        user?.cart?.items?.filter(
                          (cartItem) => cartItem === item._id
                        ).length
                      }
                    </Text>
                    <Button
                      containerStyle={{
                        backgroundColor: "transparent",
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      onPress={() =>
                        addToCartButton(
                          item.restaurantMenu,
                          user,
                          item._id,
                          dispatch,
                          "FOODANDBEVERAGES"
                        )
                      }>
                      {" "}
                      +{" "}
                    </Button>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity>
                <Button
                  onPress={() =>
                    addToCartButton(
                      item.restaurantMenu,
                      user,
                      item._id,
                      dispatch,
                      "FOODANDBEVERAGES"
                    )
                  }
                  buttonStyle={{ backgroundColor: "#FF9431" }}
                  containerStyle={{ borderRadius: 10 }}
                  titleStyle={{ fontWeight: "700", fontSize: 14 }}>
                  ADD TO CART
                </Button>
              </TouchableOpacity>
            )}
          </View>
        </Card>
      </View>
    );
  };
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
        }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <CartItemsList item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const ServiceCartItems = ({ navigation, data, checkIsEmergencyTime }) => {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const ServicesCartList = ({ navigation, item }) => (
    <View
      style={{
        padding: 0,
      }}>
      <Card
        containerStyle={{
          padding: 8,
          margin: 0,
        }}
        wrapperStyle={{
          flexDirection: "row",
          flex: 1,
          gap: 10,
        }}>
        <Card.Image
          style={{
            height: 50,
            width: 50,
          }}
          resizeMode='contain'
          source={{
            uri: IMAGE_URL + "/services/products/" + item?.bannerImg,
          }}
          onPress={() =>
            navigation.navigate("AskForAService ProductDetails", {
              productId: item._id,
              serviceId: item.serviceType,
            })
          }
        />
        <View
          style={{
            paddingTop: 5,
            flexDirection: "row",
            justifyContent: "space-between",
            flex: 1,
          }}>
          <View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: "700",
                width: categoryImgWidth,
              }}>
              {item?.name}
            </Text>
          </View>

          <View>
            <View
              style={
                {
                  // opacity: hours >= 8 && hours < 18 ? 1 : 0.3,
                }
              }>
              <Text style={{ fontSize: 10, fontWeight: "700" }}>
                Min. service charge
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#FF9431",
                }}>
                ₹ {item?.serviceCharge}/-
              </Text>
            </View>

            <View
              style={
                {
                  // opacity: hours > 18 || hours < 8 ? 1 : 0.3,
                }
              }>
              <Text style={{ fontSize: 10, fontWeight: "700" }}>
                Emergency charge
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#FF9431",
                }}>
                ₹ {item.emergencyCharge}/-
              </Text>
            </View>
            {checkIsEmergencyTime(item) === null && (
              <View>
                <Text style={{ fontSize: 10, fontWeight: "700" }}>
                  Not Available !
                </Text>
              </View>
            )}
          </View>

          <View style={{ marginVertical: 6 }}>
            {user?.cart?.serviceType?.type === "SERVICES" &&
            user?.cart?.items?.some((cartItem) => cartItem === item._id) ? (
              <TouchableOpacity>
                <Button
                  onPress={() =>
                    removeCartHandler(
                      user,
                      dispatch,
                      item._id,
                      "SERVICES",
                      item.serviceType
                    )
                  }
                  buttonStyle={{ backgroundColor: "#FF9431" }}
                  containerStyle={{ borderRadius: 10 }}
                  titleStyle={{ fontWeight: "700", fontSize: 11 }}>
                  Remove
                </Button>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity>
                <Button
                  onPress={() =>
                    addToCartButton(
                      item.serviceType,
                      user,
                      item._id,
                      dispatch,
                      "SERVICES"
                    )
                  }
                  buttonStyle={{ backgroundColor: "#FF9431" }}
                  containerStyle={{ borderRadius: 10 }}
                  titleStyle={{ fontWeight: "700", fontSize: 11 }}>
                  Book Now
                </Button>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Card>
    </View>
  );
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
        }}>
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <ServicesCartList item={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
        />
      </View>
    </View>
  );
};

const AddressPanel = ({ navigation, address }) => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 50,
        }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => navigation.navigate("Select Address")}>
          <Card
            containerStyle={{
              margin: 0,
              height: 50,
              borderRadius: 10,
            }}
            wrapperStyle={{
              flexDirection: "row",
              flex: 1,
              gap: 10,
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontWeight: "700",
                color: "#33056F",
              }}>
              {!address ? "Select Address" : "Change Address"}
            </Text>
            <Icon name='chevron-right' size={22} color={"#33056F"} />
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Offers = ({ navigation }) => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 50,
        }}>
        <TouchableOpacity>
          <Card
            containerStyle={{
              margin: 0,
              height: 50,
              borderRadius: 10,
            }}
            wrapperStyle={{
              flexDirection: "row",
              flex: 1,
              gap: 10,
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontWeight: "700",
                color: "#33056F",
              }}>
              Apply Coupon
            </Text>
            <Icon name='chevron-right' size={22} color={"#33056F"} />
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BillSummary = ({ navigation, type, deliverCharges, getTotalPrice }) => {
  const { user } = useSelector((user) => user.auth);
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          zIndex: 1,
        }}>
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 10,
          }}
          wrapperStyle={{
            flex: 1,
            gap: 4,
          }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                SubTotal
              </Text>
            </View>

            <View
              style={{
                minWidth: 80,
                alignItems: "flex-end",
              }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                ₹ {getTotalPrice().totalPrice}
              </Text>
            </View>
          </View>

          {user?.cart?.serviceType?.type !== "SERVICES" && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 4,
                }}>
                <Icon name='bank' size={16} />
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}>
                  GST
                </Text>
                <Icon name='information-outline' size={18} />
              </View>

              <View
                style={{
                  minWidth: 80,
                  alignItems: "flex-end",
                }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}>
                  ₹ {getTotalPrice().totalGST}
                </Text>
              </View>
            </View>
          )}

          {user?.cart?.serviceType?.type !== "SERVICES" && deliverCharges && (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}>
              <View
                style={{
                  flexDirection: "row",
                  // alignItems: 'center',
                  gap: 2,
                }}>
                <MaterialIcon
                  name='delivery-dining'
                  size={20}
                  style={{ marginTop: 4 }}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                    }}>
                    Delivery charges for
                  </Text>

                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 16,
                    }}>
                    5 Kms <Icon name='information-outline' size={18} />
                  </Text>
                </View>
              </View>

              <View
                style={{
                  minWidth: 80,
                  alignItems: "flex-end",
                }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}>
                  ₹ 20/-
                </Text>
              </View>
            </View>
          )}

          <View
            style={{
              width: 300,
              height: 2,
              backgroundColor: "rgba(0,0,0,0.15)",
              marginVertical: 10,
            }}
          />

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              flex: 1,
            }}>
            <View style={{}}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                Total Amount
              </Text>
            </View>

            <View
              style={{
                minWidth: 80,
                alignItems: "flex-end",
              }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                ₹{" "}
                {deliverCharges
                  ? getTotalPrice().totalPrice +
                    getTotalPrice().totalGST +
                    deliverCharges
                  : getTotalPrice().totalPrice + getTotalPrice().totalGST}
              </Text>
            </View>
          </View>
        </Card>
      </View>

      {user?.cart?.serviceType?.type !== "SERVICES" && (
        <View
          style={{
            backgroundColor: "green",
            flex: 1,
            paddingVertical: 10,
            bottom: 6,
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: 10,
            borderBottomRightRadius: 10,
            borderBottomLeftRadius: 10,
          }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 20,
            }}>
            Total Saving :{" "}
          </Text>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              fontSize: 20,
            }}>
            ₹ {getTotalPrice().totalsavings}
          </Text>
        </View>
      )}
    </View>
  );
};

const CancellationPolicy = ({ navigation }) => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
        }}>
        <Card
          containerStyle={{
            margin: 0,
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontWeight: "700",
            }}>
            100% cancellation fee will be applicable if you decide to cancel the
            order anytime after order placement.
          </Text>
        </Card>
      </View>
    </View>
  );
};

const ChooseTimeSlot = ({ navigation }) => {
  return (
    <View
      style={{
        padding: 10,
      }}>
      <View
        style={{
          backgroundColor: "#fff",
          borderRadius: 10,
          height: 50,
        }}>
        <TouchableOpacity
          onPress={() => navigation.navigate("Choose Timeslot")}>
          <Card
            containerStyle={{
              margin: 0,
              height: 50,
              borderRadius: 10,
            }}
            wrapperStyle={{
              flexDirection: "row",
              flex: 1,
              gap: 10,
              justifyContent: "space-between",
            }}>
            <Text
              style={{
                fontWeight: "700",
                color: "#33056F",
              }}>
              Choose Time Slot
            </Text>
            <Icon name='chevron-right' size={22} color={"#33056F"} />
          </Card>
        </TouchableOpacity>
      </View>
    </View>
  );
};
