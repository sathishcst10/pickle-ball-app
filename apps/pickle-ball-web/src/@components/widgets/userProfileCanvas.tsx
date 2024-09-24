export const UserProfileCanvas = () => {
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
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="profile-tab"
              data-bs-toggle="tab"
              data-bs-target="#profile-tab-pane"
              type="button"
              role="tab"
              aria-controls="profile-tab-pane"
              aria-selected="false"
            >
              Profile
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="changePassword-tab"
              data-bs-toggle="tab"
              data-bs-target="#changePassword-tab-pane"
              type="button"
              role="tab"
              aria-controls="home-tab-pane"
              aria-selected="true"
            >
              Change Password
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane fade show active"
            id="changePassword-tab-pane"
            role="tabpanel"
            aria-labelledby="changePassword-tab"
            tabIndex={0}
          >

            <form className="row g-3 mt-3">
                <div className="col-md-12">
                    <label htmlFor="inputOldPassword" className="form-label">Old Password</label>
                    <input type="password" className="form-control form-control-lg" id="inputOldPassword"/>
                </div>    
                <div className="col-md-12">
                    <label htmlFor="inputNewPassword" className="form-label">New Password</label>
                    <input type="password" className="form-control form-control-lg" id="inputNewPassword"/>
                </div>    
                <div className="col-md-12">
                    <label htmlFor="inputConfirmPassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control form-control-lg" id="inputConfirmPassword"/>
                </div>
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Change Password</button>
                </div>
            </form>
            
          </div>
          <div
            className="tab-pane fade"
            id="profile-tab-pane"
            role="tabpanel"
            aria-labelledby="profile-tab"
            tabIndex={0}
          >
            
            <form className="row g-3 mt-3">
                <div className="col-md-6">
                    <label htmlFor="inputFirstName" className="form-label">First Name</label>
                    <input type="text" className="form-control" id="inputFirstName"/>
                </div>    
                <div className="col-md-6">
                    <label htmlFor="inputLastName" className="form-label">Last Name</label>
                    <input type="text" className="form-control" id="inputLastName"/>
                </div>    
                <div className="col-md-12">
                    <label htmlFor="inputEmail" className="form-label">Email</label>
                    <input type="email" className="form-control" id="inputEmail"/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputPhone" className="form-label">Phone</label>
                    <input type="text" className="form-control" id="inputPhone"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="selectCountry" className="form-label">Country</label>
                    <select id="selectCountry" className="form-select">
                        <option>Choose...</option>
                        <option>United States</option>
                    </select>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputRating" className="form-label">Player rating</label>
                    <input type="text" className="form-control" id="inputRating"/>
                </div>
                <hr />
                <div className="col-md-6">
                    <label htmlFor="inputDOB" className="form-label">Date of Birth</label>    
                    <input type="date" className="form-control" id="inputDOB"/>
                </div>
                <div className="col-md-6">
                    <label htmlFor="inputAge" className="form-label">Age<small>(Optional)</small></label>    
                    <input type="number" className="form-control" id="inputAge"/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputAddress" className="form-label">Address</label>
                    <input type="text" className="form-control" id="inputAddress"/>
                </div>
                <div className="col-md-12">
                    <label htmlFor="inputLocation" className="form-label">Map location</label>
                    <input type="text" className="form-control" id="inputLocation"/>
                </div>

                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Update profile</button>
                </div>
            </form>
            
          </div>
        </div>
      </div>
    </div>
  );
};
