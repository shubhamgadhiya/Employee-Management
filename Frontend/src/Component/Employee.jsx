import React, { useEffect, useState } from "react";
import {
  AiFillEdit,
  AiFillDelete,
  AiOutlineDoubleLeft,
  AiOutlineLeft,
  AiOutlineRight,
  AiOutlineDoubleRight,
} from "react-icons/ai";
import { FaFilter } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import EmployeeModal from "./Model";
import DepartmentModal from "./DepartmentModel";
import { useDispatch, useSelector } from "react-redux";
import {
  DeleteDepartment,
  DeleteEmployee,
  EmployeeData,
} from "../Redux/Reducer/EmployeeReducer";
import Loader from "../ApiCheck/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { baseUrlImg } from "../ApiCheck/Constant";
import { toast } from "react-toastify";

const EmployeeTable = () => {
  const { loading, Employee, Department } = useSelector(
    (state) => state.Employee
  );

  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [deparmentModalShow, setDepartmentModalShow] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(5);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setModalShow(true);
  };
  const handleEditDepartment = (employee) => {
    setSelectedDepartment(employee);
    setDepartmentModalShow(true);
  };

  useEffect(() => {
    dispatch(EmployeeData());
  }, []);

  useEffect(() => {
    if (Employee && Employee.length > 0) {
      setEmployees(Employee);
      setFilteredEmployees(Employee);
    }
  }, [Employee]);

  useEffect(() => {
    const filtered = employees.filter(
      (employee) =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department_name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        employee.email.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchTerm, employees]);

  const totalPages = Math.ceil(filteredEmployees.length / employeesPerPage);
  const currentEmployees = filteredEmployees.slice(
    (currentPage - 1) * employeesPerPage,
    currentPage * employeesPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPaginationButtons = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (
        i === 1 ||
        i === totalPages ||
        (i >= currentPage - 2 && i <= currentPage + 2)
      ) {
        pages.push(
          <button
            key={i}
            className={`btn ms-2 ${
              currentPage === i ? "btn-primary" : "btn-outline-dark"
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        );
      } else if (pages[pages.length - 1] !== "...") {
        pages.push("...");
      }
    }
    return pages;
  };

  const handleDelete = (id) => {
    toast.warn(
      <div>
        Are you sure you want to delete this employee?
        <div className="mt-2">
          <button
            className="btn btn-danger btn-sm me-2"
            onClick={() => dispatch(DeleteEmployee(id))}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => console.log("No clicked")}
          >
            No
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeOnClick: true }
    );
  };
  const handleDepartmentDelete = (id) => {
    toast.warn(
      <div>
        Are you sure you want to delete this Department?
        <div className="mt-2">
          <button
            className="btn btn-danger btn-sm me-2"
            onClick={() => dispatch(DeleteDepartment(id))}
          >
            Yes
          </button>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => console.log("No clicked")}
          >
            No
          </button>
        </div>
      </div>,
      { position: "top-center", autoClose: false, closeOnClick: true }
    );
  };

  if (loading) return <Loader />;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">Employee List</h2>
        <div>
          <button
            className="btn btn-dark mb-3 me-2"
            onClick={() => {
              navigate("/employee");
            }}
          >
            <FaFilter /> Filter Employee
          </button>
          <button
            className="btn btn-dark mb-3 me-2"
            onClick={() => {
              setModalShow(true), setSelectedEmployee(null);
            }}
          >
            <IoMdAdd /> Add Employee
          </button>

          <button
            className="btn btn-dark mb-3"
            onClick={() => {
              setDepartmentModalShow(true), setSelectedEmployee(null);
            }}
          >
            <IoMdAdd /> Add Department
          </button>
        </div>
      </div>

      <>
        <div className="input-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search by Name / Department / Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="d-flex mb-3">
          <label className="me-2">Employees per page:</label>
          <select
            className="form-select w-auto"
            value={employeesPerPage}
            onChange={(e) => setEmployeesPerPage(Number(e.target.value))}
          >
            {[5, 10, 15, 20].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </>

      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Department</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Salary</th>
              <th>Status</th>
              <th>DOB</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentEmployees.length > 0 ? (
              currentEmployees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{(currentPage - 1) * employeesPerPage + index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.salary}</td>
                  <td
                    className={
                      employee.status === "Active"
                        ? "text-success"
                        : "text-danger"
                    }
                  >
                    {employee.status}
                  </td>

                  <td>{moment(employee.dob).format("DD-MM-YYYY")}</td>
                  <td>
                    <img
                      src={`${baseUrlImg}/${employee.photo}`}
                      alt={employee.name}
                      className="rounded-circle"
                      width="50"
                      height="50"
                    />
                  </td>
                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(employee)}
                        title="Edit"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        title="Delete"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(employee.id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No Employees Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {filteredEmployees.length > 0 && (
        <div className="d-flex justify-content-center mt-3">
          <button
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            className="btn btn-dark ms-2"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            <AiOutlineDoubleLeft /> First
          </button>
          <button
            style={{ cursor: currentPage === 1 ? "not-allowed" : "pointer" }}
            className="btn btn-dark ms-2 me-2"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <AiOutlineLeft /> Previous
          </button>
          {getPaginationButtons()}
          <button
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            className="btn btn-dark ms-2"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next <AiOutlineRight />
          </button>
          <button
            style={{
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
            }}
            className="btn btn-dark ms-2"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            Last <AiOutlineDoubleRight />
          </button>
        </div>
      )}

      <div className="d-flex mt-3 mb-3">
        <h2 className="mb-3">Department List</h2>
      </div>

      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Department Name</th>
              <th>Department Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Department?.length > 0 ? (
              Department?.map((department, index) => (
                <tr key={department.id}>
                  <td>{index + 1}</td>
                  <td>{department.name}</td>
                  <td
                    className={
                      department.status === "Approved"
                        ? "text-success"
                        : department.status === "Rejected"
                        ? "text-danger"
                        : "text-warning"
                    }
                  >
                    {department.status}
                  </td>

                  <td>{moment(department.created).format("DD-MM-YYYY")}</td>

                  <td>
                    <div className="d-flex">
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEditDepartment(department)}
                        title="Edit"
                      >
                        <AiFillEdit />
                      </button>
                      <button
                        title="Delete"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDepartmentDelete(department.id)}
                      >
                        <AiFillDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">
                  No Department Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <EmployeeModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        selectedEmployee={selectedEmployee}
        department={Department}
      />
      <DepartmentModal
        show={deparmentModalShow}
        onHide={() => setDepartmentModalShow(false)}
        selectedDepartment={selectedDepartment}
      />
    </div>
  );
};

export default EmployeeTable;
