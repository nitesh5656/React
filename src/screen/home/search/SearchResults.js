import { View } from "react-native";
import { useState, useEffect } from "react";
import SearchResultsDailyNeeds from "../../../components/general/search/SearchResultsDailyNeeds";
import SearchResultsFoodAndBeverages from "../../../components/general/search/SearchResultsFoodAndBeverages";
import SearchResultsServices from "../../../components/general/search/SearchResultsServices";
import axiosInstance from "../../../utils/interceptor";

export default function SearchResultsScreen({ navigation, route }) {
  const [searchResults, setSearchResults] = useState(null);
  const { data, type } = route.params;

  useEffect(() => {
    if (data) {
      (async () => {
        try {
          const { data } = await axiosInstance.get(
            `/search/products?page=1&searchValue=${route.params.data}&limit=50&type=${route.params.type}`
          );
          console.log(data.message)
          setSearchResults(data.message);
        } catch (err) {
          setSearchResults([]);
        }
      })();
    }
  }, [type, data]);


  return (
    searchResults && (
      <View
        style={{
          flex: 1,
          backgroundColor: "#E7D6FD",
        }}>
        {type === "DAILYNEEDS" && (
          <SearchResultsDailyNeeds
            navigation={navigation}
            data={searchResults}
            searchText={data}
          />
        )}
        {type === "RESTAURANT" && (
          <SearchResultsFoodAndBeverages
            navigation={navigation}
            data={searchResults}
            searchText={data}
          />
        )}
        {type === "SERVICES" && (
          <SearchResultsServices navigation={navigation} data={searchResults} searchText={data}/>
        )}
      </View>
    )
  );
}
