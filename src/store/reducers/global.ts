//global.ts
import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store/index.ts";
import type { GlobalState } from "./global_state.d";
// 定义初始 state 的类型

// 使用该类型定义初始 state
const initialState: GlobalState = {
    collapsed: false
};
// 创建 slice
export const globalSlice = createSlice({
  name: "global",// 名称
  initialState:initialState,// 初始 state
  reducers: {
    // 定义 reducer 函数，该函数接受 state 和 action 作为参数
    setCollapsed: (state) => {
      // 更新 state
      state.collapsed = !state.collapsed;
    },
  },
});
 
// 为每个 case reducer 函数生成 Action creators
export const { setCollapsed } = globalSlice.actions;
// selectors 等其他代码可以使用导入的 `RootState` 类型
export const selectGlobalState = (state: RootState) => state.globalStatus;

// 导出 reducer
export default globalSlice.reducer;