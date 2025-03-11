import React, { useEffect, useRef, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { departmentValidationSchema } from "./config";
import { useDispatch } from "react-redux";
import { AddDepartment, AddEmployee, EditDepartment, EditEmployee } from "../Redux/Reducer/EmployeeReducer";

const DepartmentModal = ({ show, onHide, selectedDepartment }) => {
  const dispatch = useDispatch();
console.log("selectedDepartment", selectedDepartment)
  const initialValues = {
    departmentName: selectedDepartment?.name || "",
    status: selectedDepartment?.status || "",
  };

  const departmentStatuses = ["Pending", "Approved", "Rejected"];

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);
console.log("values",values)
const newvalue  = {...values, id:selectedDepartment?.id }
    
    try {
      const result = selectedDepartment
        ? await dispatch(EditDepartment(newvalue))
        : await dispatch(AddDepartment(values));

      if (result?.success) {
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
      className={`modal fade ${show ? "show d-block" : "d-none"}`}
      tabIndex="-1"
    >
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {selectedDepartment ? "Edit Department" : "Add Department"}
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
              validationSchema={departmentValidationSchema}
              onSubmit={handleSubmit}
            >
              {() => (
                <Form>
                  <div className="row mb-3">
                    <div className="col-md-4">
                      <label className="form-label">Department</label>
                      <Field type="text" name="departmentName" className="form-control" />
                      <ErrorMessage
                        name="departmentName"
                        component="div"
                        className="text-danger"
                      />
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Department Status</label>
                      <Field
                        as="select"
                        name="status"
                        className="form-select"
                      >
                        <option disabled value="">
                          Select
                        </option>
                        {departmentStatuses.map((status) => (
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
                  </div>
                  <div className="modal-footer">
                    <button
                      type="submit"
                      className={selectedDepartment ? "btn btn-primary" : "btn btn-success"}
                    >
                      {selectedDepartment ? "Update Department" : "Add Department"}
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

export default DepartmentModal;
