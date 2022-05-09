
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  BrowserRouter,
} from "react-router-dom";
import DashboardLayout from "./components/DashboardLayout";

import Login from "./pages/LogIn";
import Register from "./pages/Register";
import Payment from "./pages/Payment";
import SurveyDetails from "./pages/SurveyDetails";
import Team from "./pages/Team";
import TrialDetails from "./pages/TrialDetails";
import Trials from "./pages/Trials";

import Cookies from 'js-cookie'
export default function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<DashboardLayout />}>
          <Route
            path="/courses"
            element={
              <RequireAuth>
                <Trials />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:id"
            element={
              <RequireAuth>
                <TrialDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/courses/:id/quiz/:id"
            element={
              <RequireAuth>
                <SurveyDetails />
              </RequireAuth>
            }
          />
          <Route
            path="/team"
            element={
              <RequireAuth>
                <Team />
              </RequireAuth>
            }
          />
          <Route
            path="/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter >);

  function RequireAuth({ children }) {
    let location = useLocation();
    if (Cookies.get("login") == "true"){
      return children;
    }
    return <Navigate to="/login" state={{ from: location }} replace />;
  }


}
