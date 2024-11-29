//global.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/index.ts";
import type { UserLoginState} from "./global_state.d";
import { Random } from "mockjs";
// 定义初始 state 的类型

// 使用该类型定义初始 state
const initialUser: UserLoginState = {
    Token: "",
    UserCode: "",
    UserName: "天涯轩",
    UserEmail: "",
};
// 创建 slice
export const userSlice = createSlice({
  name: "userLogin",// 名称
  initialState:initialUser,// 初始 state
  reducers: {
    // 定义 reducer 函数，该函数接受 state 和 action 作为参数
    setUserState: (state) => {
      // 更新 state
      state.UserName = "天涯轩"+Random.datetime();
    },
  },
});
 
// 为每个 case reducer 函数生成 Action creators
export const { setUserState } = userSlice.actions;
// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectUserState = (state: RootState) => state.userStatus;

// 导出 reducer
export default userSlice.reducer;