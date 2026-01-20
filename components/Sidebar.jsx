import { NavLink } from "react-router-dom";

export default function Sidebar() {
  const linkClass = ({ isActive }) =>
    "side-link" + (isActive ? " active" : "");

  return (
    <aside className="sidebar">
      <p className="side-title">NAVIGATION</p>
      <NavLink className={linkClass} to="/board">Kanban Board</NavLink>
      <NavLink className={linkClass} to="/jobs">Live Jobs</NavLink>
    </aside>
  );
}
