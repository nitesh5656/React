import { createSlice } from "@reduxjs/toolkit";
import axiosInstance from "../../utils/interceptor";

const defaultDict = {
  user: null,
  isLogin: false,
};
const initialState = defaultDict;

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.isLogin = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.isLogin = false;
    },
    firstTimeUserFetching: (state, action) => {
      state.user = action.payload.user;
      state.isLogin = true;
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
  },
});

export default authSlice.reducer;
export const { login, logout, updateUser, firstTimeUserFetching } =
  authSlice.actions;

// Actions
export const fetchUsers = () => async (dispatch) => {
  try {
    console.log("adsfkasdfkasdnkf")
    const { data } = await axiosInstance.get("/user");
    console.log(data)
    data.message.contact = data.contact;
    data.message.isPresent = data.isPresent;
    dispatch(firstTimeUserFetching({ user: data.message }));
  } catch (error) {
    console.log(error, "jkjkjk");
    dispatch(firstTimeUserFetching({}));
  }
};
