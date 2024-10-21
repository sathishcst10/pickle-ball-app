export const CreateShootout = (props: any) => {
  return (
    <div
      className="modal fade"
      id="createShootoutModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="createShootoutModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="createShootoutModalLabel">
              Create Shootout
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form action="">
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="shootoutDate" className="form-label">
                  Shootout Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="shootoutName"
                  placeholder="Enter Shootout Date"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shootoutStartTime" className="form-label">
                  Start Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="shootoutStartTime"
                  placeholder="Enter Start Time"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="shootoutEndTime" className="form-label">
                  End Time
                </label>
                <input
                  type="time"
                  className="form-control"
                  id="shootoutEndTime"
                  placeholder="Enter End Time"
                />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="submit" className="btn btn-primary d-none">
                Create Shootout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
