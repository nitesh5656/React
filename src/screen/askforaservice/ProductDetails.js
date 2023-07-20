import AskForAServiceProductDetailsPanel from '../../components/askforaservice/ProductDetails';

export default function AskForAServiceProductDetailsPage({ navigation, route }) {
  const { serviceId,productId, cart } = route?.params;

  return (
    <AskForAServiceProductDetailsPanel navigation={navigation} serviceId={serviceId} productId={productId} cart={cart} />
  )
}