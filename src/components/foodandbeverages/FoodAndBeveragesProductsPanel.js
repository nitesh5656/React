import {
  View,
  Dimensions,
  Text,
  TouchableOpacity,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Button, Card } from "@rneui/themed";
import ItemCart from "../general/itemcart";

import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { addToCartButton, removeCartHandler } from "../../utils/cart";
import SubLoader from "../general/loader/SubLoader";

const screenWidth = Dimensions.get("window").width;
const categoryImgWidth = screenWidth / 3 - 10;

export default function FoodAndBeveragesProductsPanel({
  navigation,
  activeId,
}) {
  const { user } = useSelector((state) => state.auth);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();
  
  const fetchMenuProducts = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setProductData([]);

      const { data } = await axiosInstance.get(
        `/restaurant/${activeId}/products?page=${pageParam + 1}&limit=20`
      );

      pageParam === 0
        ? setProductData(data.message)
        : setProductData([...productData, ...data.message]);

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["fetchMenuProducts", activeId],
    fetchMenuProducts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.next) return pages.length;
      },
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  const FoodAndBeveragesProducts = ({ navigation, product }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";

  let discountedPrice = product?.discountType === "PERCENTAGE" ?
  product?.productPrice - ((product?.productPrice*product.discountValue)/100) : (product?.productPrice - product.discountValue);

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
            borderRadius: 10,
            flex: 1,
          }}>
            {product?.discountValue > 0 &&
          <View style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '65%',
            borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
            zIndex: 1,
          }}>
            <Text style={{
              color: '#fff',
              borderTopRightRadius: 20,
            borderBottomRightRadius: 20,
              fontWeight: '700',
              padding: 3,
              paddingLeft: 8,
              fontSize: 11,
              backgroundColor: 'red',
            }}>
              {product?.discountType === "PERCENTAGE" ?
              `${product?.discountValue}% OFF`
              :
              `₹ ${product?.discountValue}/- OFF`
              }
            </Text>
          </View>}
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
                foodAndBeveragesId: activeId,
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
              {/* <View>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}>
                  ₹ {product?.productPrice}/-
                </Text>
              </View> */}

              <View>
            {product.discountValue > 0 ?
              <View style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
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
                  textDecorationLine: 'line-through',
                }}>
                ₹ {product?.productPrice}/-
              </Text>
              </View>
              :
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#FF9431",
                }}>
                ₹ {product?.productPrice}/-
              </Text>}
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
                            activeId
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
                            activeId,
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
                        activeId,
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
    <>
    {productData.length > 0 ? (
        <FlatList
        data={productData}
        renderItem={({ item }) => (
          <FoodAndBeveragesProducts product={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          paddingVertical: 3,
        }}
        onEndReached={loadMore}
        contentContainerStyle={
          {
            // paddingTop: 10,
            // paddingBottom: 150,
          }
        }
      />
      ) : (
        <View style={{
          flex: 1,
          width: screenWidth,
        }}>
          {/* <Text>We will show animation here !</Text> */}
          <SubLoader navigation={navigation} />
        </View>
      )}
      
      {user?.cart?.serviceType?.type === "FOODANDBEVERAGES" &&
        user?.cart?.serviceType?.id === activeId && (
          <View style={{ padding: 10 }}>
            <ItemCart
              navigation={navigation}
              items={user?.cart?.items?.length}
              type={"Food And Beverages"}
            />
          </View>
        )}
    </>
  );
}
