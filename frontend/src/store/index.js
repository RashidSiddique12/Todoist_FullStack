import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./slice/projectSlice";
import taskReducer from "./slice/taskSlice";

const store = configureStore({
  reducer: {
    project: projectReducer,
    tasks : taskReducer,
  },
});

export default store;
