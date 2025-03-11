import { createSlice } from "@reduxjs/toolkit";
import { Endpoint } from "../../ApiCheck/Endpoint";
import axios from "axios"
import { toast } from "react-toastify";

const EmployeeReducer = createSlice({
  name: "Employee",
  initialState: {
    Employee: null,
    loading: false,
    error: null,
    Department: null,
    Count: null,
    YoungEmployee: null
  },
  reducers: {
    setEmployee: (state, action) => {
      state.Employee = action.payload;
    },
    setDepartment: (state, action) => {
      state.Department = action.payload;
    },
    setCount: (state, action) => {
      state.Count = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setYoungEmployee: (state, action) => {
      state.YoungEmployee = action.payload
    }
  },
});

export const EmployeeData = () => async (dispatch) => {
    dispatch(setLoading(true));
    try {
        const response = await axios.get(Endpoint.Employee.url);
        console.log("response", response)
        console.log("response?.data?.data", response?.data?.data)
        dispatch(setEmployee(response?.data?.data));
        dispatch(setDepartment(response?.data?.department));
        
    } catch (error) {
        console.error("Employee details failed", error);
    toast.error(error?.response?.data?.message ||'Employee details failed', { position: 'top-center', autoClose: 3000 });
    } finally {
        dispatch(setLoading(false));
    }
};

export const AddEmployee = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.post(Endpoint.AddEmployee.url, userData);
      console.log("response", response)
      dispatch(setEmployee(response.data.data.data));
      toast.success(response?.data?.message ||'Employeee created Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Employeee created failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};

export const DeleteEmployee = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.delete(`${Endpoint.DeleteEmployee.url}/${id}`, );
      console.log("response", response)
      dispatch(setEmployee(response?.data?.data || []));
      toast.success(response?.data?.message ||'Employeee Deleted Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Employeee Deleted failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};

export const EditEmployee = (data, id) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  console.log("data", data)
  try {
      const response = await axios.put(`${Endpoint.editemployee.url}/${id}`, data);
      console.log("response", response)
      dispatch(setEmployee(response.data.data));
      toast.success(response?.data?.message ||'Employeee update Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Employeee update failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};

export const AddDepartment = (userData) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.post(Endpoint.Adddepartment.url, userData);
      console.log("response", response)
      dispatch(setDepartment(response.data.data.data));
      toast.success(response?.data?.message ||'Department created Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Department created failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};

export const EditDepartment = (data) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  console.log("data", data)
  try {
      const response = await axios.post(Endpoint.Editdepartment.url, data);
      console.log("response", response)
      dispatch(setDepartment(response.data.data));
      toast.success(response?.data?.message ||'Department update Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Department update failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};

export const DeleteDepartment = (id) => async (dispatch) => {
  dispatch(setLoading(true));
  console.log("Endpoint", Endpoint)
  try {
      const response = await axios.delete(`${Endpoint.Deletedepartment.url}/${id}`, );
      console.log("response", response)
      dispatch(setDepartment(response?.data?.data || []));
      toast.success(response?.data?.message ||'Department Deleted Successful', { position: 'top-center', autoClose: 3000 });
      return { success: true, payload: response.data };
    } catch (error) {
    console.log("error", error)
    toast.error(error?.response?.data?.message ||'Department Deleted failed', { position: 'top-center', autoClose: 3000 });
    return { success: false, payload: error.response?.data };
  } finally {
      dispatch(setLoading(false));
  }
};


export const HighestSalaryData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
      const response = await axios.get(Endpoint.highestsalary.url);
      console.log("response", response)
      console.log("response?.data?.data", response?.data?.data)
      dispatch(setEmployee(response?.data?.data));
  } catch (error) {
      console.error("Employee details failed", error);
  toast.error(error?.response?.data?.message ||'Employee details failed', { position: 'top-center', autoClose: 3000 });
  } finally {
      dispatch(setLoading(false));
  }
};
export const salarycountData = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
      const response = await axios.get(Endpoint.salarycount.url);
      console.log("response", response)
      console.log("response?.data?.data", response?.data?.data)
      dispatch(setCount(response?.data?.data));
  } catch (error) {
      console.error("Employee details failed", error);
  toast.error(error?.response?.data?.message ||'Employee details failed', { position: 'top-center', autoClose: 3000 });
  } finally {
      dispatch(setLoading(false));
  }
};
export const YoungEmployeedata = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
      const response = await axios.get(Endpoint.youngestemployee.url);
      console.log("response", response)
      console.log("response?.data?.data", response?.data?.data)
      dispatch(setYoungEmployee(response?.data?.data));
  } catch (error) {
      console.error("Employee details failed", error);
  toast.error(error?.response?.data?.message ||'Employee details failed', { position: 'top-center', autoClose: 3000 });
  } finally {
      dispatch(setLoading(false));
  }
};


export const { setEmployee, setLoading, setDepartment, setCount, setYoungEmployee} = EmployeeReducer.actions;
export default EmployeeReducer.reducer;
