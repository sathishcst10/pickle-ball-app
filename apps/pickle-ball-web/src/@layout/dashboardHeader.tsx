import { Link, NavLink } from 'react-router-dom';

export const DashboardHeader = () => {
  const doLogout = (e: any) => {
    e.preventDefault();
    fetch('https://acepicklapi.raganindustries.com/api_user_logout.php', {
      method: 'get',
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
    })
      .then((response) => {
        if (response.status === 200) {
          localStorage.clear();
          window.location.href = '/';
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  return (
    // <header className="navbar sticky-top bg-light flex-md-nowrap p-0 shadow">
    <nav
      className="navbar navbar-expand-lg bg-body-tertiary rounded shadow-sm sticky-top"
      aria-label="Thirteenth navbar example"
    >
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarsExample11"
          aria-controls="navbarsExample11"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse d-lg-flex"
          id="navbarsExample11"
        >
          <Link className="navbar-brand col-lg-3 me-0" to={'/ace/landing'}>
            <img
              src="Logo-Green-Trans.png"
              alt="Logo"
              style={{ width: '150px' }}
            />
          </Link>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
            <li>
              <NavLink className="nav-link" to={'/ace/landing'} title='Home'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"currentColor"} fill={"none"}>
                <path d="M9 22L9.00192 17.9976C9.00236 17.067 9.00258 16.6017 9.15462 16.2347C9.35774 15.7443 9.74746 15.3547 10.2379 15.1519C10.6051 15 11.0704 15 12.001 15V15C12.9319 15 13.3974 15 13.7647 15.152C14.2553 15.355 14.645 15.7447 14.848 16.2353C15 16.6026 15 17.0681 15 17.999V22" stroke="currentColor" strokeWidth="1.5" />
                <path d="M7.08848 4.76243L6.08847 5.54298C4.57181 6.72681 3.81348 7.31873 3.40674 8.15333C3 8.98792 3 9.95205 3 11.8803V13.9715C3 17.7562 3 19.6485 4.17157 20.8243C5.34315 22 7.22876 22 11 22H13C16.7712 22 18.6569 22 19.8284 20.8243C21 19.6485 21 17.7562 21 13.9715V11.8803C21 9.95205 21 8.98792 20.5933 8.15333C20.1865 7.31873 19.4282 6.72681 17.9115 5.54298L16.9115 4.76243C14.5521 2.92081 13.3724 2 12 2C10.6276 2 9.44787 2.92081 7.08848 4.76243Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
              </svg>
              </NavLink>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to={'#'}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Club League
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to={'/ap/groups'}>
                    Group
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'/ap/courts'}>
                    Court
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to={'/ap/schedule'}>
                    Schedule
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Chat
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to={'#'}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Tournament
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Group
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Court
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Schedule
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                to={'#'}
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Meet & Greet
              </NavLink>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Group
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Court
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item disabled" to={'#'}>
                    Schedule
                  </Link>
                </li>
              </ul>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to={'#'}>
                ACE Pickl Ranking
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link disabled" to={'#'}>
                Resources
              </NavLink>
            </li>
          </ul>

          <div className="d-lg-flex col-lg-3 justify-content-lg-end">
            <div className="dropdown">
              <Link
                className="nav-link text-end"
                to={'#'}
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <label htmlFor="">
                  <p
                    className="mb-0 fw-bold"
                    style={{ textTransform: 'capitalize' }}
                  >
                    { 
                      localStorage.getItem('isLoggedIn') &&

                      JSON.parse(localStorage.getItem('user')!).user_fname +
                      ' ' +
                      JSON.parse(localStorage.getItem('user')!).user_lname
                    }
                  </p>
                  <small className="text-muted">
                    Last login:{' '}
                    { localStorage.getItem('isLoggedIn') && JSON.parse(localStorage.getItem('user')!).user_lasllogin}
                  </small>
                </label>
                <img
                  src="avatar.svg"
                  alt="userAvatar"
                  className="ms-2"
                  style={{
                    width: '48px',
                    height: '48',
                    verticalAlign: 'bottom',
                  }}
                />
              </Link>

              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <Link
                    className="dropdown-item"
                    data-bs-toggle="offcanvas"
                    to={'#userProfileCanvas'}
                    role="button"
                    aria-controls="userProfileCanvas"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item"  data-bs-toggle="offcanvas"
                    to={'#changePasswordCanvas'}
                    role="button"
                    aria-controls="changePasswordCanvas">
                    Change Password
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown-item"
                    to={'#'}
                    onClick={(e) => doLogout(e)}
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
    // </header>
  );
};
