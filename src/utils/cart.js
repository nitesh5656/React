import axiosInstance from "../utils/interceptor";
import { showToast } from "../utils/toast";
import { updateUser } from "../store/slices/authSlice";

export const addToCartButton = async (
  serviceTypeId,
  user,
  itemId,
  dispatch,
  type
) => {
  let isEmptyApiUse =
    user?.cart?.serviceType?.type !== type ||
    user?.cart?.serviceType?.id !== serviceTypeId;

  try {
    let updatedState = {
      serviceType: {
        type: type,
        id: serviceTypeId,
      },
      items: isEmptyApiUse ? [itemId] : [...user?.cart?.items, itemId],
    };

    dispatch(
      updateUser({
        cart: updatedState,
      })
    );
    await axiosInstance.patch(
      "/user",
      { cart: updatedState },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (err) {
    console.log(err);
    dispatch(
      updateUser({
        cart: user?.cart,
      })
    );
    return showToast(err.response.data.message, "error");
  }
};

const removeParticularInstance = (items, itemId, unitId, type) => {
  let updatedItems = [];
  let isOneInstanceRemoved = false;

  items.map((item) => {
    let condition =
      type === "DAILYNEEDS"
        ? item.id === itemId && !isOneInstanceRemoved && item.unitId === unitId
        : item === itemId && !isOneInstanceRemoved;
        
    if (condition) return (isOneInstanceRemoved = true);
    updatedItems.push(item);
  });

  return updatedItems;
};

export const removeCartHandler = async (
  user,
  dispatch,
  itemId,
  type,
  serviceTypeId,
  unitId
) => {
  try {
    let isValidToRemove =
      user?.cart?.serviceType?.type === type &&
      user?.cart?.serviceType?.id === serviceTypeId;

    let updatedItems = removeParticularInstance(
      user?.cart?.items,
      itemId,
      unitId,
      type
    );

    if (isValidToRemove) {
      let updatedState = {
        serviceType: {
          type: type,
          id: updatedItems.length === 0 ? null : user?.cart?.serviceType?.id,
        },
        items: updatedItems,
      };
      dispatch(
        updateUser({
          cart: updatedState,
        })
      );
      await axiosInstance.patch(
        "/user",
        { cart: updatedState },
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
    }
  } catch (err) {
    dispatch(
      updateUser({
        cart: user?.cart,
      })
    );
    return showToast(err.response.data.message, "error");
  }
};

export const addToCartButtonInDailyNeeds = async (
  serviceTypeId,
  user,
  itemId,
  dispatch,
  type,
  unitId
) => {
  let isEmptyApiUse =
    user?.cart?.serviceType?.type !== type ||
    user?.cart?.serviceType?.id !== serviceTypeId;

  try {
    let updatedState = {
      serviceType: {
        type: type,
        id: serviceTypeId,
      },
      items: isEmptyApiUse
        ? [
            {
              id: itemId,
              unitId: unitId,
            },
          ]
        : [
            ...user?.cart?.items,
            {
              id: itemId,
              unitId: unitId,
            },
          ],
    };

    dispatch(
      updateUser({
        cart: updatedState,
      })
    );
    await axiosInstance.patch(
      "/user",
      { cart: updatedState },
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  } catch (err) {
    console.log(err);
    dispatch(
      updateUser({
        cart: user?.cart,
      })
    );
    return showToast(err.response.data.message, "error");
  }
};
