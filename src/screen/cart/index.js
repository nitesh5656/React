import Shell from "../../components/shells/MainShell";
import CartPanel from "../../components/cart";
import EmptyCart from "../../components/cart/EmptyCart";
import { useSelector } from "react-redux";

export default function CartScreen({ navigation, route }) {
  const { user } = useSelector((user) => user.auth);
  return (
    <Shell navigation={navigation}>
      {user?.cart &&user?.cart?.items &&user?.cart?.items?.length !== 0 ? (
        <CartPanel navigation={navigation} address={route?.params?.address} />
      ) : (
        <EmptyCart navigation={navigation} />
      )}
    </Shell>
  );
}
