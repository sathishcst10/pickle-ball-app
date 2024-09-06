import { Link, NavLink } from "react-router-dom";
import { App_logo_svg } from "../@components/_icons/app_logo";

export function AppHeader() {
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark app-dark-bg-color">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <App_logo_svg/> */}
            <img src="./Logo-Black-Trans.png" width={120} alt="app_logo"  className="d-inline-block align-text-top" />
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav mx-auto mb-2 mb-md-0">
              <li className="nav-item">
                <NavLink className="nav-link" aria-current="page" to={"/landing"}>
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/groups"}>
                  Club League
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/tournaments"}>
                  Tournament
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/meetGreet"}>
                  Meet & Greet
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/ace-ranking"}>
                  ACE PKL Ranking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={"/resources"}>
                  Resources
                </NavLink>
              </li>
            </ul>
            <Link to={'/login'} className="btn btn-primary me-2" type="submit">
                Sign In
            </Link>
            <Link to={'/register'} className="btn btn-success" type="submit">
                Sign Up
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}
