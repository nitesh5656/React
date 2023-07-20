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

export default function AskForAServiceProductsPanel({ navigation, activeId }) {
  const { user } = useSelector((state) => state.auth);
  const [productData, setProductData] = useState([]);
  const dispatch = useDispatch();

  const servicesProducts = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setProductData([]);

      const { data } = await axiosInstance.get(
        `/service/${activeId}/products?page=${pageParam + 1}&limit=20`
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
    ["servicesProducts", activeId],
    servicesProducts,
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

  let hours = new Date().getHours(); //To get the Current Hours

  const AskForAServiceProducts = ({ navigation, product }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";

    return (
      <View
        style={{
          padding: 0,
        }}
      >
        <Card
          containerStyle={{
            padding: 8,
            margin: 0,
            borderRadius: 10,
            flex: 1,
          }}
        >
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
              }}
            >
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
                }}
              >
                {product?.discountType === "PERCENTAGE"
                  ? `${product?.discountValue}% OFF`
                  : `₹ ${product?.discountValue}/- OFF`}
              </Text>
            </View>
          )}
          <Card.Image
            style={{
              height: 85,
            }}
            resizeMode="cover"
            source={{
              uri: IMAGE_URL + "/services/products/" + product?.bannerImg,
            }}
            onPress={() =>
              navigation.navigate("AskForAService ProductDetails", {
                productId: product._id,
                serviceId: activeId,
              })
            }
          />
          <View style={{ paddingTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                width: categoryImgWidth,
              }}
            >
              {product[nameKey]}
            </Text>

            <View style={{ marginTop: 6 }}>
              <View
                style={{
                  opacity: hours >= 8 && hours < 18 ? 1 : 0.3,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: "700" }}>
                  Min. service charge
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}
                >
                  ₹ {product?.serviceCharge}/-
                </Text>
              </View>

              <View
                style={{
                  opacity: hours > 18 || hours < 8 ? 1 : 0.3,
                }}
              >
                <Text style={{ fontSize: 10, fontWeight: "700" }}>
                  Emergency charge
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}
                >
                  ₹ {product.emergencyCharge}/-
                </Text>
              </View>

              <View style={{ marginVertical: 6 }}>
                {user?.cart?.serviceType?.type === "SERVICES" &&
                user?.cart?.items?.some((item) => item === product._id) ? (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        removeCartHandler(
                          user,
                          dispatch,
                          product._id,
                          "SERVICES",
                          activeId
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10 }}
                      titleStyle={{ fontWeight: "700", fontSize: 11 }}
                    >
                      Remove From Cart
                    </Button>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        addToCartButton(
                          activeId,
                          user,
                          product._id,
                          dispatch,
                          "SERVICES"
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10 }}
                      titleStyle={{ fontWeight: "700", fontSize: 11 }}
                    >
                      Book Now
                    </Button>
                  </TouchableOpacity>
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
          <AskForAServiceProducts product={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          paddingVertical: 3,
        }}
        contentContainerStyle={{
          paddingTop: 10,
        }}
        onEndReached={loadMore}
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
      
      {user?.cart?.serviceType?.type === "SERVICES" &&
        user?.cart?.serviceType?.id === activeId && (
          <View style={{ padding: 10 }}>
            <ItemCart
              navigation={navigation}
              items={user?.cart?.items?.length}
              type={"Ask for a Service"}
            />
          </View>
        )}
    </>
  );
}
