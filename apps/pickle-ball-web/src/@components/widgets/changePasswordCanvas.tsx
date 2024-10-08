import { useState } from "react";
import Swal from "sweetalert2";

export const ChangePasswordCanvas = () => {
  const [passwordRequest, setPasswordRequest] = useState({
    old_password: '',
    new_password: '',
    confirm_password: '',
  });


  const changePassword = async (e: any) => {
    e.preventDefault();
    if (passwordRequest.new_password !== passwordRequest.confirm_password) {
      return;
    }

    fetch(`https://acepicklapi.raganindustries.com/api_change_password.php`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.access_token}`
      },
      body: JSON.stringify({
        old_password: passwordRequest.old_password,
        new_password: passwordRequest.new_password,
      })
    }).then(response => response.json())
      .then(data => {
        console.log(data);
        if (data === 'STATUS OK') {
          
          setPasswordRequest({
            old_password: '',
            new_password: '',
            confirm_password: '',
          });
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Password Changed Successfully',
          }).then((result) => {
            if (result.isConfirmed) {
              localStorage.clear();
              window.location.reload();
            }
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: data,
          })
        }
      }).catch((error) => {
        console.error('Error:', error); 
        alert('Password Change Failed');
      });
  }


  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="changePasswordCanvas"
      data-bs-backdrop="static"
      aria-labelledby="changePasswordCanvasLabel"
      style={{ width: '520px' }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="changePasswordCanvasLabel">
          Change User Password
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <form className="row g-3 mt-3" onSubmit={(e)=>changePassword(e)}>
          <div className="col-md-12">
            <label htmlFor="inputOldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputOldPassword"
              value={passwordRequest.old_password}
              onChange={(e) =>
                setPasswordRequest({
                  ...passwordRequest,
                  old_password: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputNewPassword" className="form-label">
              New Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputNewPassword"
              value={passwordRequest.new_password}
              onChange={(e) =>
                setPasswordRequest({
                  ...passwordRequest,
                  new_password: e.target.value,
                })
              }
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputConfirmPassword" className="form-label">
              Confirm Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputConfirmPassword"
              value={passwordRequest.confirm_password}
              onChange={(e) =>
                setPasswordRequest({
                  ...passwordRequest,
                  confirm_password: e.target.value,
                })
              }
            />
          </div>
          <div>
            <p className="text-danger">
              {passwordRequest.new_password !== passwordRequest.confirm_password
                ? 'Passwords do not match'
                : ''}
            </p>
          </div>
          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
