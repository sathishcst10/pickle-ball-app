import { useState } from "react";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";

export const CreateShootout = (props: any) => {
    const location = useLocation();

    const [request, setRequest] = useState({
        schedule_id: location.state.schedule_id,
        start_time: '',
        end_time: ''
    })

    const createShootout = (e: any) => {
        e.preventDefault();
        console.log('Creating Shootout');
        fetch(`https://acepicklapi.raganindustries.com/api_create_shoot_out.php`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token
            },
            body: JSON.stringify(request)
        }).then((res) => res.json()).then((response) => {
            if (response === 'ACCESS TOKEN ERROR') {
                console.log('Unauthorized');
                localStorage.clear();
                //navigate('/login');
            } else if(response === 'STATUS OK') {
                console.log(response);
                Swal.fire({
                    icon: 'success',
                    title: 'Shootout created successfully',
                    showConfirmButton: true,
                    timer: 2000
                }).then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload();
                    }
                })
            }
        }).catch((error) => {
            console.error(error);
        });

    }

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
          <form action="" onSubmit={(e)=>createShootout(e)}>
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
                  type="datetime-local"
                  className="form-control"
                  id="shootoutStartTime"
                  placeholder="Enter Start Time"
                  value={request.start_time}
                  onChange={(e) => setRequest({...request, start_time: e.target.value})}

                />
              </div>
              <div className="mb-3">
                <label htmlFor="shootoutEndTime" className="form-label">
                  End Time
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="shootoutEndTime"
                  placeholder="Enter End Time"
                  value={request.end_time}
                  onChange={(e) => setRequest({...request, end_time: e.target.value})}
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
              <button type="submit" className="btn btn-primary">
                Create Shootout
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
