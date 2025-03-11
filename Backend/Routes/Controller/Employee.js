const connection = require("../../Db/Database");
const fs = require("fs");
const path = require("path");

const getEmployee = async (req, res) => {
  try {
    const [rows] = await connection.query(`
            SELECT e.*, d.name AS department_name, d.status AS department_status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
        `);

    const [deparment] = await connection.query(`
             SELECT * FROM departments

        `);
    res
      .status(200)
      .json({
        data: rows,
        department: deparment,
        message: "Employee data fetched successfully",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteOldImage = (imagePath) => {
  if (!imagePath) return;

  const fullPath = path.join(__dirname, "..", "..", "uploads", imagePath);

  fs.access(fullPath, fs.constants.F_OK, (err) => {
    if (!err) {
      fs.unlink(fullPath, (unlinkErr) => {
        if (unlinkErr) {
          console.error(`Error deleting image (${imagePath}):`, unlinkErr);
        } else {
          console.log(`Deleted: ${imagePath}`);
        }
      });
    } else {
      console.log(`File does not exist: ${imagePath}`);
    }
  });
};
const createEmployee = async (req, res) => {
  const { department, employee_name, dob, phone, email, salary, status } =
    req.body;
  const photo = req.file ? req.file.filename : null;

  if (
    !department ||
    !employee_name ||
    !dob ||
    !phone ||
    !email ||
    !salary ||
    !status
  ) {
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const [existingEmployee] = await connection.query(
      `SELECT email, phone FROM employees WHERE email = ? OR phone = ?`,
      [email, phone]
    );

    if (existingEmployee.length > 0) {
      const conflict =
        existingEmployee[0].email === email
          ? "Email already exists."
          : "Phone number already exists.";
      if (photo) deleteOldImage(photo);
      return res.status(400).json({ message: conflict });
    }

    const [employeeResult] = await connection.query(
      `INSERT INTO employees (department_id, name, dob, phone, photo, email, salary, status, created, modified)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [
        department,
        employee_name,
        dob,
        phone,
        photo,
        email,
        salary,
        status || "Active",
      ]
    );

    const [rows] = await connection.query(`
            SELECT e.*, d.name AS department_name, d.status AS department_status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
        `);

    res.status(201).json({
      data: {
        employee: employeeResult,
        data: rows,
      },
      message: "Employee created successfully!",
    });
  } catch (error) {
    if (photo) deleteOldImage(photo);
    res.status(500).json({ error: error.message });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const [employeeData] = await connection.query(
      `SELECT photo, department_id FROM employees WHERE id = ?`,
      [id]
    );

    if (employeeData.length === 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    const { photo } = employeeData[0];

    await connection.query(`DELETE FROM employees WHERE id = ?`, [id]);

    if (photo) {
      const photoPath = path.join(__dirname, "../../uploads", photo);
      if (fs.existsSync(photoPath)) {
        fs.unlinkSync(photoPath);
      }
    }
    const [rows] = await connection.query(`
            SELECT e.*, d.name AS department_name, d.status AS department_status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
        `);

    res
      .status(200)
      .json({ data: rows, message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const { department, employee_name, dob, phone, email, salary, status } =
    req.body;
  const photo = req.file ? req.file.filename : null;

  console.log(" req.body", req.body);
  if (
    !department ||
    !employee_name ||
    !dob ||
    !phone ||
    !email ||
    !salary ||
    !status
  ) {
    if (photo) deleteOldImage(photo);
    return res
      .status(400)
      .json({ message: "Please provide all required fields." });
  }

  try {
    const [existingEmployee] = await connection.query(
      `SELECT id, photo FROM employees WHERE (email = ? OR phone = ?) AND id != ?`,
      [email, phone, id]
    );

    if (existingEmployee.length > 0) {
      if (photo) deleteOldImage(photo);
      const conflict =
        existingEmployee[0].email === email
          ? "Email already exists."
          : "Phone number already exists.";
      return res.status(400).json({ message: conflict });
    }

    const [currentEmployee] = await connection.query(
      `SELECT photo FROM employees WHERE id = ?`,
      [id]
    );

    if (currentEmployee.length === 0) {
      if (photo) deleteOldImage(photo);
      return res.status(404).json({ message: "Employee not found." });
    }

    if (photo && currentEmployee[0].photo) {
      deleteOldImage(currentEmployee[0].photo);
    }

    await connection.query(
      `UPDATE employees 
            SET department_id = ?, name = ?, dob = ?, phone = ?, photo = ?, email = ?, salary = ?, status = ?, modified = NOW() 
            WHERE id = ?`,
      [
        department,
        employee_name,
        dob,
        phone,
        photo || currentEmployee[0].photo,
        email,
        salary,
        status || "Active",
        id,
      ]
    );
    const [rows] = await connection.query(`
            SELECT e.*, d.name AS department_name, d.status AS department_status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
        `);

    res
      .status(200)
      .json({ data: rows, message: "Employee updated successfully!" });
  } catch (error) {
    if (photo) deleteOldImage(photo);
    res.status(500).json({ error: error.message });
  }
};

const getHighestSalaryByDepartment = async (req, res) => {
  try {
    const [rows] = await connection.query(`
            SELECT e.*, d.name AS department_name, d.status AS department_status
            FROM employees e
            JOIN departments d ON e.department_id = d.id
            WHERE e.salary = (
                SELECT MAX(salary)
                FROM employees
                WHERE department_id = e.department_id
            )
        `);
    res
      .status(200)
      .json({
        data: rows,
        message: "Highest salary details fetched successfully.",
      });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getSalaryWiseCount = async (req, res) => {
  try {
    const [lowSalary] = await connection.query(`
            SELECT COUNT(*) AS low FROM employees WHERE salary >= 0 AND salary <= 10000
        `);

    const [mediumSalary] = await connection.query(`
            SELECT COUNT(*) AS medium FROM employees WHERE salary > 10000 AND salary <= 20000
        `);

    const [highSalary] = await connection.query(`
            SELECT COUNT(*) AS high FROM employees WHERE salary > 20000
        `);

    res.status(200).json({
      data: {
        low: lowSalary[0].low,
        medium: mediumSalary[0].medium,
        high: highSalary[0].high,
      },
      message: "Salary-wise count fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching salary count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const getYoungestEmployee = async (req, res) => {
  try {
    const [row] = await connection.query(`
                  
SELECT e.name AS employee_name,e.dob, e.salary, e.department_id, d.name
from employees e
join departments d
on d.id = e.department_id
WHERE e.dob = (
    SELECT max(dob)
    FROM employees
    WHERE department_id = e.department_id
);
        `);

    res.status(200).json({
      data: row,
      message: "Salary-wise count fetched successfully.",
    });
  } catch (error) {
    console.error("Error fetching salary count:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const department = async (req, res) => {
  const { departmentName, status } = req.body;

  try {
    const [existingDepartment] = await connection.query(
      "SELECT id FROM departments WHERE name = ?",
      [departmentName]
    );

    if (!existingDepartment || existingDepartment.length === 0) {
     
      await connection.query(
        "INSERT INTO departments (name, status) VALUES (?, ?)",
        [departmentName, status]
      );

      const [existingDepartmentlist] = await connection.query(
        "SELECT * from departments"
      );

      res
        .status(201)
        .json({
          row: existingDepartmentlist,
          message: "Department created successfully",
        });
    } else {
      res.status(409).json({ message: "Department already exists." });
    }
  } catch (error) {
    console.error("Error creating department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Editdepartment = async (req, res) => {
  const { id, departmentName, status } = req.body;

  try {
    const [existingDepartment] = await connection.query(
      "SELECT id FROM departments WHERE id = ?",
      [id]
    );

    if (existingDepartment.length === 0) {
      return res.status(404).json({ message: "Department not found." });
    }

    await connection.query(
      "UPDATE departments SET name = ?, status = ? WHERE id = ?",
      [departmentName, status, id]
    );

    const [departmentList] = await connection.query(
      "SELECT * FROM departments"
    );
    res.status(200).json({
      data: departmentList,
      message: "Department updated successfully",
    });
  } catch (error) {
    console.error("Error editing department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const Deletedepartment = async (req, res) => {
  const { id } = req.params;

  try {
    const [existingDepartment] = await connection.query(
      "SELECT id FROM departments WHERE id = ?",
      [id]
    );

    if (existingDepartment.length === 0) {
      return res.status(404).json({ message: "Department not found." });
    }

    await connection.query("DELETE FROM departments WHERE id = ?", [id]);

    const [departmentList] = await connection.query(
      "SELECT * FROM departments"
    );
    res.status(200).json({
      data: departmentList,
      message: "Department deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting department:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getEmployee,
  createEmployee,
  deleteEmployee,
  updateEmployee,
  getHighestSalaryByDepartment,
  getSalaryWiseCount,
  getYoungestEmployee,
  department,
  Editdepartment,
  Deletedepartment,
};
