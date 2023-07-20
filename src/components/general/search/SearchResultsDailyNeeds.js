import { View, Text } from "react-native";
import { FlatList } from "react-native";
import DailyNeedsProducts from "../../dailyneeds/DailyNeedsProductUI";

export default function SearchResultsDailyNeeds({ navigation, data, searchText }) {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignItems: "center",
          padding: 10,
        }}
      >
        <Text
          style={{
            fontWeight: "700",
            fontSize: 14,
          }}
        >
          Search Results For :
        </Text>
        <Text
          style={{
            fontWeight: "700",
            fontSize: 16,
            color: "#FF9431",
          }}
        >
          {searchText}
        </Text>
      </View>

      {data?.length === 0 ? (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontWeight: "700",
              fontSize: 22,
            }}
          >
            No Result Found
          </Text>
        </View>
      ) : (
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <DailyNeedsProducts
            product={item}
            navigation={navigation}
            activeId={item?.dailyNeed?._id}
          />
          )}
          keyExtractor={(item) => item.name}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: "space-between",
            paddingHorizontal: 10,
            gap: 10,
          }}
          contentContainerStyle={{
            paddingTop: 10,
          }}
          //   onEndReached={loadMore}
        />
      )}
    </View>
  );
}
