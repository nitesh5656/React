import React from 'react';
import FoodAndBeveragesProductDetailsPanel from '../../components/foodandbeverages/ProductDetails';

export default function FoodAndBeveragesProductDetailsPage({ navigation, route }) {

  const { productId,foodAndBeveragesId, cart } = route?.params;


  return (
    <FoodAndBeveragesProductDetailsPanel navigation={navigation} productId={productId} foodAndBeveragesId={foodAndBeveragesId} cart={cart} />
  )
}