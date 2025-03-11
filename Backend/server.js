const express = require('express');
const cors = require('cors');
require('dotenv').config();
const Employee = require("./Routes/Api/Employee");

require("./Db/Database");

const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({ origin: [process.env.FRONT_URL] }));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send('API is working');
});

app.use("/api/employee", Employee);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
