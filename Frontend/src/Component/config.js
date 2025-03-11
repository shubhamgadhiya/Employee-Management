import moment from "moment";
import * as Yup from "yup";

export const employeeValidationSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  department: Yup.string().required("Department is required"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone number is required"),
  salary: Yup.number()
    .positive("Salary must be positive")
    .required("Salary is required"),
  status: Yup.string()
    .oneOf(["Active", "Inactive"], "Invalid status")
    .required("Status is required"),
  dob: Yup.string()
    .required("Date of Birth is required")
    .test(
      "valid-dob",
      "Date of Birth cannot be today or a future date",
      (value) => {
        return moment(value, "YYYY-MM-DD").isBefore(moment().startOf("day"));
      }
    ),
  photo: Yup.mixed().required("photo is required"),
});

export const departmentValidationSchema = Yup.object({
  departmentName: Yup.string().required("Name is required"),
  status: Yup.string().required("departmentStatus is required"),
});
