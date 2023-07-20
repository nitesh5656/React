import { View, Text } from "react-native";
import { Button } from "@rneui/themed";
import {
  DaiyNeedsCartData,
  FoodAndBeveragesCartData,
  ServicesCartData,
} from "../../../model/data";

export default function ItemCart({ navigation, items, type }) {
  const itemsCount = items || 1;

  return (
    <View
      style={{
        backgroundColor: "#FF9431",
        // borderColor: 'rgba(51, 5, 111,0.7)',
        borderColor: "#FFF",
        borderWidth: 4,
        borderRadius: 5,
        padding: 6,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 10,
      }}>
      <View
        style={{
          alignItems: "center",
        }}>
        <Text
          style={{
            color: "#fff",
            fontWeight: "700",
            fontSize: 16,
          }}>
          {itemsCount} {itemsCount > 1 ? "items are" : "item is"} added
        </Text>
        {/* <Text style={{
            color: "#fff",
            fontWeight: '700',
            fontSize: 20,
        }}>₹ {amount * itemsCount}/-</Text> */}
      </View>

      <Button
        onPress={() =>
          navigation.navigate("Cart", {
            data:
              type === "Daily Needs"
                ? DaiyNeedsCartData
                : type === "Food And Beverages"
                ? FoodAndBeveragesCartData
                : ServicesCartData,
            type: type,
          })
        }
        containerStyle={{
          borderRadius: 30,
        }}
        buttonStyle={{
          backgroundColor: "#33056F",
          paddingHorizontal: 15,
        }}>
        Go to CART
      </Button>
    </View>
  );
}
