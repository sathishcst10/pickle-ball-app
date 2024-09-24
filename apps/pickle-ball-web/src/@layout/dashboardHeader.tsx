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
      className="navbar navbar-expand-lg bg-body-tertiary rounded shadow-sm"
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
          <Link className="navbar-brand col-lg-3 me-0" to={'#'}>
            <img
              src="Logo-Green-Trans.png"
              alt="Logo"
              style={{ width: '150px' }}
            />
          </Link>
          <ul className="navbar-nav col-lg-6 justify-content-lg-center">
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
                    {JSON.parse(localStorage.getItem('user')!).user_fname +
                      ' ' +
                      JSON.parse(localStorage.getItem('user')!).user_lname}
                  </p>
                  <small className="text-muted">
                    Last login:{' '}
                    {JSON.parse(localStorage.getItem('user')!).user_lasllogin}
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
                  <Link className="dropdown-item" to={'#'}>
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
