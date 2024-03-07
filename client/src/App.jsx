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

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/vendor/:id" element={<Vendor />} />
      <Route path="/vendor-info/:id" element={<VendorInfo />} />
      <Route path="/favourite" element={<Favourite />} />
      <Route path="/order" element={<Order />} />
      <Route path="/reward" element={<Home />} />
      <Route path="/notification" element={<Notification />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/map" element={<Map />} />
      <Route path="/register-shop" element={<RegisterShop />} />

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/enter-otp" element={<EnterOtp />} />
    </Routes>
  );
}

export default App;
