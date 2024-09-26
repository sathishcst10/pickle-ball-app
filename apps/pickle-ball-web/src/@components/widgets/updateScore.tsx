import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const UpdateScore = () => {
    const [updateScore, setUpdateScore] = useState([]);
    const navigate = useNavigate();
    
    // const addRow = () => {
    //     setUpdateScore([...updateScore, {match: '', score: ''}]);
    // }

    const updatePlayerScore = () => {
        fetch('https://acepicklapi.raganindustries.com/api_update_player_score.php', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
            },
            body: JSON.stringify({
                player_id: 1,
                score: updateScore
            })
        }).then(res=>res.json())
        .then(
            (response) => {
                if(response === 'ACCESS TOKEN ERROR'){
                    console.log('console.log(updateScore);Unauthorized');
                    localStorage.clear();
                    navigate('/login');
                }else{
                    console.log(response);
                }
            }
        ).catch((error) => {
            console.log(error);
        });  
    }

  return (
    <div
      className="modal fade"
      id="updateScoreModal"
      tabIndex={-1}
      aria-labelledby="updateScoreModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="updateScoreModalLabel">
              Update player score
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <table className="table table-bordered">
                <tbody>
                    <tr>
                        <td>Player name</td>
                        <td colSpan={2}>
                            <span className="fw-bold">
                                {
                                    JSON.parse(localStorage.getItem('user')!).user_fname + ' ' + JSON.parse(localStorage.getItem('user')!).user_lname
                                }
                            </span>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="inputMatch" id="inputMatch" className="form-control" placeholder="Enter match number"/>
                        </td>
                        <td>
                            <input type="number" name="inputScore" id="inputScore" className="form-control" placeholder="Enter score"/>
                        </td>
                        <td className="vertical-middle">
                            <button className="btn btn-sm btn-dark">
                                Add
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Update score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
