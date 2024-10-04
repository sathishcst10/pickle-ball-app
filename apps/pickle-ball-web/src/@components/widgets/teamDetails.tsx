import { useLocation } from "react-router-dom";
import { Schedule } from "../../@pages/schedules";
import { useEffect, useState } from "react";

export const TeamDetails = () => {
  const location = useLocation();  
const [playerLists, setPlayerLists] = useState([]);

const getPlayerLists = ()=>{
  fetch(`https://acepicklapi.raganindustries.com/api_player_lists.php`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token
    },
    body : JSON.stringify(
      {
        schedule_id : location.state.schedule_id
      }
    )
  }).then((res) => res.json())
  .then((response) => {
    if (response === 'ACCESS TOKEN ERROR') {
      console.log('Unauthorized');
      localStorage.clear();
      //navigate('/login');
    }else{
      setPlayerLists(response);
    }

    console.log(response);
  })
  .catch((error) => {
    console.error('Error:', error);
  });

}

useEffect(() => {
  getPlayerLists();
},[]);
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
              Player Lists
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
                <tbody>
                  {playerLists.map((player: any, index: number) => {
                    return (
                      <tr key={index}>
                        <td>{player.user_name}</td>
                        <td>{player.user_email}</td>
                        <td>{player.user_phone}</td>
                        <td>{player.user_response}</td>
                        <td>{player.user_respond_by}</td>
                        <td>{player.user_respond_on}</td>
                        <td>{player.comments}</td>
                      </tr>
                    );
                  })}
                </tbody>
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

export const TeamDetailsV2 = () => {


  return (
    <div
      className="modal fade"
      id="teamDetailsModalV2"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
      tabIndex={-1}
      aria-labelledby="teamDetailsModalV2Label"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="teamDetailsModalV2Label">
              Player Lists
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
                    <th>Rank</th>                    
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
