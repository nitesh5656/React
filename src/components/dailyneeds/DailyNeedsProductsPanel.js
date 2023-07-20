import { View, FlatList } from "react-native";
import { useState } from "react";
import ItemCart from "../general/itemcart";
import { useInfiniteQuery } from "react-query";
import axiosInstance from "../../utils/interceptor";
import { useSelector } from "react-redux";
import DailyNeedsProducts from "./DailyNeedsProductUI";
import Loader from "../general/loader/Loader";
import { screenWidth } from "../../utils/Dimensions";
import SubLoader from "../general/loader/SubLoader";

export default function DailyNeedsProductsPanel({ navigation, activeId }) {
  const { user } = useSelector((state) => state.auth);
  const [productData, setProductData] = useState([]);

  const fetchDailyNeedsSubcategoryProducts = async ({ pageParam = 0 }) => {
    try {
      if (pageParam === 0) setProductData([]);

      const { data } = await axiosInstance.get(
        `/dailyneeds/${activeId}/products?page=${pageParam + 1}&limit=20`
      ); 
      
      pageParam === 0
        ? setProductData(data.message)
        : setProductData([...productData, ...data.message]);

      return { next: data.hasNextPage };
    } catch (error) {
      console.log(error);
    }
  };

  const { fetchNextPage, hasNextPage } = useInfiniteQuery(
    ["dailyNeedsSubcategoryProducts", activeId],
    fetchDailyNeedsSubcategoryProducts,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage?.next) return pages.length;
      },
      cacheTime: 0,
      refetchOnWindowFocus: false,
    }
  );

  const loadMore = () => {
    if (hasNextPage) fetchNextPage();
  };

  return (
    <>
    {productData.length > 0 ? (
        <FlatList
        data={productData}
        renderItem={({ item }) => (
          <DailyNeedsProducts
            product={item}
            navigation={navigation}
            activeId={activeId}
          />
        )}
        keyExtractor={(item) => item._id}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "center",
          gap: 10,
          paddingVertical: 3,
        }}
        onEndReached={loadMore}
      />
      ) : (
        <View style={{
          flex: 1,
          width: screenWidth,
        }}>
          {/* <Text>We will show animation here !</Text> */}
          <SubLoader navigation={navigation} />
        </View>
      )}
      
      {user?.cart?.serviceType?.type === "DAILYNEEDS" &&
        user?.cart?.serviceType?.id === activeId && (
          <View style={{ padding: 10 }}>
            <ItemCart
              navigation={navigation}
              items={user?.cart?.items?.length}
              type={"Daily Needs"}
            />
          </View>
        )}
    </>
  );
}
