import { NavLink, Outlet, useLocation } from "react-router-dom";
import "../index.css";

export default function Statistics() {
  const location = useLocation();

  return (
    <div>
        <div className="text-3xl pb-10 text-center">Statistics</div>
      <div className="menuStats">
        <NavLink to="/statistics" className={`${location.pathname === "/statistics" ? "activeLink" : "link"}`}>
          General
        </NavLink>
        <NavLink to="top100musics/sinceforever" className={`${location.pathname.includes("/top100musics") ? "activeLink" : "link"}`}>
          Musics
        </NavLink>
        <NavLink to="top100artists/sinceforever" className={`${location.pathname.includes("/top100artists") ? "activeLink" : "link"}`}>
          Artists
        </NavLink>
      </div>
      {location.pathname.includes("/statistics/top100musics") && (
        <div className="grid grid-cols-4 grid-rows-1 gap-4 text-center butoesTempo">
          <NavLink to="top100musics/last4weeks" className={"topNavLinks"}>Last 4 weeks</NavLink>
          <NavLink to="top100musics/last6months" className={"topNavLinks"}>Last 6 months</NavLink>
          <NavLink to="top100musics/lastyear" className={"topNavLinks"}>Last year</NavLink>
          <NavLink to="top100musics/sinceforever" className={"topNavLinks"}>Since forever</NavLink>
        </div>
      )}
      {location.pathname.includes("/statistics/top100artists") && (
        <div className="grid grid-cols-4 grid-rows-1 gap-4 text-center butoesTempo">
          <NavLink to="top100artists/last4weeks" className={"topNavLinks"}>Last 4 weeks</NavLink>
          <NavLink to="top100artists/last6months" className={"topNavLinks"}>Last 6 months</NavLink>
          <NavLink to="top100artists/lastyear" className={"topNavLinks"}>Last year</NavLink>
          <NavLink to="top100artists/sinceforever" className={"topNavLinks"}>Since forever</NavLink>
        </div>
      )}
      <Outlet />
    </div>
  );
}
