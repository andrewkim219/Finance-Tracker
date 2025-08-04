import { Outlet, NavLink } from "react-router-dom";

export function SideBar() {
  return (
    <>
      <div className="sidebar">
        <nav>
          <NavLink to="/dashboard">Dashboard</NavLink>
          <NavLink to="/accounts">Accounts</NavLink>
          <NavLink to="/settings">Settings</NavLink>
        </nav>
      </div>

      <Outlet />
    </>
  );
}
