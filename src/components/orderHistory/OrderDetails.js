import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import {  Card } from "@rneui/themed";
import { Image } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getDateWithTime } from "../../utils/daysAgo";
import { IMAGE_URL } from "@env";

export default function OrderDetailsPanel({ navigation, data, status }) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#E7D6FD",
      }}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            padding: 10,
          }}>
          <View
            style={{
              backgroundColor: "#fff",
              marginBottom: 15,
              padding: 10,
            }}>
            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 6,
              }}>
              <Text
                style={{
                  fontWeight: "600",
                  minWidth: 100,
                }}>
                Order Id{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                : {data?.orderId}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 6,
              }}>
              <Text
                style={{
                  fontWeight: "600",
                  minWidth: 100,
                }}>
                Created At
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                : {getDateWithTime(data?.createdAt)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: "row",
                gap: 10,
                alignItems: "center",
                padding: 6,
              }}>
              <Text
                style={{
                  fontWeight: "600",
                  minWidth: 100,
                }}>
                Delivery Status{" "}
              </Text>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 16,
                }}>
                : {status}
              </Text>
            </View>

            {/* <View style={{
                flexDirection: 'row',
                gap: 10,
                alignItems: 'center',
                padding: 6,
            }}>
                <Text style={{
                    fontWeight: '600',
                    minWidth: 100,
                }}>Time Slot </Text>
                <Text style={{
                    fontWeight: '700',
                    fontSize: 16,
                }}>: 02:00 PM - 03:00 PM</Text> 
            </View> */}
          </View>

          <View>
            {data?.product?.foodAndBeverages?.length !== 0 &&
              data?.product?.foodAndBeverages.map((data) => {
                return <FoodAndBeverages navigation={navigation} data={data} />;
              })}

            {data?.product?.dailyNeeds?.length !== 0 &&
              data?.product?.dailyNeeds.map((data) => {
                return <DailyNeeds navigation={navigation} data={data} />;
              })}

            {data?.product?.service?.length !== 0 &&
              data?.product?.service.map((data) => {
                return <Service navigation={navigation} data={data} />;
              })}
          </View>

          <BillSummary data={data} />
        </View>
      </ScrollView>

      <View
        style={{
          borderTopRightRadius: 20,
          borderTopLeftRadius: 20,
        }}>
        {/* <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: `center`,
            gap: 50,
            paddingVertical: 15,
            backgroundColor: '#fff',
            borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
          }}
        >
          {status !== "Canceled" && (
            <Button
              title={"Re-Order"}
              titleStyle={{
                fontWeight: "700",
                color: "#FF9431",
                fontSize: 14,
              }}
              buttonStyle={{
                backgroundColor: "transparent",
                borderWidth: 1.5,
                borderColor: "#FF9431",
                borderRadius: 8,
              }}
            />
          )}
          <Button
            title={"Suggest A Product"}
            onPress={() =>
              navigation.navigate("Suggestions")
            }
            titleStyle={{
              fontWeight: "700",
              color: "#FF9431",
              fontSize: 14,
            }}
            buttonStyle={{
              backgroundColor: "transparent",
              borderWidth: 1.5,
              borderColor: "#FF9431",
              borderRadius: 8,
            }}
          />
        </View> */}

        <View
          style={{
            backgroundColor: "green",
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
          }}>
          <Text
            style={{
              color: "#fff",
            }}>
            You have saved
          </Text>
          <Text
            style={{
              // color: '#FF9431',
              color: "#fff",
              fontWeight: "700",
              fontSize: 18,
            }}>
            ₹ {data?.savedAmount}/-
          </Text>
        </View>
      </View>
    </View>
  );
}

const BillSummary = ({ navigation, type, data }) => {
  return (
    <View
      style={{
        marginTop: 15,
      }}>
      <Card
        containerStyle={{
          margin: 0,
          borderRadius: 6,
        }}
        // wrapperStyle={{
        //   flex: 1,
        //   gap: 4,
        // }}
      >
        {/* <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                // flex: 1,
              }}
            >
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >
                  SubTotal
                </Text>
              </View>
  
              <View
                style={{
                  minWidth: 80,
                  alignItems: "flex-end",
                }}
              >
                <Text
                  style={{
                    fontWeight: "700",
                    fontSize: 16,
                  }}
                >₹ {data.finalAmount}/-
                </Text>
              </View>
            </View> */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // flex: 1,
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
              ₹ {data?.taxAmount}/-
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            // flex: 1,
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
              Delivery Charges
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
              ₹ {data?.deliveryCharge}/-
            </Text>
          </View>
        </View>

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
            // flex: 1,
          }}>
          <View style={{}}>
            <Text
              style={{
                fontWeight: "700",
                fontSize: 16,
              }}>
              Total Amout
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
              ₹ {data?.finalAmount}/-
            </Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const FoodAndBeverages = ({ navigation, data }) => {
  let discountedPrice =
    data?.discountType === "PERCENTAGE"
      ? +data?.productPrice - (+data?.productPrice * +data?.discountValue) / 100
      : +data?.productPrice - +data?.discountValue;

  let finalPrice = Math.ceil(discountedPrice);
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("FoodAndBeverages ProductDetails", {
          type: "Food And Beverages",
          productId: data._id,
          foodAndBeveragesId: data.restaurantMenu._id,
        });
      }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#fff",
          marginBottom: 2,
        }}>
        <Image
          source={{
            uri: IMAGE_URL + "/restaurant/products/" + data?.img,
          }}
          alt='img'
          style={{ width: 60, height: 60 }}
        />

        <View
          style={{
            gap: 4,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 16,
            }}>
            {data.label}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}>
            <MaterialIcon name='local-restaurant' size={18} color={"#33056F"} />
            <Text
              style={{
                color: "#33056F",
                fontWeight: "700",
              }}>
              {data?.restaurantMenu?.restaurant.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}>
          {data?.discountValue > 0 && (
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                opacity: 0.6,
                textDecorationLine: "line-through",
              }}>
              {data?.discountType === "PERCENTAGE"
                ? `${data?.discountValue}% OFF`
                : `₹ ${data?.discountValue} OFF`}
            </Text>
          )}
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
            }}>
            ₹ {finalPrice}/-
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const Service = ({ navigation, data }) => {
  data = data.id;
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate("AskForAService ProductDetails", {
          productId: data._id,
          serviceId: data.serviceType._id,
        });
      }}>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#fff",
          marginBottom: 2,
        }}>
        <Image
          source={{
            uri: IMAGE_URL + "/services/products/" + data?.bannerImg,
          }}
          alt='img'
          style={{ width: 60, height: 60 }}
        />

        <View
          style={{
            gap: 4,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 16,
            }}>
            {data.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}>
            <Image
              source={require("../../../assets/images/service-icon.png")}
              alt='img'
              style={{
                width: 22,
                height: 22,
              }}
            />
            <Text
              style={{
                color: "#33056F",
                fontWeight: "700",
              }}>
              {data?.serviceType?.service.name}
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}>
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
              ₹ {data?.serviceCharge}/-
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
              ₹ {data.emergencyCharge}/-
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const DailyNeeds = ({ navigation, data }) => {
  let unitId = data.unitId;
  data = data.id;

  let selectedUnit = data.productPriceInfo.find(
    (priceInfo) => priceInfo._id == unitId
  );

  let discountedPrice =
    data?.discountType === "PERCENTAGE"
      ? selectedUnit.productPrice -
        (selectedUnit.productPrice * data.discountValue) / 100
      : selectedUnit.productPrice - data.discountValue;

  let finalPrice = Math.ceil(discountedPrice);

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() =>
        navigation.navigate("DailyNeeds ProductDetails", {
          type: "DailyNeeds",
          productId: data._id,
          dailyNeedTypeId: data.dailyNeed._id,
        })
      }>
      <View
        style={{
          padding: 10,
          flexDirection: "row",
          gap: 10,
          backgroundColor: "#fff",
          marginBottom: 2,
        }}>
        <Image
          source={{
            uri: IMAGE_URL + "/dailyneeds/products/" + data?.img,
          }}
          alt='img'
          style={{ width: 60, height: 60 }}
        />

        <View
          style={{
            gap: 4,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 16,
            }}>
            {data.name}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}>
            <MaterialCommunityIcon
              name='cart-variant'
              size={18}
              color={"#33056F"}
            />
            <Text
              style={{
                color: "#33056F",
                fontWeight: "700",
              }}>
              Daily Needs
            </Text>
          </View>
        </View>

        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
          }}>
          {data?.discountValue > 0 && (
            <Text
              style={{
                fontWeight: "700",
                fontSize: 14,
                opacity: 0.6,
                textDecorationLine: "line-through",
              }}>
              {data?.discountType === "PERCENTAGE"
                ? `${data?.discountValue}% OFF`
                : `₹ ${data?.discountValue} OFF`}
            </Text>
          )}
          <Text
            style={{
              fontWeight: "700",
              fontSize: 16,
            }}>
            ₹ {finalPrice}/-
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};
