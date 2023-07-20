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
import Carousel, { Pagination } from "react-native-snap-carousel";
import { useRef } from "react";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import axiosInstance from "../../utils/interceptor";
import { addToCartButton, removeCartHandler } from "../../utils/cart";

export default function AskForAServiceProductDetailsPanel({
  navigation,
  serviceId,
  productId,
}) {
  const { user } = useSelector((user) => user.auth);
  const [productData, setProductData] = useState(null);
  const isCarousel = useRef(null);
  const dispatch = useDispatch();
  const [index, setIndex] = useState(0);
  const [similarProducts, setSimilarProducts] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get(
          `/service/${serviceId}/products/${productId}`
        );
        console.log(data);
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
          `/service/${serviceId}/products/${productId}/similar`
        );
        setSimilarProducts(data.message);
      } catch (err) {
        console.log(err);
        setSimilarProducts({});
      }
    })();
  }, []);

  const CarouselCardItem = ({ item, index }) => {
    return (
      <View
        key={index}
        style={{
          width: screenWidth,
          height: 300,
          justifyContent: "center",
          alignItems: "center",
          // backgroundColor: 'blue',
        }}>
        <Image
          source={{
            uri: IMAGE_URL + "/services/products/" + item,
          }}
          style={{ height: 200, width: 300, marginTop: 20 }}
          resizeMode='cover'
        />
      </View>
    );
  };

  let hours = new Date().getHours(); //To get the Current Hours

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
            }}
            resizeMode='cover'
            source={{
              uri: IMAGE_URL + "/services/products/" + product?.bannerImg,
            }}
            onPress={() =>
              navigation.navigate("AskForAService ProductDetails", {
                productId: product._id,
                serviceId: serviceId,
              })
            }
          />
          <View style={{ paddingTop: 5 }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: "700",
                width: categoryImgWidth,
              }}>
              {product[nameKey]}
            </Text>

            <View style={{ marginTop: 6 }}>
              <View
                style={{
                  opacity: hours >= 8 && hours < 18 ? 1 : 0.3,
                }}>
                <Text style={{ fontSize: 10, fontWeight: "700" }}>
                  Min. service charge
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}>
                  ₹ {product?.serviceCharge}/-
                </Text>
              </View>

              <View
                style={{
                  opacity: hours > 18 || hours < 8 ? 1 : 0.3,
                }}>
                <Text style={{ fontSize: 10, fontWeight: "700" }}>
                  Emergency charge
                </Text>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 14,
                    color: "#FF9431",
                  }}>
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
                          serviceId
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10 }}
                      titleStyle={{ fontWeight: "700", fontSize: 11 }}>
                      Cancel
                    </Button>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        addToCartButton(
                          serviceId,
                          user,
                          product._id,
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
          </View>
        </Card>
      </View>
    );
  };

  return (
    productData && (
      <View
        style={{
          flex: 1,
          backgroundColor: "#E7D6FD",
          paddingTop: 28,
        }}>
        <View>
          <Carousel
            layout='default'
            ref={isCarousel}
            data={productData.bannerImg}
            renderItem={CarouselCardItem}
            sliderWidth={screenWidth + 80}
            itemWidth={screenWidth + 80}
            loop
            // autoplay
          />
          <View>
            <Pagination
              dotsLength={productData?.bannerImg?.length}
              activeDotIndex={index}
              carouselRef={isCarousel}
              dotStyle={{
                width: 10,
                height: 10,
                borderRadius: 5,
                marginHorizontal: 8,
                backgroundColor: "#F4BB41",
              }}
              tappableDots={true}
              inactiveDotStyle={{
                backgroundColor: "black",
                // Define styles for inactive dots here
              }}
              inactiveDotOpacity={0.4}
              inactiveDotScale={0.6}
            />
          </View>
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
              <Ionicons name='chevron-back' color={"#33056F"} size={32} />
            </View>
          </TouchableOpacity>
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
              <Text
                style={{
                  fontSize: 22,
                  fontWeight: "700",
                }}>
                {productData?.name}
              </Text>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}>
                <View>
                  <View
                    style={{
                      opacity: hours >= 6 && hours < 18 ? 1 : 0.3,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                      }}>
                      Min. Service Charge
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FF9431",
                      }}>
                      ₹ {productData.serviceCharge}/-
                    </Text>
                  </View>

                  <View
                    style={{
                      opacity: hours >= 18 && hours <= 22 ? 1 : 0.3,
                    }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                      }}>
                      Emergency Charge
                    </Text>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: "700",
                        color: "#FF9431",
                      }}>
                      ₹ {productData?.emergencyCharge}/-
                    </Text>
                  </View>
                </View>
                {user?.cart?.serviceType?.type === "SERVICES" &&
                user?.cart?.items?.some((item) => item === productData._id) ? (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        removeCartHandler(
                          user,
                          dispatch,
                          productData._id,
                          "SERVICES",
                          serviceId
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10, minWidth: 100 }}
                      titleStyle={{ fontWeight: "700", fontSize: 16 }}>
                      Cancel
                    </Button>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        addToCartButton(
                          serviceId,
                          user,
                          productData._id,
                          dispatch,
                          "SERVICES"
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10, minWidth: 100 }}
                      titleStyle={{ fontWeight: "700", fontSize: 16 }}>
                      Book
                    </Button>
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  paddingBottom:
                    user?.cart?.serviceType?.type === "SERVICES" &&
                    user?.cart?.items?.length > 0
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
                  }}
                />
              </View>
            </View>
            <View></View>
          </ScrollView>
        </View>

        {user?.cart?.serviceType?.type === "SERVICES" &&
          user?.cart?.serviceType?.id === serviceId && (
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
                type={"Ask for a Service"}
              />
            </View>
          )}
      </View>
    )
  );
}

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
