export const MatchDetails = () => {
    return (
      <div
        className="modal fade"
        id="matchDetailsModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="matchDetailsModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="matchDetailsModalLabel">
                Match Details
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
                      <th>Court name</th>
                      <th>Match</th>
                      <th>Team 1</th>
                      <th>Team 2</th>
                      <th>Scheduled By</th>                      
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
  