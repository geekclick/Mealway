import "./App.css";
import Cart from "./pages/Cart";
import EnterOtp from "./pages/EnterOtp";
import Favourite from "./pages/Favourite";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Notification from "./pages/Notification";
import SearchPage from "./pages/SearchPage";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";
import Vendor from "./pages/Vendor";
import Map from "./pages/Map";
import Order from "./pages/Order";
import RegisterShop from "./pages/RegisterShop";
import VendorInfo from "./pages/VendorInfo";
import AdminDashboard from "./pages/AdminDashboard";
import UsersTable from "./components/AdminDashboard/UsersTable";
import VendorsTable from "./components/AdminDashboard/VendorsTable";
import FoodsTable from "./components/AdminDashboard/FoodsTable";
import Profile from "./components/AdminDashboard/Profile";
import Settings from "./components/AdminDashboard/Settings";
import LogIn from "./components/AdminDashboard/SignIn";
import Dashboard from "./components/AdminDashboard/Dashboard";
import CategoryFoods from "./components/homepage/CategoryFoods";
import SimilarFoods from "./components/homepage/SimilarFoods";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendor/:id" element={<Vendor />} />
      <Route path="/vendor-info/:id" element={<VendorInfo />} />
      <Route path="/favourite" element={<Favourite />} />

      <Route path="/category/:category" element={<CategoryFoods />} />
      <Route path="/getFoodByFoodName/:foodName" element={<SimilarFoods />} />

      <Route path="/order" element={<Order />} />
      <Route path="/reward" element={<Home />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/map" element={<Map />} />
      <Route path="/register-shop" element={<RegisterShop />} />
      <Route path="/yehbatebatayinahijati" element={<AdminDashboard />}>
        <Route path="/yehbatebatayinahijati/" element={<Dashboard />} />
        <Route path="/yehbatebatayinahijati/users" element={<UsersTable />} />
        <Route
          path="/yehbatebatayinahijati/vendors"
          element={<VendorsTable />}
        />
        <Route path="/yehbatebatayinahijati/foods" element={<FoodsTable />} />
        <Route path="/yehbatebatayinahijati/profile" element={<Profile />} />
        <Route path="/yehbatebatayinahijati/settings" element={<Settings />} />
      </Route>
      <Route path="/yehbatebatayinahijati/login" element={<LogIn />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/enter-otp" element={<EnterOtp />} />
    </Routes>
  );
}

export default App;
