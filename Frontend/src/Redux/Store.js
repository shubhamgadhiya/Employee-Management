import { configureStore } from "@reduxjs/toolkit";
import EmployeeReducer from "./Reducer/EmployeeReducer";
export const store = configureStore({
  reducer: {
    Employee: EmployeeReducer,
  },
});
