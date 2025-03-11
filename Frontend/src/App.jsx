import { lazy, Suspense } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";

import FilterEmployee from "./Component/FilterEmployee";
import Loader from "./ApiCheck/Loader";
const Employee = lazy(() => import("./Component/Employee"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Employee />} />
          <Route path="/employee" element={<FilterEmployee />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
