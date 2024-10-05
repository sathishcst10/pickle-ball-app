export const ChangePasswordCanvas = () => {
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
        <form className="row g-3 mt-3">
          <div className="col-md-12">
            <label htmlFor="inputOldPassword" className="form-label">
              Old Password
            </label>
            <input
              type="password"
              className="form-control form-control-lg"
              id="inputOldPassword"
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
            />
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
