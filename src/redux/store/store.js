import { configureStore } from "@reduxjs/toolkit";
import { goodsApi } from "./services/goodsApi";

export const store = configureStore({
	reducer: {
		[goodsApi.reducerPath]: goodsApi.reducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(goodsApi.middleware),
});
