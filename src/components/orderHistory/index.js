import { View, Text, Image } from "react-native";
import { useEffect, useState } from "react";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { ScrollView } from "react-native";
import { Button } from "@rneui/themed";
import { Tab, TabView } from "@rneui/themed";
import axiosInstance from "../../utils/interceptor";
import { getDateWithTime } from "../../utils/daysAgo";

export default function OrderHistoryPanel({ navigation }) {
  const [index, setIndex] = useState(0);
  const [orders, setOrders] = useState(null);
  let status = {
    0: "CURRENT",
    1: "COMPLETED",
    2: "CANCELLED",
  };

  useEffect(() => {
    (async () => {
      try {
        setOrders(null);
        const { data } = await axiosInstance.get(
          "/payment/orders?status=" + status[index]
        );
        setOrders(data.message);
      } catch (err) {
        setOrders([]);
        console.log(err);
      }
    })();
  }, [index]);

  return (
    <View
      style={{
        flex: 1,
      }}>
      <View
        style={{
          backgroundColor: "#ff9431",
          borderRadius: 50,
          margin: 6,
          padding: 4,
        }}>
        <Tab
          value={index}
          onChange={setIndex}
          dense
          buttonStyle={{
            // backgroundColor: '#ff9431',
            borderRadius: 50,
          }}
          indicatorStyle={{
            backgroundColor: "white",
            height: 0,
          }}>
          <Tab.Item
            containerStyle={(active) => ({
              backgroundColor: active ? "#fff" : "#ff9431",
              borderRadius: 50,
            })}
            titleStyle={(active) => ({
              color: active ? "#33056F" : "#FFF",
              fontWeight: "700",
            })}>
            CURRENT
          </Tab.Item>
          <Tab.Item
            containerStyle={(active) => ({
              backgroundColor: active ? "#fff" : "#ff9431",
              borderRadius: 50,
              borderWidth: 0,
            })}
            titleStyle={(active) => ({
              color: active ? "#33056F" : "#FFF",
              fontWeight: "700",
            })}>
            COMPLETED
          </Tab.Item>
          <Tab.Item
            containerStyle={(active) => ({
              backgroundColor: active ? "#fff" : "#ff9431",
              borderRadius: 50,
              borderWidth: 0,
            })}
            titleStyle={(active) => ({
              color: active ? "#33056F" : "#FFF",
              fontWeight: "700",
            })}>
            CANCELED
          </Tab.Item>
        </Tab>
      </View>

      {orders && (
        <TabView value={index} onChange={setIndex} animationType='spring'>
          <TabView.Item style={{ width: "100%" }}>
            <CurrentOrders
              navigation={navigation}
              status={status[index]}
              orders={orders}
            />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <CompletedOrders
              navigation={navigation}
              status={status[index]}
              orders={orders}
            />
          </TabView.Item>
          <TabView.Item style={{ width: "100%" }}>
            <CanceledOrders
              navigation={navigation}
              status={status[index]}
              orders={orders}
            />
          </TabView.Item>
        </TabView>
      )}
    </View>
  );
}

function removeDuplicates(str) {
  const uniqueValues = [...new Set(str.split(",").map((item) => item.trim()))];
  return uniqueValues.join(", ");
}

const getTitleOfProducts = (product) => {
  let title = "";
  if (product?.foodAndBeverages?.length !== 0) {
    product?.foodAndBeverages?.forEach((prd, index) => {
      if (index == 0) title = title + prd.label;
      else title = title + ", " + prd.label;
    });
    title = removeDuplicates(title);
    title = title + " - " + product?.foodAndBeverages?.length;
  }

  if (product?.service?.length !== 0) {
    product?.service?.forEach((prd, index) => {
      if (index == 0) title = title + prd.id.name;
      else title = title + ", " + prd.id.name;
    });
    title = removeDuplicates(title);
    title = title + " - " + product?.service?.length;
  }

  if (product?.dailyNeeds?.length !== 0) {
    product?.dailyNeeds?.forEach((prd, index) => {
      if (index == 0) title = title + prd.id.label;
      else title = title + ", " + prd.id.label;
    });
    title = removeDuplicates(title);
    title = title + " - " + product?.dailyNeeds?.length;
  }

  return title;
};

const CurrentOrders = ({ navigation, orders, status }) => {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: "column-reverse",
          }}>
          {orders.map((item, index) => {
            return (
              <>
                {item?.product?.foodAndBeverages?.length !== 0 && (
                  <FoodAndBeverages
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.dailyNeeds?.length !== 0 && (
                  <DailyNeeds
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.service?.length !== 0 && (
                  <Service
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const Service = ({ navigation, item, status, index }) => {
  return (
    <View
      key={index}
      style={{
        backgroundColor: "#fff",
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          OrderId : {item.orderId}
        </Text>

        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          {getDateWithTime(item.createdAt)}
        </Text>
      </View>

      <View
        style={{
          paddingLeft: 10,
          backgroundColor: `${
            status === "Canceled"
              ? "red"
              : status === "Pending"
              ? "orange"
              : "green"
          }`,
          width: 100,
          paddingVertical: 6,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}>
          {status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <View
          style={{
            gap: 10,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 14,
              paddingRight: 10,
            }}>
            {getTitleOfProducts(item.product)}
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
              {item.product.service[0]?.id?.serviceType?.service.name} 
            </Text>
          </View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}>
            ₹ {item.finalAmount}/-
          </Text>
        </View>

        {item.deliveryStatus !== "Canceled" && (
          <View style={{ width: 80 }}>
            <View
              style={{
                backgroundColor: "green",
                borderRadius: 6,
                // gap: 4,
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 60,
              }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#fff",
                }}>
                ₹ {item.savedAmount}
                /-
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#fff",
                  opacity: 0.75,
                }}>
                Saved
              </Text>
            </View>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: `center`,
          gap: 50,
          marginBottom: 20,
        }}>
        {/* {item.deliveryStatus !== "Canceled" && (
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
        )} */}
        <Button
          title={"View Details"}
          onPress={() =>
            navigation.navigate("OrderDetails", {
              orderId: item.orderId,
              orderData: item,
              status
            })
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
      </View>
    </View>
  );
};

const DailyNeeds = ({ navigation, item, status, index }) => {
  return (
    <View
      key={index}
      style={{
        backgroundColor: "#fff",
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          OrderId : {item.orderId}
        </Text>

        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          {getDateWithTime(item.createdAt)}
        </Text>
      </View>

      <View
        style={{
          paddingLeft: 10,
          backgroundColor: `${
            status === "Canceled"
              ? "red"
              : status === "Pending"
              ? "orange"
              : "green"
          }`,
          width: 100,
          paddingVertical: 6,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}>
          {status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <View
          style={{
            gap: 10,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 14,
              paddingRight: 10,
            }}>
            {getTitleOfProducts(item.product)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}>
            {item.product?.dailyNeeds[0]?.id?.dailyNeed && (
              <>
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
              </>
            )}
          </View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}>
            ₹ {item.finalAmount}/-
          </Text>
        </View>

        {item.deliveryStatus !== "Canceled" && (
          <View style={{ width: 80 }}>
            <View
              style={{
                backgroundColor: "green",
                borderRadius: 6,
                // gap: 4,
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 60,
              }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#fff",
                }}>
                ₹ {item.savedAmount}
                /-
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#fff",
                  opacity: 0.75,
                }}>
                Saved
              </Text>
            </View>
          </View>
        )}
      </View>

      {/* item.type === "Services" && (
            <Image
              source={require("../../../assets/images/service-icon.png")}
              alt='img'
              style={{
                width: 22,
                height: 22,
              }}
            />
          ) */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: `center`,
          gap: 50,
          marginBottom: 20,
        }}>
        {/* {item.deliveryStatus !== "Canceled" && (
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
        )} */}
        <Button
          title={"View Details"}
          onPress={() =>
            navigation.navigate("OrderDetails", {
              orderId: item.orderId,
              orderData: item,
              status
            })
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
      </View>
    </View>
  );
};

const FoodAndBeverages = ({ navigation, item, status, index }) => {
  return (
    <View
      key={index}
      style={{
        backgroundColor: "#fff",
        marginBottom: 10,
      }}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          OrderId : {item.orderId}
        </Text>

        <Text
          style={{
            opacity: 0.25,
            fontWeight: "700",
          }}>
          {getDateWithTime(item.createdAt)}
        </Text>
      </View>

      <View
        style={{
          paddingLeft: 10,
          backgroundColor: `${
            status === "Canceled"
              ? "red"
              : status === "Pending"
              ? "orange"
              : "green"
          }`,
          width: 100,
          paddingVertical: 6,
          borderTopRightRadius: 30,
          borderBottomRightRadius: 30,
        }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
          }}>
          {status}
        </Text>
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 10,
        }}>
        <View
          style={{
            gap: 10,
            flex: 1,
          }}>
          <Text
            numberOfLines={2}
            style={{
              fontWeight: "700",
              fontSize: 14,
              paddingRight: 10,
            }}>
            {getTitleOfProducts(item.product)}
          </Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 6,
            }}>
            {item?.product?.foodAndBeverages[0]?.restaurantMenu && (
              <>
                <MaterialIcon
                  name='local-restaurant'
                  size={18}
                  color={"#33056F"}
                />
                <Text
                  style={{
                    color: "#33056F",
                    fontWeight: "700",
                  }}>
                  {
                    item.product.foodAndBeverages[0]?.restaurantMenu?.restaurant
                      .name
                  }
                </Text>
              </>
            )}
          </View>
          <Text
            style={{
              fontWeight: "700",
              fontSize: 18,
            }}>
            ₹ {item.finalAmount}/-
          </Text>
        </View>

        {item.deliveryStatus !== "Canceled" && (
          <View style={{ width: 80 }}>
            <View
              style={{
                backgroundColor: "green",
                borderRadius: 6,
                // gap: 4,
                alignItems: "center",
                justifyContent: "center",
                width: 70,
                height: 60,
              }}>
              <Text
                style={{
                  fontWeight: "700",
                  fontSize: 14,
                  color: "#fff",
                }}>
                ₹ {item.savedAmount}
                /-
              </Text>
              <Text
                style={{
                  fontSize: 12,
                  fontWeight: "600",
                  color: "#fff",
                  opacity: 0.75,
                }}>
                Saved
              </Text>
            </View>
          </View>
        )}
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: `center`,
          gap: 50,
          marginBottom: 20,
        }}>
        {/* {item.deliveryStatus !== "Canceled" && (
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
        )} */}
        <Button
          title={"View Details"}
          onPress={() =>
            navigation.navigate("OrderDetails", {
              orderId: item.orderId,
              orderData: item,
              status
            })
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
      </View>
    </View>
  );
};

const CompletedOrders = ({ navigation, orders, status }) => {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: "column-reverse",
          }}>
          {orders.map((item, index) => {
            return (
              <>
                {item?.product?.foodAndBeverages?.length !== 0 && (
                  <FoodAndBeverages
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.dailyNeeds?.length !== 0 && (
                  <DailyNeeds
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.service?.length !== 0 && (
                  <Service
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const CanceledOrders = ({ navigation, orders, status }) => {
  return (
    <View>
      <ScrollView>
        <View
          style={{
            flexDirection: "column-reverse",
          }}>
          {orders.map((item, index) => {
            return (
              <>
                {item?.product?.foodAndBeverages?.length !== 0 && (
                  <FoodAndBeverages
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.dailyNeeds?.length !== 0 && (
                  <DailyNeeds
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}

                {item?.product?.service?.length !== 0 && (
                  <Service
                    navigation={navigation}
                    status={status}
                    item={item}
                    index={index}
                  />
                )}
              </>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};
