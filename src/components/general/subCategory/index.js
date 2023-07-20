import { View, Text, TouchableOpacity, Image, FlatList } from "react-native";
import { useSelector } from "react-redux";
import { IMAGE_URL } from "@env";
import MaterialCommunityIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function SubCategoryNavigation({
  navigation,
  data,
  activePage,
  loadMore,
  type,
  setActiveID,
}) {
  const { user } = useSelector((state) => state.auth);

  let difference = {
    "Food And Beverages": {
      imagePath: "restaurant/menu",
    },
    "Daily Needs": {
      imagePath: "dailyneeds",
    },
    "Ask For A Service": {
      imagePath: "services/type",
    },
  };

  const SubCategoryMenu = ({ navigation, subCategory }) => {
    let nameKey =
      user?.language == "ENGLISH"
        ? "name"
        : user?.language?.toLowerCase() + "Name";


    return (
      <TouchableOpacity onPress={() => setActiveID(subCategory?._id)}>
        <View
          style={{
            backgroundColor: "#fff",
            marginBottom: 12,
            alignItems: "center",
          }}>
          {subCategory._id === activePage && (
            <View
              style={{
                width: 70,
                height: 55,
                backgroundColor: "#E7D6FD",
                borderTopRightRadius: 50,
                borderBottomRightRadius: 50,
                position: "absolute",
                top: 0,
                right: 10,
              }}
            />
          )}

          <View
            style={{
              width: 55,
              height: 55,
              backgroundColor: "#E7D6FD",
              borderRadius: 50,
              justifyContent: "center",
              alignItems: "center",
            }}>
            <Image
              source={{
                uri:
                  IMAGE_URL +
                  "/" +
                  difference[type].imagePath +
                  "/" +
                  subCategory?.bannerImg,
              }}
              style={{
                width: 35,
                height: 35,
              }}
            />
          </View>
          <Text
            style={{ fontSize: 10, textAlign: "center", fontWeight: "600" }}>
            {subCategory[nameKey]}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View
      style={{
        // flex: 1,
        backgroundColor: "#fff",
        width: 70,
        height: "100%",
        paddingTop: 20,
      }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <SubCategoryMenu subCategory={item} navigation={navigation} />
        )}
        keyExtractor={(item) => item._id}
        contentContainerStyle={{
          paddingTop: 10,
          paddingBottom: 150,
        }}
        onEndReached={loadMore}
      />

      <TouchableOpacity activeOpacity={0.8} onPress={()=> navigation.navigate("Suggestions")}>
      <View style={{
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FF9431',
        padding: 10,
      }}>
      <MaterialCommunityIcon
          name='tooltip-edit-outline'
          size={28}
          color={"#fff"}
        />
        <Text style={{
          color: '#fff',
          fontWeight: '700',
          fontSize: 8,
          textAlign: 'center',
          
        }}>SUGGESTION</Text>
      </View>
      </TouchableOpacity>
    </View>
  );
}
