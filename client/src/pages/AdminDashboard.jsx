import Profile from "@/components/AdminDashboard/Profile";
import Settings from "@/components/AdminDashboard/Settings";
import DefaultLayout from "@/layout/DefaultLayout";
import { Outlet } from "react-router-dom";

function AdminDashboard() {
  return (
    <DefaultLayout>
      <Outlet />
    </DefaultLayout>
  );
}

export default AdminDashboard;
