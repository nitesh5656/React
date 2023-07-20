import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { Button, Card } from "@rneui/themed";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import { addToCartButton, removeCartHandler } from "../../../utils/cart";
import categoryImgWidth from "../../../utils/Dimensions";
export default function SearchResultsServices({
  navigation,
  data,
  searchText,
}) {
  const { user } = useSelector((user) => user.auth);
  const dispatch = useDispatch();

  const loadMore = () => {
    // if (hasNextPage) fetchNextPage();
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
            }}
            resizeMode='cover'
            source={{
              uri: IMAGE_URL + "/services/products/" + product?.bannerImg,
            }}
            onPress={() =>
              navigation.navigate("AskForAService ProductDetails", {
                productId: product._id,
                serviceId: product.serviceType,
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
                          product.serviceType
                        )
                      }
                      buttonStyle={{ backgroundColor: "#FF9431" }}
                      containerStyle={{ borderRadius: 10 }}
                      titleStyle={{ fontWeight: "700", fontSize: 11 }}>
                      Remove From Cart
                    </Button>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity>
                    <Button
                      onPress={() =>
                        addToCartButton(
                          product.serviceType,
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
      )}
    </View>
  );
}
