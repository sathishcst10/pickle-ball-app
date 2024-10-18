import { Password } from 'primereact/password';
import { useEffect, useState } from 'react';
import { Link, Navigate, NavigateProps, redirect, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export function Login() {
    const [userRequest, setUserRequest] = useState({        
        "user_authcode" : 1,
        "user_authparameter" : "",
        "user_password" : ""          
    });

    const [checkEmail, setCheckEmail] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);

    const navigate = useNavigate();

    const appLogin = async () => {

      setUserRequest({
        ...userRequest,
        user_authcode : userRequest.user_authparameter.includes('@') ? 1 : 0
      })
        
        const response = await fetch('https://acepicklapi.raganindustries.com/api_user_login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });
        const data = await response.json();
        if(data.status === "STATUS OK") {
            localStorage.setItem('user', JSON.stringify(data));
            localStorage.setItem('isLoggedIn', 'true');
            //window.location.href = '/ap/groups';
            navigate('/ace/landing');
            //redirect('/groups');
        }else{
          //alert(data.status +" : "+ data.description);
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data.description,
          });
        }
        console.log(data);
    }

  useEffect(() => {
    if(localStorage.getItem('isLoggedIn')){
      navigate('/ap/groups');
    }
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
          to={'/'}
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
          <div className="mb-3 d-none">
          <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="userType" id="userTYpe2" value="admin"/>
              <label className="form-check-label" htmlFor="userType2">Admin</label>
            </div>
            <div className="form-check form-check-inline">
              <input className="form-check-input" type="radio" name="userType" id="userTYpe1" value="player"/>
              <label className="form-check-label" htmlFor="userType1">Player</label>
            </div>            
          </div>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com/000000000"
              value={userRequest.user_authparameter}
              onChange={(e) => setUserRequest({...userRequest, user_authparameter: e.target.value})}
              onBlur={(e) => e.target.value.length === 0 ? setCheckEmail(true) : setCheckEmail(false)}
            />
            <label htmlFor="floatingInput">Email address/Phone number</label>
            {
              userRequest.user_authparameter.length === 0 && checkEmail &&
              <small className="text-danger" >
                Please enter a valid email address.
              </small>
            }
          </div>
          <div className="form-floating">
            <input
              type="password"
              className="form-control d-none"
             
              placeholder="Password"
              value={userRequest.user_password}
              onChange={(e) => setUserRequest({...userRequest, user_password: e.target.value})}
              onBlur={(e) => e.target.value.length === 0 ? setCheckPassword(true) : setCheckPassword(false)}
            />

            <Password 
              promptLabel="Please enter a password"
              weakLabel="Weak"
              mediumLabel="Medium"
              strongLabel="Strong"
              inputId="floatingPassword"
              inputClassName='form-control form-control-lg p-3'
              feedback={true}
              toggleMask={true}
              value={userRequest.user_password}
              onChange={(e) => setUserRequest({...userRequest, user_password: e.target.value})}
              onBlur={(e) => e.target.value.length === 0 ? setCheckPassword(true) : setCheckPassword(false)}
            />
            <label htmlFor="floatingPassword">Password</label>
            {
              userRequest.user_password.length > 0 && checkPassword &&
              <div className="text-danger" >
                Please enter  a valid password.
              </div>
            }
          </div>
          <div className='d-flex justify-content-end'>
            <div className="form-check text-start my-3 d-none">
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
            <Link to={'/forgotPassword'} className="my-3 link-primary text-decoration-none">
              Forgot password?
            </Link>
          </div>
          {
            userRequest.user_authparameter.length > 0 && userRequest.user_password.length > 0 ?
            <button className="btn btn-dark w-100 py-2 mb-3" type="submit">
              Sign in
            </button>

            :

            <>
              {/* <div className="alert alert-danger" role='alert'>
                Please enter valid email address or phone number and password.
              </div> */}
              <button className="btn btn-dark w-100 py-2 mb-3 disabled" type="submit">
                Sign in
              </button>
            </>
          }
          
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
