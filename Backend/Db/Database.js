const mysql = require('mysql2');

console.log(process.env.DB_HOST)
const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost', 
  user: process.env.DB_USER || 'root',        
  password: process.env.DB_PASSWORD || '4565',
  database: process.env.DB_NAME || 'user_schema'
}).promise(); 
connection.connect()
    .then(() => console.log('✅ Connected to the database!'))
    .catch((err) => console.error('❌ Database connection error:', err));

module.exports = connection;
