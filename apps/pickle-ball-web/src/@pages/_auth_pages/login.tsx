import { useEffect, useState } from 'react';
import { Link, Navigate, NavigateProps, redirect } from 'react-router-dom';

export function Login() {
    const [userRequest, setUserRequest] = useState({        
        "user_authcode" : 1,
        "user_authparameter" : "",
        "user_password" : ""          
    });

    const appLogin = async () => {
        const response = await fetch('https://acepicklapi.raganindustries.com/api_user_login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });
        const data = await response.json();
        if(data.status === "STATUS OK") {
            console.log("Login Successful");
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', 'true');
            window.location.href = '/groups';
            //redirect('/groups');
        }
        console.log(data);
    }

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
          className="btn-close"
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
        </Link>

        <form action="#" onSubmit={(e) => { e.preventDefault(); appLogin()}}>
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
              value={userRequest.user_authparameter}
              onChange={(e) => setUserRequest({...userRequest, user_authparameter: e.target.value})}
            />
            <label htmlFor="floatingInput">Email address/Phone number</label>
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              value={userRequest.user_password}
              onChange={(e) => setUserRequest({...userRequest, user_password: e.target.value})}
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
