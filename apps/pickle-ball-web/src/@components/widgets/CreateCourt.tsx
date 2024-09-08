import AceCourts from "../../@pages/courts";

export function CreateCourt() {
  return (
    <div
      className="modal fade"
      id="createCourtModal"
      tabIndex={-1}
      aria-labelledby="createCourtModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="createCourtModalLabel">
              Modal title
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <AceCourts/>
          </div>
          
        </div>
      </div>
    </div>
  );
}
