import React, { useEffect, useRef, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { employeeValidationSchema } from "./config";
import { useDispatch } from "react-redux";
import { AddEmployee, EditEmployee } from "../Redux/Reducer/EmployeeReducer";
import { baseUrlImg } from "../ApiCheck/Constant";
import moment from "moment";

const EmployeeModal = ({ show, onHide, selectedEmployee, department }) => {
  const dispatch = useDispatch();

  const [editimg, setEditImg] = useState(false);
  console.log("department", department);
  useEffect(() => {
    if (selectedEmployee && selectedEmployee.photo !== "") {
      setEditImg(true);
    }
  }, [selectedEmployee]);
  const initialValues = {
    name: selectedEmployee?.name || "",
    department: selectedEmployee?.department_id || "",
    email: selectedEmployee?.email || "",
    phone: selectedEmployee?.phone || "",
    salary: selectedEmployee?.salary || "",
    status: selectedEmployee?.status || "",
    dob: selectedEmployee?.dob
      ? moment(selectedEmployee.dob, "DD-MM-YYYY").format("YYYY-MM-DD")
      : "",
    photo: selectedEmployee?.photo || "",
  };

  const [preview, setPreview] = useState(selectedEmployee?.photo || "");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileInputRef = useRef(null);
  const EmployeeStatuses = ["Active", "Inactive"];

  useEffect(() => {
    if (show) {
      setPreview(selectedEmployee?.photo || "");
      if (fileInputRef.current) fileInputRef.current.value = "";
      
    }
  }, [show, selectedEmployee]);

  const handleFileChange = (event, setFieldValue) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setEditImg(false);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        setFieldValue("photo", reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    event.preventDefault();
    setSubmitting(true);
    console.log("value", values);
    const formData = new FormData();
    formData.append("employee_name", values.name || "");
    formData.append("department", values.department || "");
    formData.append("dob", values.dob || "");
    formData.append("phone", values.phone || "");
    formData.append("email", values.email || "");
    formData.append("salary", values.salary || "");
    formData.append("status", values.status || "");

    if (selectedFile) {
      formData.append("photo", selectedFile);
    }

    console.log("formData", formData);
    try {
      const result = selectedEmployee
        ? await dispatch(EditEmployee(formData, selectedEmployee.id))
        : await dispatch(AddEmployee(formData));

      if (result?.success) {
        setPreview("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        onHide();
      } else {
        console.error(
          "Error processing employee data:",
          result.message || "Unknown error"
        );
      }
    } catch (error) {
      console.error("Failed to process employee data:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className={`modal fade ${show ? "show d-block " : "d-none"}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedEmployee ? "Edit Employee" : "Add Employee"}
            </h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={initialValues}
              enableReinitialize
              validationSchema={employeeValidationSchema}
              onSubmit={handleSubmit}
            >
              {({ setFieldValue, resetForm }) => (
                <Form>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Name</label>
                      <Field type="text" name="name" className="form-control" />
                      <ErrorMessage
                        name="name"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Department</label>
                      <Field
                        as="select"
                        name="department"
                        className="form-select"
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {department && department.length > 0 ? (
                          department.map((dept) => (
                            <option key={dept.id} value={dept.id}>
                              {dept.name}
                            </option>
                          ))
                        ) : (
                          <option value="" disabled>
                            No departments found — Please create one first
                          </option>
                        )}
                      </Field>
                      <ErrorMessage
                        name="department"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Email</label>
                      <Field
                        type="email"
                        name="email"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="email"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Phone</label>
                      <Field
                        type="text"
                        name="phone"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="phone"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Salary</label>
                      <Field
                        type="number"
                        name="salary"
                        className="form-control"
                      />
                      <ErrorMessage
                        name="salary"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Date of Birth</label>
                      <Field type="date" name="dob" className="form-control" max={moment().subtract(1, 'day').format('YYYY-MM-DD')} />
                      <ErrorMessage
                        name="dob"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Status</label>
                      <Field as="select" name="status" className="form-select">
                        <option disabled value="">
                          Select
                        </option>
                        {EmployeeStatuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </Field>
                      <ErrorMessage
                        name="status"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Photo</label>
                      <input
                        type="file"
                        ref={fileInputRef}
                        className="form-control"
                        accept="image/*"
                        name="photo"
                        onChange={(e) => handleFileChange(e, setFieldValue)}
                      />
                      <ErrorMessage
                        name="photo"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4 d-flex align-items-center">
                      {preview && (
                        <img
                          src={editimg ? `${baseUrlImg}/${preview}` : preview}
                          alt="Preview"
                          className="img-thumbnail"
                          width="100"
                        />
                      )}
                    </div>
                  </div>

                  <div className="row mb-3"></div>

                  <div className="modal-footer">
                  <button
          type="button"
          className="btn btn-secondary ms-2"
          onClick={() => {
            resetForm();
            setPreview("");
            if (fileInputRef.current) fileInputRef.current.value = "";
          }}
        >
          Reset
        </button>
                    <button
                      type="submit"
                      className={
                        selectedEmployee ? "btn btn-primary" : "btn btn-success"
                      }
                    >
                      {selectedEmployee ? "Update Employee" : "Add Employee"}
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeModal;
