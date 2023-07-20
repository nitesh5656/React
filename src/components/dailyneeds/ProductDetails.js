import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import { useEffect } from "react";
import { useState } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { screenWidth } from "../../utils/Dimensions";
import { Button } from "@rneui/themed";
import ItemCart from "../general/itemcart";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "@mobile-reality/react-native-select-pro";
import { IMAGE_URL } from "@env";
import axiosInstance from "../../utils/interceptor";
import DailyNeedsProducts from "./DailyNeedsProductUI";
import {
  addToCartButtonInDailyNeeds,
  removeCartHandler,
} from "../../utils/cart";

export default function ProductDetailsPanel({
  navigation,
  type,
  productId,
  dailyNeedTypeId,
}) {
  const { user } = useSelector((user) => user.auth);
  const [productData, setProductData] = useState(null);
  const [selectedUnit, setSelectedUnit] = useState({});
  const dispatch = useDispatch();
  const [similarProducts, setSimilarProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/dailyneeds/${dailyNeedTypeId}/products/${productId}`
        );
        setSelectedUnit(data.message?.productPriceInfo[0]);
        setProductData(data.message);
      } catch (err) {
        console.log(err);
        setProductData({});
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/dailyneeds/${dailyNeedTypeId}/products/${productId}/similar`
        );
        setSimilarProducts(data.message);
      } catch (err) {
        console.log(err);
        setSimilarProducts({});
      }
    })();
  }, []);

  let discountedPrice =
    productData?.discountType === "PERCENTAGE"
      ? selectedUnit?.productPrice -
        (selectedUnit?.productPrice * productData?.discountValue) / 100
      : selectedUnit?.productPrice - productData?.discountValue;

  let finalPrice = Math.ceil(discountedPrice);

  return (
    productData && (
      <View
        style={{
          flex: 1,
          backgroundColor: "#E7D6FD",
          paddingTop: 28,
        }}
      >
        {type === "Service" ? (
          <View
            style={{
              width: screenWidth,
              height: 300,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: IMAGE_URL + "/dailyneeds/products/" + productData?.img,
              }}
              style={{ height: 200, width: 200 }}
              resizeMode="contain"
            />
          </View>
        ) : (
          <View
            style={{
              width: screenWidth,
              height: screenWidth-80,
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{
                uri: IMAGE_URL + "/dailyneeds/products/" + productData?.img,
              }}
              style={{ height: "100%", width: "100%" }}
              resizeMode="contain"
            />
          </View>
        )}

        <View
          style={{
            position: "absolute",
            top: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            width: screenWidth,
            paddingHorizontal: 20,
          }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                borderColor: "#33056F",
                borderRadius: 10,
                borderWidth: 0,
              }}
            >
              <Ionicons name="chevron-back" color={"#FFF"} size={32} />
            </View>
          </TouchableOpacity>
          {/* <View
            style={{
              borderColor: "#33056F",
              borderRadius: 10,
              borderWidth: 2,
            }}>
            <Ionicons name='share-social' color={"#33056F"} size={28} />
          </View> */}
        </View>

        <View
          style={{
            backgroundColor: "#fff",
            flex: 1,
            paddingHorizontal: 20,
            paddingTop: 3,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
          }}
        >
          <ScrollView>
            <View
              style={{
                rowGap: 20,
                paddingTop: 22,
              }}
            >
              {productData?.discountValue > 0 && (
                <View
                  style={{
                    alignItems: 'flex-start',
                  }}
                >
                  <Text
                    style={{
                      color: "#fff",
                      borderRadius: 30,
                      fontWeight: "700",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      fontSize: 14,
                      backgroundColor: "red",
                    }}
                  >
                    {productData?.discountType === "PERCENTAGE"
                      ? `${productData?.discountValue}% OFF`
                      : `₹ ${productData?.discountValue}/- OFF`}
                  </Text>
                </View>
              )}
              <View
                style={{
                  gap: 10,
                }}
              >
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: "700",
                  }}
                >
                  {productData?.name}
                </Text>

                <Select
                  options={productData?.productPriceInfo?.map((unit) => {
                    return {
                      label: `${unit.size} ${unit.productUnit?.unitValue}`,
                      value: unit,
                    };
                  })}
                  onSelect={({ value }) => setSelectedUnit(value)}
                  defaultOption={
                    productData?.productPriceInfo?.map((unit) => {
                      return {
                        label: `${unit.size} ${unit.productUnit?.unitValue}`,
                        value: unit,
                      };
                    })[0]
                  }
                  clearable={false}
                  styles={{
                    select: {
                      text: {
                        fontWeight: "700",
                      },
                      container: {
                        borderColor: "rgba(255,148,49,0.2)",
                      },
                    },
                    optionsList: {
                      backgroundColor: "#E7D6FD",
                    },

                    option: {
                      text: {
                        fontWeight: "700",
                      },
                      selected: {
                        text: {
                          color: "#fff",
                        },
                        container: {
                          backgroundColor: "#33056F",
                        },
                      },
                    },
                    sectionHeader: {},
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View>
                  {productData?.discountValue > 0 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 22,
                          color: "#FF9431",
                        }}
                      >
                        ₹ {finalPrice}/-
                      </Text>

                      <Text
                        style={{
                          fontWeight: "700",
                          fontSize: 16,
                          color: "#33056F",
                          textDecorationLine: "line-through",
                        }}
                      >
                        ₹ {selectedUnit.productPrice}/-
                      </Text>
                    </View>
                  ) : (
                    <View>
                      <Text
                        style={{
                          fontSize: 22,
                          fontWeight: "700",
                          color: "#FF9431",
                        }}
                      >
                        ₹ {selectedUnit.productPrice}/-
                      </Text>
                    </View>
                  )}
                </View>

                {user?.cart?.serviceType?.type === "DAILYNEEDS" &&
                user?.cart?.items?.some(
                  (item) =>
                    item.id === productData._id &&
                    item.unitId == selectedUnit._id
                ) ? (
                  <View
                    style={{
                      minWidth: 100,
                    }}
                  >
                    <TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: "#FF9431",
                          borderRadius: 30,
                          flexDirection: "row",
                          justifyContent: "space-evenly",
                          alignContent: "center",
                          height: 35,
                        }}
                      >
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
                              productData._id,
                              "DAILYNEEDS",
                              dailyNeedTypeId,
                              selectedUnit._id
                            )
                          }
                        >
                          {" "}
                          -{" "}
                        </Button>
                        <Text
                          style={{
                            color: "#fff",
                            fontWeight: "700",
                            textAlignVertical: "center",
                          }}
                        >
                          {
                            user?.cart?.items?.filter(
                              (item) =>
                                item.id === productData._id &&
                                item.unitId === selectedUnit._id
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
                            addToCartButtonInDailyNeeds(
                              dailyNeedTypeId,
                              user,
                              productData._id,
                              dispatch,
                              "DAILYNEEDS",
                              selectedUnit._id
                            )
                          }
                        >
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
                        addToCartButtonInDailyNeeds(
                          dailyNeedTypeId,
                          user,
                          productData._id,
                          dispatch,
                          "DAILYNEEDS",
                          selectedUnit._id
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10, height: 35 }}
                      titleStyle={{ fontWeight: "700", fontSize: 14 }}
                    >
                      ADD TO CART
                    </Button>
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Description :
                </Text>

                <Text style={{}}>{productData.description}</Text>
              </View>

              <View
                style={{
                  paddingBottom:
                    user?.cart?.serviceType?.type === "DAILYNEEDS" &&
                    user?.cart?.serviceType?.id === dailyNeedTypeId
                      ? 70
                      : 0,
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 5,
                  }}
                >
                  Similar Products :
                </Text>

                <FlatList
                  data={similarProducts}
                  renderItem={({ item }) => (
                    <DailyNeedsProducts
                      product={item}
                      key={item._id}
                      navigation={navigation}
                      activeId={dailyNeedTypeId}
                    />
                  )}
                  keyExtractor={(item) => item._id}
                  horizontal={true}
                  contentContainerStyle={{
                    paddingTop: 10,
                    gap: 20,
                    // paddingBottom: 150,
                  }}
                />
              </View>
            </View>
            <View></View>
          </ScrollView>
        </View>

        {user?.cart?.serviceType?.type === "DAILYNEEDS" &&
          user?.cart?.serviceType?.id === dailyNeedTypeId && (
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#fff",
                position: "absolute",
                bottom: 0,
                width: screenWidth,
              }}
            >
              <ItemCart
                navigation={navigation}
                items={user?.cart?.items?.length}
                type={"Daily Needs"}
              />
            </View>
          )}
      </View>
    )
  );
}
