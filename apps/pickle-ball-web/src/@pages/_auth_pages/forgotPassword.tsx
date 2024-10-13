import { useEffect, useState } from 'react';
import {
  Link,
  Navigate,
  NavigateProps,
  redirect,
  useNavigate,
} from 'react-router-dom';
import Swal from 'sweetalert2';

export function ForgotPassword() {
  const [userRequest, setUserRequest] = useState({
    user_authcode: 1,
    user_authparameter: '',
    user_password: '',
  });

  const [resetPwd, setResetPwd] = useState({
    user_email: userRequest.user_authparameter,
    user_otp: '',
    user_password: '',
    user_new_password: '',
  })

  const navigate = useNavigate();
  const [checkEmail, setCheckEmail] = useState(false);
  const [stepOne, setStepOne] = useState(false);
  const getOTP = async () => {
    setStepOne(true);
  };

  const resetPassword = (e:any) => {
    e.preventDefault();
    fetch('https://acepicklapi.raganindustries.com/api_check_otp.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'STATUS OK') {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: data,
          });
          setStepOne(false);
        } else {
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data,
          });
        }
      }).catch((error) => {
        Swal.fire({
          icon: 'error',
          title: 'ERROR',
          text: 'Something went wrong',
        });
      })
      ; 
  
  }

  useEffect(() => {
    if (localStorage.getItem('isLoggedIn')) {
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
            padding: '3px',
          }}
        ></Link>

        {!stepOne && (
          <form
            action="#"
            onSubmit={(e) => {
              e.preventDefault();
              getOTP();
            }}
          >
            <img
              className="mb-4"
              src="./Logo-Green-Trans.png"
              alt="Ace Pickl Logo"
              width={180}
            />
            <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>
            <div className="mb-3 d-none">
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="userTYpe2"
                  value="admin"
                />
                <label className="form-check-label" htmlFor="userType2">
                  Admin
                </label>
              </div>
              <div className="form-check form-check-inline">
                <input
                  className="form-check-input"
                  type="radio"
                  name="userType"
                  id="userTYpe1"
                  value="player"
                />
                <label className="form-check-label" htmlFor="userType1">
                  Player
                </label>
              </div>
            </div>
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                id="floatingInput"
                placeholder="name@example.com/000000000"
                value={userRequest.user_authparameter}
                onChange={(e) =>
                  setUserRequest({
                    ...userRequest,
                    user_authparameter: e.target.value,
                  })
                }
                onBlur={(e) =>
                  setCheckEmail(e.target.value.length === 0 ? true : false)
                }
              />
              <label htmlFor="floatingInput">Email address/Phone number</label>
              {userRequest.user_authparameter.length === 0 && checkEmail && (
                <div className="text-danger">
                  Please enter a valid email address or phone number.
                </div>
              )}
            </div>

            {            
              <button
                className="btn btn-dark w-100 py-2 mb-3"
                type="submit"
              >
                Send reset link
              </button>
            }

            {/* <p className="mt-5 mb-3 text-body-secondary">© 2017–2024</p> */}
            <p className="mb-3 text-body-secondary text-center">
              Back to
              <Link to={'/login'} className="ms-2">
                login
              </Link>
            </p>
          </form>
        )}

        {stepOne && (
          <form onSubmit={(e)=>resetPassword(e)}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="floatingOTP"
                placeholder="OTP"
                value={resetPwd.user_otp}
                onChange={(e) =>
                  setResetPwd({
                    ...resetPwd,
                    user_otp: e.target.value,
                  })
                }
              />
              <label htmlFor="floatingOTP">OTP</label>
              
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingPassword"
                placeholder="Password"
                value={resetPwd.user_password}
                onChange={(e) =>
                  setResetPwd({
                    ...resetPwd,
                    user_password: e.target.value,
                  })
                }
              />
              <label htmlFor="floatingPassword">New Password</label>
              {resetPwd.user_password.length > 0 &&
                resetPwd.user_password.length < 6 && (
                  <div className="text-danger">
                    Please enter a valid password.
                  </div>
                )}
            </div>
            <div className="form-floating mb-3">
              <input
                type="password"
                className="form-control"
                id="floatingConfirmPassword"
                placeholder="Password"
                value={resetPwd.user_new_password}
                onChange={(e) =>
                  setResetPwd({
                    ...resetPwd,
                    user_new_password: e.target.value,
                  })
                }
              />
              <label htmlFor="floatingConfirmPassword">Confirm Password</label>
              {resetPwd.user_new_password.length > 0 &&
                resetPwd.user_new_password.length < 6 && (
                  <div className="text-danger">
                    Please enter a valid password.
                  </div>
                )}
            </div>
            <button type="submit" className="btn btn-dark">
              Reset Password
            </button>
          </form>
        )}
      </main>
    </div>
  );
}
