const connection = require('../Db/Database');

const createTables = async () => {
    const departmentTableQuery = `
        CREATE TABLE IF NOT EXISTS departments (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            status ENUM('Pending', 'Approved', "Rejected") DEFAULT 'Pending',
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
    `;

    const employeeTableQuery = `
        CREATE TABLE IF NOT EXISTS employees (
            id INT AUTO_INCREMENT PRIMARY KEY,
            department_id INT NOT NULL,
            name VARCHAR(255) NOT NULL,
            dob DATE,
            phone VARCHAR(15),
            photo VARCHAR(255),
            email VARCHAR(255) NOT NULL UNIQUE,
            salary DECIMAL(10, 2) NOT NULL,
            status ENUM('Active', 'Inactive') DEFAULT 'Active',
            created TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            modified TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (department_id) REFERENCES departments(id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE
        )
    `;

    try {
        await connection.query(departmentTableQuery);
        console.log('✅ Table "departments" created successfully!');
        
        await connection.query(employeeTableQuery);
        console.log('✅ Table "employees" created successfully!');
    } catch (error) {
        console.error('❌ Error creating tables:', error.message);
    }
};

module.exports = createTables;
