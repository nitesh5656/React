import { View, Dimensions, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import { Button, Card } from "@rneui/themed";
import { Select } from "@mobile-reality/react-native-select-pro";
import { IMAGE_URL } from "@env";
import { useSelector, useDispatch } from "react-redux";
import {
  addToCartButtonInDailyNeeds,
  removeCartHandler,
} from "../../utils/cart";

const screenWidth = Dimensions.get("window").width;
const categoryImgWidth = screenWidth / 3 - 10;

const DailyNeedsProducts = ({ navigation, product, activeId }) => {
  const { user } = useSelector((user) => user.auth);
  const [selectedUnit, setSelectedUnit] = useState(
    product?.productPriceInfo[0]
  );
  const dispatch = useDispatch();

  let nameKey =
    user?.language == "ENGLISH"
      ? "name"
      : user?.language?.toLowerCase() + "Name";

  const productPriceInfoOptions = product?.productPriceInfo?.map((unit) => {
    return {
      label: `${unit.size} ${unit.productUnit?.unitValue}`,
      value: unit,
    };
  });

  let discountedPrice = product?.discountType === "PERCENTAGE" ?
  selectedUnit.productPrice - ((selectedUnit.productPrice*product.discountValue)/100) : (selectedUnit.productPrice - product.discountValue);

  let finalPrice = Math.ceil(discountedPrice);

  return (
    <View
      key={product._id}
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
          }}
          resizeMode='cover'
          source={{
            uri: IMAGE_URL + "/dailyneeds/products/" + product?.img,
          }}
          onPress={() =>
            navigation.navigate("DailyNeeds ProductDetails", {
              type: "DailyNeeds",
              productId: product._id,
              dailyNeedTypeId: activeId,
            })
          }
        />
        <View style={{ paddingTop: 5, gap: 6 }}>
          <Text
            style={{
              fontSize: 12,
              fontWeight: "700",
              width: categoryImgWidth,
            }}>
            {product[nameKey]}
          </Text>

          <Select
            options={productPriceInfoOptions}
            defaultOption={productPriceInfoOptions[0]}
            clearable={false}
            onSelect={({ value }) => setSelectedUnit(value)}
            styles={{
              select: {
                text: {
                  fontWeight: "700",
                },
                container: {
                  borderColor: "rgba(255,148,49,0.2)",
                  height: 25,
                },
                arrow: {
                  icon: {
                    width: 18,
                    height: 18,
                  },
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

          <View style={{ marginTop: 6 }}>
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
                  color: "#33056F",
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
                ₹ {selectedUnit.productPrice}/-
              </Text>
              </View>
              :
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#33056F",
                }}>
                ₹ {selectedUnit.productPrice}/-
              </Text>}
            </View>

            <View style={{ marginVertical: 6 }}>
              {user?.cart?.serviceType?.type === "DAILYNEEDS" &&
              user?.cart?.items?.some(
                (item) =>
                  item.id === product._id && item.unitId == selectedUnit._id
              ) ? (
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
                        bottom: 2,
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      titleStyle={
                        {
                          // fontSize: 18,
                        }
                      }
                      onPress={() =>
                        removeCartHandler(
                          user,
                          dispatch,
                          product._id,
                          "DAILYNEEDS",
                          activeId,
                          selectedUnit._id
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
                          (item) =>
                            item.id === product._id &&
                            item.unitId === selectedUnit._id
                        ).length
                      }
                    </Text>
                    <Button
                      containerStyle={{
                        backgroundColor: "transparent",
                        bottom: 2,
                      }}
                      buttonStyle={{
                        backgroundColor: "transparent",
                        color: "#fff",
                      }}
                      onPress={() =>
                        addToCartButtonInDailyNeeds(
                          activeId,
                          user,
                          product._id,
                          dispatch,
                          "DAILYNEEDS",
                          selectedUnit._id
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
                    addToCartButtonInDailyNeeds(
                      activeId,
                      user,
                      product._id,
                      dispatch,
                      "DAILYNEEDS",
                      selectedUnit._id
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

export default DailyNeedsProducts;
