import { baseUrl } from "./Constant";

export const Endpoint = {
    Employee: { url: `${baseUrl}/api/Employee/employee` },
    AddEmployee: { url: `${baseUrl}/api/Employee/addemployee` },
    DeleteEmployee: { url: `${baseUrl}/api/Employee/deleteemployee` },
    editemployee: { url: `${baseUrl}/api/Employee/editemployee` },
    highestsalary: { url: `${baseUrl}/api/Employee/highestsalary` },
    salarycount: { url: `${baseUrl}/api/Employee/salarycount` },
    youngestemployee: { url: `${baseUrl}/api/Employee/youngestemployee` },

    Adddepartment: { url: `${baseUrl}/api/Employee/department` },
    Editdepartment: { url: `${baseUrl}/api/Employee/editdepartment` },
    Deletedepartment: { url: `${baseUrl}/api/Employee/deletedepartment` },
};
