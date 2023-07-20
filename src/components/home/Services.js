import { View, TouchableOpacity, Dimensions, FlatList } from "react-native";
import { Button, Text, Card } from "@rneui/themed";
import { styles } from "./HomeStyles";
import { useEffect, useState } from "react";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "@env";

const screenWidth = Dimensions.get("window").width;
const categoryImgWidth = screenWidth / 3 - 10;

const Services = ({ navigation }) => {
  const { user } = useSelector((state) => state.auth);
  const [services, setServices] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axiosInstance.get("/service?page=1&limit=6");
        setServices(data.message);
      } catch (err) {
        setServices([]);
      }
    })();
  }, [user.pincode]);

  const AskForAServiceCategories = ({ navigation, category }) => {
    let nameKey =
      user.language == "ENGLISH"
        ? "name"
        : user.language.toLowerCase() + "Name";
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate("Ask For A Service Subcategories", {
            _id: category._id,
            name: category?.name,
            key: "service",
          })
        }>
        <View
          style={{
            width: categoryImgWidth,
            padding: 0,
            marginBottom: 10,
          }}>
          <Card
            containerStyle={{
              width: categoryImgWidth,
              height: categoryImgWidth,
              padding: 5,
              margin: 0,
              borderRadius: 10,
            }}>
            <Card.Image
              style={{
                padding: 0,
                width: "100%",
                height: "100%",
                borderRadius: 7,
              }}
              source={{
                uri: IMAGE_URL + "/services/" + category?.bannerImg,
              }}
            />
          </Card>
          <Text style={styles.cardTitle}>{category[nameKey]}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    services && (
      <View style={{ marginBottom: 10, paddingHorizontal: 10 }}>
        <Text style={{ paddingBottom: 10 }} h4>
          Ask For A Service
        </Text>

        <FlatList
          data={services}
          renderItem={({ item }) => (
            <AskForAServiceCategories category={item} navigation={navigation} />
          )}
          keyExtractor={(item) => item._id}
          numColumns={3}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
          contentContainerStyle={
            {
              // paddingTop: 10,
            }
          }
        />

        <View>
          <Button
            title='View All'
            color={"#33056F"}
            containerStyle={{
              borderRadius: 7,
            }}
            onPress={() => navigation.navigate("Ask for a Service")}
          />
        </View>
      </View>
    )
  );
};

export default Services;
