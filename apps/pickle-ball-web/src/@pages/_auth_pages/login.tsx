import { useEffect } from 'react';
import { Link, Navigate, NavigateProps, redirect } from 'react-router-dom';

export function Login() {
  useEffect(() => {
    document.title = 'Login | ACEPickl';
    document.getElementsByTagName('body')[0].classList.add('loginLayout');

    return () => {
      document.getElementsByTagName('body')[0].classList.remove('loginLayout');
    };
  });
  return (
    <div className="d-flex align-items-center py-4 bg-body-tertiary h-100 login-backdrop">
      <main className="form-signin w-100 m-auto bg-white rounded-4 position-relative">
        <Link
          className="btn btn-sm btn-outline-danger rounded-circle"
          to={'/landing'}
          style={{
            width: '32px',
            height: '32px',
            textAlign: 'center',
            position: 'absolute',
            right: '10px',
            top: '10px',
            padding: '3px'
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width={24}
            height={24}
            color={'currentColor'}
            fill={'none'}
          >
            <path
              d="M18 6L12 12M12 12L6 18M12 12L18 18M12 12L6 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>

        <form action="#" onSubmit={() => redirect('/groups')}>
          <img
            className="mb-4"
            src="./Logo-Green-Trans.png"
            alt="Ace Pickl Logo"
            width={180}
          />
          <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div className="form-check text-start my-3">
            <input
              className="form-check-input"
              type="checkbox"
              value="remember-me"
              id="flexCheckDefault"
            />
            <label className="form-check-label" htmlFor="flexCheckDefault">
              Remember me
            </label>
          </div>
          <button className="btn btn-dark w-100 py-2 mb-3" type="submit">
            Sign in
          </button>
          {/* <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p> */}
          <p className="mb-3 text-body-secondary text-center">
            Don't have an account?
          </p>
          <Link
            to={'/register'}
            className="btn btn-outline-secondary w-100 py-2"
          >
            Register
          </Link>
        </form>
      </main>
    </div>
  );
}
