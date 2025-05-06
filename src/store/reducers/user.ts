//global.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store/index.ts";
import type { UserLoginState } from "./global_state.d";
import { UserLogin } from "@/types/user.d"
// 定义初始 state 的类型
const userLoginString = sessionStorage.getItem('userlogin')
  || JSON.stringify({
    Token: '',
    UserCode: '',
    UserName: '',
    UserEmail: ''
  });
const initialUser: UserLogin = JSON.parse(userLoginString);
console.log(initialUser);
// 创建 slice
export const userSlice = createSlice({
  name: "userLogin",// 名称
  initialState: initialUser,// 初始 state
  reducers: {
    // 定义 reducer 函数，该函数接受 state 和 action 作为参数
    setUserState: (state: UserLoginState, action: PayloadAction<UserLogin>) => {
      // 更新 state
      const userInfo = action.payload;
      // state = { ...state, ...userInfo };
      Object.assign(state, { ...userInfo });
    },
  },
});

// 为每个 case reducer 函数生成 Action creators
export const { setUserState } = userSlice.actions;
// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectUserState = (state: RootState) => state.userStatus;

// 导出 reducer
export default userSlice.reducer;