# Employee Mamangement

Employee Management Application Task built using the MERN (MongoDB, Express.js, React.js, Node.js) stack.
  

### Prerequisites

- Node.js installed on your machine with latest version or v22.14.0
- MongoDB Atlas account (or local MongoDB server)

### Functional specification:

1) List down all employees in the grid with the paging feature
2) give functionality to add/edit and delete employees
3) provide the below statistics somewhere on the page or you can create different pages for each
statistics
i. Department wise highest salary of employees
ii. Salary range wise employee count. [For Example: '0-50000'=> 3,'50001-100000'=>2,'100000+' => 1]
[Note: Do it using single query]
iii. Name and age of the youngest employee of each department.

### Installation


1. Install NPM packages:
   ```sh
   cd Backend
   npm install
   cd..
   cd frontend
   npm install
   ```
2. Set up environment variables:
   - changes a `.env` in  the backend directory, containing the following variables:
   ```env
PORT=3000 # YOUR PORT NUMBER
DB_HOST=localhost # YOUR DB HOST NAME
DB_USER=root # YOUR DB USER NAME
DB_PASSWORD=4565 # YOUR DB PASSWORD
DB_NAME=user_schema # YOUR DB NAME
FRONT_URL = "http://localhost:5173" # YOUR FRONTEND URL
   ```

   Replace each value with your specific configuration details.

3. Run the application Backend:
   ```sh
   npm start
   ```
4. Backend in connection succesfully then run command for Initialize Database Tables 
 ```sh
   npm run script
   ```
5. In the frontend, navigate to the apiCheck folder and locate the constant.js file. Update the baseUrl and baseUrlImg values with your backend's running port.

6. Run the application Frontend:
   ```sh
   npm run dev
   ```
7. Open your browser and navigate to `http://localhost:5173` to view the app.