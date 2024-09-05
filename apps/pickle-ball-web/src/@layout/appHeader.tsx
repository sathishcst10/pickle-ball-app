export function AppHeader() {
  return (
    <header data-bs-theme="dark">
      <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark app-dark-bg-color">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Ace Pickl
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
                <a className="nav-link active" aria-current="page" href="#">
                  Home
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Club League
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Tournament
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Meet & Greet
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  ACE PKL Ranking
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Resources
                </a>
              </li>
            </ul>
            <button className="btn btn-primary me-2" type="submit">
                Sign In
            </button>
            <button className="btn btn-success" type="submit">
                Sign Up
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}
