export const UserProfileCanvas = () => {

  const {
    user_email,
    user_fname,
    user_lname,
    user_phone,
    user_dob,
    user_age,
    user_address,    
  } = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="userProfileCanvas"
      data-bs-backdrop="static"
      aria-labelledby="userProfileCanvasLabel"
      style={{ width: '520px' }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="userProfileCanvasLabel">
          User Profile
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
          <div className="col-md-12 text-center">
            <button
              className="btn btn-outline-secondary"
              title="Add Profile Image"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width={48}
                height={48}
                color={'currentColor'}
                fill={'none'}
              >
                <path
                  d="M12.5 22H6.59087C5.04549 22 3.81631 21.248 2.71266 20.1966C0.453365 18.0441 4.1628 16.324 5.57757 15.4816C7.67837 14.2307 10.1368 13.7719 12.5 14.1052C13.3575 14.2261 14.1926 14.4514 15 14.7809"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <path
                  d="M18.5 22L18.5 15M15 18.5H22"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="inputFirstName" value={user_fname || ''}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="inputLastName" value={user_lname || ''}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail" value={user_email || ''}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input type="text" className="form-control" id="inputPhone" value={user_phone || ''}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="selectCountry" className="form-label">
              Country
            </label>
            <select id="selectCountry" className="form-select">
              <option>Choose...</option>
              <option>United States</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRating" className="form-label">
              Player rating
            </label>
            <input type="text" className="form-control" id="inputRating" />
          </div>
          <hr />
          <div className="col-md-6">
            <label htmlFor="inputDOB" className="form-label">
              Date of Birth
            </label>
            <input type="date" className="form-control" id="inputDOB" value={user_dob || ''}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAge" className="form-label">
              Age<small>(Optional)</small>
            </label>
            <input type="number" className="form-control" id="inputAge" value={user_age || ''}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" id="inputAddress" value={user_address || ''}/>
          </div>
          <div className="col-md-12">
            <label htmlFor="inputLocation" className="form-label">
              Map location
            </label>
            <input type="text" className="form-control" id="inputLocation" />
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
