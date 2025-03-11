import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import {HighestSalaryData, salarycountData, YoungEmployeedata } from "../Redux/Reducer/EmployeeReducer";
import Loader from "../ApiCheck/Loader";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { baseUrlImg } from "../ApiCheck/Constant";


const EmployeeTable = () => {
  const { loading, Employee, Count, YoungEmployee } = useSelector((state) => state.Employee);

  const [employees, setEmployees] = useState([]);
console.log("YoungEmployee", YoungEmployee)
console.log("employee", employees)
console.log("Count", Count)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleEdit = (employee) => {
    setSelectedEmployee(employee); 
    setModalShow(true);
  };

  useEffect(() => {
    dispatch(HighestSalaryData());
    dispatch(salarycountData());
    dispatch(YoungEmployeedata());
  }, []);

  useEffect(() => {
    if (Employee && Employee.length > 0) {
      setEmployees(Employee);
      
    }
  }, [Employee]);


  

  if (loading) return <Loader />;

  return (
    <>
    
    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">Depratment Wise Highest Salary Employee List</h2>
        <div>
        <button
          className="btn btn-dark mb-3 me-2"
          onClick={() => {navigate("/")}}
        > Home
        </button>
       
        </div>
      </div>
  
    
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
              
            </tr>
          </thead>
          <tbody>
            {employees.length > 0 ? (
              employees.map((employee, index) => (
                <tr key={employee.id}>
                  <td>{index + 1}</td>
                  <td>{employee.name}</td>
                  <td>{employee.department_name}</td>
                  <td>{employee.email}</td>
                  <td>{employee.phone}</td>
                  <td>{employee.salary}</td>
                  <td>{employee.status}</td>
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
  
    </div>

    <div className="container mt-4">
      <div className=" justify-content-between">
        <h2 className="mb-3">Salary range wise employee count</h2>
        <div className="row">
                
                <div className="col-md-4">
                    <div className="card text-center p-3 shadow">
                        <h4>₹ 0 - ₹ 10,000</h4>
                        <p className="display-5 fw-bold">{Count?.low || 0}</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center p-3 shadow">
                        <h4>₹ 10,001 - ₹ 20,000</h4>
                        <p className="display-5 fw-bold">{Count?.medium || 0 }</p>
                    </div>
                </div>

                <div className="col-md-4">
                    <div className="card text-center p-3 shadow">
                        <h4>₹ 20,001 and Above</h4>
                        <p className="display-5 fw-bold">{Count?.high || 0 }</p>
                    </div>
                </div>
            </div>
      </div>
    </div>

    <div className="container mt-4">
      <div className="d-flex justify-content-between">
        <h2 className="mb-3">Youngest Employee List</h2>
        <div>
        <button
          className="btn btn-dark mb-3 me-2"
          onClick={() => {navigate("/")}}
        > Home
        </button>
       
        </div>
      </div>
  
    
      <div className="table-container" style={{ overflowX: "auto" }}>
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Age</th>
            </tr>
          </thead>
          <tbody>
            {YoungEmployee?.length > 0 ? (
              YoungEmployee?.map((employee, index) => (
                <tr key={employee.department_id}>
                  <td>{index + 1}</td>
                  <td>{employee.employee_name}</td>
                  <td>{moment().diff(moment(employee.dob), 'years')}</td>
                 
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
  
    </div>
    </>
  );
};

export default EmployeeTable;
