//store/index.ts
 
import { configureStore } from "@reduxjs/toolkit";
import globalReducer from "./reducers/global.ts";
import userReducer from "./reducers/user.ts";
//处理eslint报错
/* eslint-disable @typescript-eslint/no-unused-vars */
const store = configureStore({
  reducer: {
    globalStatus: globalReducer,
    userStatus: userReducer,
  },
});
 
// 从 store 本身推断 `RootState` 和 `AppDispatch` 类型
export type RootState = ReturnType<typeof store.getState>;
// 推断类型：{posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
 
export default store;