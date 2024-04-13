import "./index.css";
import { Navigate, Route, Routes } from "react-router-dom";
import AdminConsole from "./pages/AdminConsole";
import { AdminLayout } from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ProtectedLayout from "./layouts/ProtectedLayout";
import ChatBotPage from "./pages/ChatBotPage";
import { DataLeakAnalytics } from "./pages/DataLeakAnalytics";
import PiiIdentifier from "./pages/PiiIdentifier";
import Settings from "./pages/Settings";
import RootLayout from "./layouts/RootLayout";
import ForgotPassword from "./pages/Authentication/ForgotPassword";
import Login from "./pages/Authentication/Login";
import Register from "./pages/Authentication/Register";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={"/chat"} />} />
      <Route element={<RootLayout />}>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Route>

        {/* <Route element={<ProtectedLayout />}> */}
          <Route path="/pii_identifier" element={<PiiIdentifier />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/data_leak" element={<DataLeakAnalytics />} />
          <Route path="/chat" element={<ChatBotPage />} />
        {/* </Route> */}

        {/* <Route element={<AdminLayout />}> */}
          <Route path="/admin_console" element={<AdminConsole />} />
        {/* </Route> */}
      </Route>
    </Routes>
  );
}
export default App;
