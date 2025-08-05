import { Route, Routes } from "react-router-dom";
import PublicRoute from "./utils/PublicRoute.tsx";
import PrivateRoute from "./utils/PrivateRoute.tsx";
import LandingPage from "./pages/public/LandingPage.tsx";
import LoginPage from "./pages/public/LoginPage.tsx";
import RegisterPage from "./pages/public/RegisterPage.tsx";
import Home from "./pages/private/Home.tsx";
import { SideBar } from "./components/SideBar.tsx";
import { Settings } from "./pages/private/Settings.tsx";
import { DashBoard } from "./pages/private/DashBoard.tsx";
import { Accounts } from "./pages/private/Accounts.tsx";
import { ModalProvider } from "./context/ModalContext";
import { Transactions } from "./pages/private/Transactions.tsx";

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<PrivateRoute />}>
          <Route path="/app" element={<SideBar />}>
            <Route path="home" element={<Home />} />
            <Route path="dashboard" element={<DashBoard />} />
            <Route path="accounts" element={<Accounts />} />
            <Route path="settings" element={<Settings />} />
            <Route path="transactions/:id" element={<Transactions />} />
          </Route>
        </Route>
      </Routes>
    </ModalProvider>
  );
}

export default App;
