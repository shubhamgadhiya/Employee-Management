const express = require("express");
const {getEmployee, createEmployee, deleteEmployee, updateEmployee, getHighestSalaryByDepartment,getSalaryWiseCount,getYoungestEmployee, department, Editdepartment, Deletedepartment} = require("../Controller/Employee");
const router = express.Router();
const upload = require("../../Multer/Multer");

router.get("/employee", getEmployee);
router.post("/addemployee",upload.single("photo"),createEmployee);
router.put("/editemployee/:id", upload.single("photo"), updateEmployee);
router.delete("/deleteemployee/:id", deleteEmployee);

router.get("/highestsalary", getHighestSalaryByDepartment);
router.get("/salarycount", getSalaryWiseCount);
router.get("/youngestemployee", getYoungestEmployee);

router.post("/department", department);
router.post("/editdepartment", Editdepartment);
router.delete("/deletedepartment/:id", Deletedepartment);



module.exports = router;
