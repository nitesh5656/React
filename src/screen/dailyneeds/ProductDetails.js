import ProductDetailsPanel from "../../components/dailyneeds/ProductDetails";

export default function ProductDetailsPage({ navigation, route }) {
  const { type, productId, dailyNeedTypeId, cart } = route?.params;

  return (
    <ProductDetailsPanel
      navigation={navigation}
      type={type}
      productId={productId}
      dailyNeedTypeId={dailyNeedTypeId}
      cart={cart}
    />
  );
}
