import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React from "react";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { addToCartButton, removeCartHandler } from "../../../utils/cart";
import { Button, Card } from "@rneui/themed";
import categoryImgWidth from "../../../utils/Dimensions";
export default function SearchResultsFoodAndBeverages({
  navigation,
  data,
  searchText,
}) {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const loadMore = () => {
    // if (hasNextPage) fetchNextPage();
  };

  const FoodAndBeveragesProducts = ({ navigation, product }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";

    let discountedPrice =
      product?.discountType === "PERCENTAGE"
        ? product?.productPrice -
          (product?.productPrice * product.discountValue) / 100
        : product?.productPrice - product.discountValue;

    let finalPrice = Math.ceil(discountedPrice);
    return (
      <View
        style={{
          padding: 0,
          width: "42%",
        }}>
        <Card
          containerStyle={{
            padding: 8,
            margin: 0,
            borderRadius: 10,
            flex: 1,
          }}>
          {product?.discountValue > 0 && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "65%",
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20,
                zIndex: 1,
              }}>
              <Text
                style={{
                  color: "#fff",
                  borderTopRightRadius: 20,
                  borderBottomRightRadius: 20,
                  fontWeight: "700",
                  padding: 3,
                  paddingLeft: 8,
                  fontSize: 11,
                  backgroundColor: "red",
                }}>
                {product?.discountType === "PERCENTAGE"
                  ? `${product?.discountValue}% OFF`
                  : `₹ ${product?.discountValue}/- OFF`}
              </Text>
            </View>
          )}
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
                foodAndBeveragesId: product.restaurantMenu,
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
                {product.discountValue > 0 ? (
                  <View
                    style={{
                      flexDirection: "row",
                      gap: 10,
                      alignItems: "center",
                    }}>
                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 14,
                        color: "#FF9431",
                      }}>
                      ₹ {finalPrice}/-
                    </Text>

                    <Text
                      style={{
                        fontWeight: "700",
                        fontSize: 10,
                        color: "#33056F",
                        textDecorationLine: "line-through",
                      }}>
                      ₹ {product?.productPrice}/-
                    </Text>
                  </View>
                ) : (
                  <Text
                    style={{
                      fontWeight: "700",
                      fontSize: 14,
                      color: "#FF9431",
                    }}>
                    ₹ {product?.productPrice}/-
                  </Text>
                )}
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
                            product.restaurantMenu
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
                            product.restaurantMenu,
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
                        product.restaurantMenu,
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

  return (
    data && (
      <View
        style={{
          flex: 1,
        }}>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
            padding: 10,
          }}>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 14,
            }}>
            Search Results For :
          </Text>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
              color: "#FF9431",
            }}>
            {searchText}
          </Text>
        </View>

        {data?.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 22,
              }}>
              No Result Found
            </Text>
          </View>
        ) : (
          <FlatList
            data={data}
            renderItem={({ item }) => (
              <FoodAndBeveragesProducts
                product={item}
                navigation={navigation}
              />
            )}
            keyExtractor={(item) => item._id}
            numColumns={2}
            columnWrapperStyle={{
              justifyContent: "space-around",
              paddingVertical: 3,
            }}
            onEndReached={loadMore}
          />
        )}
      </View>
    )
  );
}
