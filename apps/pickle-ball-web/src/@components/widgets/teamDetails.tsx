export const TeamDetails = () => {
  return (
    <div
      className="modal fade"
      id="teamDetailsModal"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="teamDetailsModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="teamDetailsModalLabel">
              Player's Summary
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="table-response">
              <table className="table table-bordered">
                <thead className="table-dark">
                  <tr>
                    <th>Player Name</th>
                    <th>Email ID</th>
                    <th>Phone Number</th>
                    <th>Response</th>
                    <th>Responded By</th>
                    <th>Responded On</th>
                    <th>Comments</th>
                  </tr>
                </thead>
              </table>
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
            <button type="button" className="btn btn-primary d-none">
              Understood
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
