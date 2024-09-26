import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const UpdateScore = () => {
  const [updateScore, setUpdateScore] = useState({
    schedule_id: null,
    user_id: null,
    scores: [
      {
        match: 1,
        playedOn: '2021-09-01T00:00',
        score: 21,
      },
    ],
  });
  const navigate = useNavigate();
  const handleScoreChange = (index : number, field : any, value : any) => {
    setUpdateScore((prevUpdateScore) => {
      const updatedScores : any = [...prevUpdateScore.scores];
      updatedScores[index][field] = value;
      return {
        ...prevUpdateScore,
        scores: updatedScores,
      };
    });
  };

  const addRow = () => {
    setUpdateScore({
      ...updateScore,
      scores: [
        ...updateScore.scores,
        {
          match: 0,
          playedOn: '2021-09-01T00:00',
          score: 0,
        },
      ],
    });
  }

const getScores = () => {
  console.log(updateScore);
}
  

  const updatePlayerScore = () => {
    fetch(
      'https://acepicklapi.raganindustries.com/api_update_player_score.php',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: JSON.stringify({
          player_id: 1,
          score: updateScore,
        }),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('console.log(updateScore);Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
      <div className="modal-dialog modal-dialog-centered modal-lg">
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
                      {JSON.parse(localStorage.getItem('user')!).user_fname +
                        ' ' +
                        JSON.parse(localStorage.getItem('user')!).user_lname}
                    </span>
                  </td>
                </tr>
                {updateScore.scores.map((score, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <input
                          type="text"
                          name={`inputMatch_${index}`}
                          id={`inputMatch_${index}`}
                          className="form-control"
                          placeholder="Enter match number"
                          value={score.match}
                          onChange={(e) => { handleScoreChange(index, 'match', e.target.value) }}
                        />
                      </td>
                      <td>
                        <input
                          type="datetime-local"
                          name={`inputPlayedDate_${index}`}
                          id={`inputPlayedDate_${index}`}
                          className="form-control"
                          value={score.playedOn}
                          onChange={(e) => { handleScoreChange(index, 'playedOn', e.target.value) }}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name={`inputScore_${index}`}
                          id={`inputScore_${index}`}
                          className="form-control"
                          placeholder="Enter score"
                          value={score.score}
                          onChange={(e) => { handleScoreChange(index, 'score', e.target.value) }}
                        />
                      </td>
                      <td>
                        <div className="d-flex">
                          <button
                            className="btn btn-sm btn-dark text-center rounded-3 me-2"
                            title="Add row"
                            onClick={()=>addRow()}
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              color={'currentColor'}
                              fill={'none'}
                            >
                              <path
                                d="M12 8V16M16 12L8 12"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                              <path
                                d="M2.5 12C2.5 7.52166 2.5 5.28249 3.89124 3.89124C5.28249 2.5 7.52166 2.5 12 2.5C16.4783 2.5 18.7175 2.5 20.1088 3.89124C21.5 5.28249 21.5 7.52166 21.5 12C21.5 16.4783 21.5 18.7175 20.1088 20.1088C18.7175 21.5 16.4783 21.5 12 21.5C7.52166 21.5 5.28249 21.5 3.89124 20.1088C2.5 18.7175 2.5 16.4783 2.5 12Z"
                                stroke="currentColor"
                                strokeWidth="1.5"
                              />
                            </svg>
                          </button>
                          <button
                            className="btn btn-sm btn-danger text-center rounded-3 me-2"
                            title="Delete row"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              width={24}
                              height={24}
                              color={'currentColor'}
                              fill={'none'}
                            >
                              <path
                                d="M19.5 5.5L18.8803 15.5251C18.7219 18.0864 18.6428 19.3671 18.0008 20.2879C17.6833 20.7431 17.2747 21.1273 16.8007 21.416C15.8421 22 14.559 22 11.9927 22C9.42312 22 8.1383 22 7.17905 21.4149C6.7048 21.1257 6.296 20.7408 5.97868 20.2848C5.33688 19.3626 5.25945 18.0801 5.10461 15.5152L4.5 5.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M3 5.5H21M16.0557 5.5L15.3731 4.09173C14.9196 3.15626 14.6928 2.68852 14.3017 2.39681C14.215 2.3321 14.1231 2.27454 14.027 2.2247C13.5939 2 13.0741 2 12.0345 2C10.9688 2 10.436 2 9.99568 2.23412C9.8981 2.28601 9.80498 2.3459 9.71729 2.41317C9.32164 2.7167 9.10063 3.20155 8.65861 4.17126L8.05292 5.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M9.5 16.5L9.5 10.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                              <path
                                d="M14.5 16.5L14.5 10.5"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
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
            <button type="button" className="btn btn-primary" onClick={()=>getScores()}>
              Update score
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
