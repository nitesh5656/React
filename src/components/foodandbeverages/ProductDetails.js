import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useState, useEffect } from "react";
import Ionicons from "react-native-vector-icons/Ionicons";
import { categoryImgWidth, screenWidth } from "../../utils/Dimensions";
import { Button, Card } from "@rneui/themed";
import ItemCart from "../general/itemcart";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/interceptor";
import { addToCartButton, removeCartHandler } from "../../utils/cart";

export default function FoodAndBeveragesProductDetailsPanel({
  navigation,
  productId,
  foodAndBeveragesId,
}) {
  const { user } = useSelector((user) => user.auth);
  const [productData, setProductData] = useState(null);
  const [similarProducts, setSimilarProducts] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/restaurant/${foodAndBeveragesId}/products/${productId}`
        );
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
          `/restaurant/${foodAndBeveragesId}/products/${productId}/similar`
        );
        setSimilarProducts(data.message);
      } catch (err) {
        console.log(err);
        setSimilarProducts({});
      }
    })();
  }, []);

  const SimilarProductsData = ({ navigation, product }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";

    return (
      <View
        style={{
          padding: 0,
        }}>
        <Card
          containerStyle={{
            padding: 8,
            margin: 0,
            borderRadius: 10,
            flex: 1,
          }}>
          <Card.Image
            style={{
              height: 85,
              borderRadius: 7,
            }}
            resizeMode='cover'
            source={{
              uri: IMAGE_URL + "/restaurant/products/" + product?.img,
            }}
            onPress={() =>
              navigation.navigate("FoodAndBeverages ProductDetails", {
                type: "Food And Beverages",
                productId: product._id,
                foodAndBeveragesId: foodAndBeveragesId,
              })
            }
          />
          <View style={{ paddingTop: 5, gap: 6, flex: 1 }}>
            <View style={{ flex: 1 }}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                {product[nameKey]}
              </Text>

              <Text
                style={{
                  fontSize: 10,
                  fontWeight: "700",
                  width: categoryImgWidth,
                }}>
                {product?.productSize} {product?.productUnit?.unitValue}
              </Text>
            </View>

            <View style={{ marginTop: 6 }}>
              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}>
                  ₹ {product?.productPrice}/-
                </Text>
              </View>

              <View style={{ marginVertical: 6 }}>
                {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
                user?.cart?.items?.some((item) => item === product._id) ? (
                  <TouchableOpacity>
                    <View
                      style={{
                        backgroundColor: "#FF9431",
                        borderRadius: 30,
                        flexDirection: "row",
                        justifyContent: "space-evenly",
                        alignContent: "center",
                        height: 35,
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
                            product._id,
                            "FOODANDBEVERAGES",
                            foodAndBeveragesId
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
                            (item) => item === product._id
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
                            foodAndBeveragesId,
                            user,
                            product._id,
                            dispatch,
                            "FOODANDBEVERAGES"
                          )
                        }>
                        {" "}
                        +{" "}
                      </Button>
                    </View>
                  </TouchableOpacity>
                ) : (
                  <Button
                    onPress={() =>
                      addToCartButton(
                        foodAndBeveragesId,
                        user,
                        product._id,
                        dispatch,
                        "FOODANDBEVERAGES"
                      )
                    }
                    buttonStyle={{ backgroundColor: "transparent" }}
                    containerStyle={{
                      borderRadius: 10,
                      borderColor: "#FF9431",
                      borderWidth: 1,
                      height: 35,
                    }}
                    titleStyle={{
                      fontWeight: "700",
                      fontSize: 10,
                      color: "#FF9431",
                    }}>
                    ADD TO CART
                  </Button>
                )}
              </View>
            </View>
          </View>
        </Card>
      </View>
    );
  };

  let discountedPrice =
    productData?.discountType === "PERCENTAGE"
      ? productData?.productPrice -
        (productData?.productPrice * productData?.discountValue) / 100
      : productData?.productPrice - productData?.discountValue;

  let finalPrice = Math.ceil(discountedPrice);

  return (
    productData && (
      <View
        style={{
          flex: 1,
          backgroundColor: "#E7D6FD",
          paddingTop: 28,
        }}>
        <View
          style={{
            width: screenWidth,
            height: screenWidth - 80,
            justifyContent: "center",
            alignItems: "center",
          }}>
          <Image
            source={{
              uri: IMAGE_URL + "/restaurant/products/" + productData?.img,
            }}
            style={{ height: "100%", width: "100%", borderRadius: 10 }}
            resizeMode='cover'
          />
        </View>

        <View
          style={{
            position: "absolute",
            top: 40,
            flexDirection: "row",
            justifyContent: "space-between",
            width: screenWidth,
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View
              style={{
                borderColor: "#33056F",
                borderRadius: 10,
                borderWidth: 0,
              }}>
              <Ionicons name='chevron-back' color={"#FFF"} size={32} />
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
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          }}>
          <ScrollView>
            <View
              style={{
                rowGap: 20,
                paddingTop: 22,
              }}>
              {productData?.discountValue > 0 && (
                <View
                  style={{
                    alignItems: "flex-start",
                  }}>
                  <Text
                    style={{
                      color: "#fff",
                      borderRadius: 30,
                      fontWeight: "700",
                      paddingHorizontal: 10,
                      paddingVertical: 6,
                      fontSize: 14,
                      backgroundColor: "red",
                    }}>
                    {productData?.discountType === "PERCENTAGE"
                      ? `${productData?.discountValue}% OFF`
                      : `₹ ${productData?.discountValue}/- OFF`}
                  </Text>
                </View>
              )}

              <View style={{ gap: 10 }}>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: "700",
                  }}>
                  {productData?.name}
                </Text>

                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "700",
                  }}>
                  ( {productData?.productSize}{" "}
                  {productData?.productUnit?.unitValue} )
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  {productData?.discountValue > 0 ? (
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 10,
                        alignItems: "center",
                      }}>
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
                        ₹ {productData?.productPrice}/-
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
                        ₹ {productData?.productPrice}/-
                      </Text>
                    </View>
                  )}
                </View>

                {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
                user?.cart?.items?.some((item) => item === productData._id) ? (
                  <View
                    style={{
                      minWidth: 100,
                    }}>
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
                              productData._id,
                              "FOODANDBEVERAGES",
                              foodAndBeveragesId
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
                              (item) => item === productData._id
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
                              foodAndBeveragesId,
                              user,
                              productData._id,
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
                          foodAndBeveragesId,
                          user,
                          productData._id,
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

              <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  Description :
                </Text>

                <Text style={{}}>{productData.description}</Text>
              </View>

              <View
                style={{
                  paddingBottom:
                    user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
                    user?.cart?.serviceType?.id === foodAndBeveragesId
                      ? 70
                      : 0,
                }}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                    marginBottom: 5,
                  }}>
                  Similar Products :
                </Text>

                <FlatList
                  data={similarProducts}
                  renderItem={({ item }) => (
                    <SimilarProductsData
                      product={item}
                      navigation={navigation}
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

        {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
          user?.cart?.serviceType?.id === foodAndBeveragesId && (
            <View
              style={{
                paddingHorizontal: 10,
                backgroundColor: "#fff",
                position: "absolute",
                bottom: 0,
                width: screenWidth,
              }}>
              <ItemCart
                navigation={navigation}
                items={user?.cart?.items?.length}
                type={"Food And Beverages"}
              />
            </View>
          )}
      </View>
    )
  );
}
