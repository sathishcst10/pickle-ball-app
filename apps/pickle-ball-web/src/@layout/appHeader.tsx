import { Link, NavLink } from 'react-router-dom';
import { App_logo_svg } from '../@components/_icons/app_logo';
import { useEffect } from 'react';

export function AppHeader() {
  // useEffect(() => {
  //   require('bootstrap/dist/js/bootstrap.bundle.min.js');
  // }, []);

  

  return (
    <header data-bs-theme="light">
      <nav className="navbar navbar-expand-md navbar-light fixed-top bg-light">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            {/* <App_logo_svg/> */}
            <img
              src="./Logo-Green-Trans.png"
              width={120}
              alt="app_logo"
              className="d-inline-block align-text-top"
            />
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
            <ul className="navbar-nav mx-auto mb-2 mb-md-0 d-none">
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  aria-current="page"
                  to={'/landing'}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to={'#'} role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Club League
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item" to={'/groups'}>Group</NavLink></li>
                  <li><NavLink className="dropdown-item" to={'/schedule'}>Schedule</NavLink></li>                  
                  <li><NavLink className="dropdown-item" to={'/courts'}>Court</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to={'#'} role='button' data-bs-toggle="dropdown" aria-expanded="false">
                  Tournament
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Group</NavLink></li>
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Schedule</NavLink></li>
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Court</NavLink></li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <NavLink className="nav-link dropdown-toggle" to={'#'} role='button' data-bs-toggle="dropdown" aria-expanded="false">
                  Meet & Greet
                </NavLink>
                <ul className="dropdown-menu">
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Group</NavLink></li>
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Schedule</NavLink></li>
                  <li><NavLink className="dropdown-item disabled" to={'#'}>Court</NavLink></li>
                </ul>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/ace-ranking'}>
                  ACE PKL Ranking
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to={'/resources'}>
                  Resources
                </NavLink>
              </li>             
            </ul>
           
                <div className='ms-auto'>
                  <Link
                    to={'/login'}
                    className="btn btn-primary me-2"
                    type="submit"
                  >
                    Sign In
                  </Link>
                  <Link
                    to={'/register'}
                    className="btn btn-success"
                    type="submit"
                  >
                    Sign Up
                  </Link>
                </div>
              
          </div>
        </div>
      </nav>
    </header>
  );
}
