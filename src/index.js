import "./index.css";
import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  Link,
  NavLink,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import Homepage from "./pages/Homepage";
import { IoIosStats, IoMdHome, IoMdPerson, IoMdSearch } from "react-icons/io";
import Search from "./pages/Search";
import Statistics from "./pages/Statistics";
import { Top100Artists,  Top100ArtistsLast4Weeks,  Top100ArtistsLast6Months,  Top100ArtistsLastYear,  Top100Musics,  Top100Musics4Weeks, Top100Musics6months,  Top100MusicsLasYear, Top20MusicasArtista } from "./common/FuncoesGerais";
import General from "./pages/General";
import { SearchResultsArtist } from "./pages/SearchArtistResults";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className="content">
        <div className="gridCards">
          <Outlet />
        </div>
        <div className="flex gap-10 footerMenu">
          <NavLink to="/" className="links" activeClassName="active" >
            <IoMdHome  activeClassName="active" className="icon" />Home
          </NavLink>
          <NavLink to="/search" className="links">
            <IoMdSearch className="icon" />Search
          </NavLink>
          <NavLink to="/statistics" className="links">
            <IoIosStats className="icon" />Statistics
          </NavLink>
          <NavLink to="/profile" className="links">
            <IoMdPerson className="icon" />Profile
          </NavLink>
        </div>
      </div>
    ),
    children: [
      {
        path: "/search",
        element: <Search />,
        children: [
          // {
          //   path: "results",
          //   element: <SearchResultsArtist />,
          // },
        ]
      },
      {
        path: "/statistics",
        element: <Statistics />,
        children: [
          {
            path: "",
            element: <General />,
          },
          {
            path: "top100musics",
            element: "",
            children: [
              {
                path: "last4weeks",
                element: <Top100Musics4Weeks />, 
              },
                {
                path: "last6months",
                element: <Top100Musics6months /> ,
              },
              {
                path: "lastyear",
                element: <Top100MusicsLasYear />,
              },
              {
                path: "sinceforever",
                element: <Top100Musics />,
              },
            ],
          },
          {
            path: "top100artists",
            element: "",
            children: [
              {
                path: "last4weeks",
                element: <Top100ArtistsLast4Weeks />,
              },
              {
                path: "last6months",
                element: <Top100ArtistsLast6Months />,
              },
              {
                path: "lastyear",
                element: <Top100ArtistsLastYear />,
              },
              {
                path: "sinceforever",
                element: <Top100Artists />,
              },
            ],
          },
        ],
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "",
        element: <Homepage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
