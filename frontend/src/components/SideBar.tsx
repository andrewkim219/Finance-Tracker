import { Outlet, NavLink } from "react-router-dom";
import Icon from "@mdi/react";
import {
  mdiViewDashboard,
  mdiCardAccountDetails,
  mdiCog,
  mdiLogout,
} from "@mdi/js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.tsx";

export function SideBar() {
  const { setIsAuthenticated, setCurrentUser } = useContext(AuthContext);

  function handleLogout() {
    setIsAuthenticated(false);
    setCurrentUser(null);
  }

  return (
    <>
      <div className="sidebar">
        <nav>
          <div>
            <Icon path={mdiViewDashboard} size={1} />
            <NavLink to="/app/dashboard">Dashboard</NavLink>
          </div>
          <div>
            <Icon path={mdiCardAccountDetails} size={1} />
            <NavLink to="/app/accounts">Accounts</NavLink>
          </div>
          <div>
            <Icon path={mdiCog} size={1} />
            <NavLink to="/app/settings">Settings</NavLink>
          </div>
          <div>
            <Icon path={mdiLogout} size={1} />
            <NavLink to="/" onClick={handleLogout}>
              Log Out
            </NavLink>
          </div>
        </nav>
      </div>

      <div className="ml-[15%]">
        <Outlet />
      </div>
    </>
  );
}
