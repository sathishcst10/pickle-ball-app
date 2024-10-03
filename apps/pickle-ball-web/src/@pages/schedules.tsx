import { useEffect, useState } from 'react';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateScore } from '../@components/widgets/updateScore';
import { PlayerSummary } from '../@components/widgets/playerSummary';
import { TeamDetails } from '../@components/widgets/teamDetails';
import { MatchDetails } from '../@components/widgets/matchDetails';
import Swal from 'sweetalert2';

import * as bootstrap from 'bootstrap';
import { DeleteIcon, EditIcon, PlayersListsIcon, PlayerSummaryIcon, UpdateScoreIcon } from '../@components/_icons/menu_icons';

export function Schedule() {
  const [groupLists, setGroupLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGroup, setSelectedGroup] = useState(0);

  const [isPlayerSummary, setIsPlayerSummary] = useState(false);
  const [isUpdateScore, setIsUpdateScore] = useState(false);
  const [isMatchDetails, setIsMatchDetails] = useState(false);
  const [playerSummary, setPlayerSummary] = useState({
    accept: 0,
    reject: 0,
    cancelled: 0,
    notRespond: 0,
    total: 0,
  });

  const userGroupsByUserId = () => {
    fetch(
      'https://acepicklapi.raganindustries.com/api_select_user_groups.php',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: JSON.stringify({}),
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          console.log(response);
          const res_: any =
            response !== undefined
              ? Object.keys(response).map((key: any) => response[key])
              : [];
          setGroupLists(res_);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const playerSummaryData = (args: any) => {
    setIsPlayerSummary(true);
    fetch('https://acepicklapi.raganindustries.com/api_player_summary.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({
        schedule_id: args,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else if (response) {
          setPlayerSummary(response);
          const playerModal = new bootstrap.Modal(
            document.getElementById('playerSummaryModal') as HTMLElement
          );
          playerModal.show();
        } else {
          Swal.fire({
            title: 'Error',
            text: response,
            icon: 'error',
          });
          // const playerModal = new bootstrap.Modal(document.getElementById('playerSummaryModal') as HTMLElement);
          // playerModal.show();
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const updateStatus = (args: any) => {
    fetch('https://acepicklapi.raganindustries.com/api_update_status.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({
        schedule_id: args.id,
        accept_status: args.status,
        play_status: 0,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          Swal.fire({
            title: 'Success',
            text: 'User status updated ' + response,
            icon: 'success',
          });
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const changeGroup = (e: any) => {
    setSelectedGroup(Number(e.target.value));
    location.state = { group_id: e.target.value };
  };
  const getScheduleList = () => {
    fetch('https://acepicklapi.raganindustries.com/api_get_user_schedule.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({
        group_id: selectedGroup,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          console.log(response);
          const res_: any =
            response !== undefined
              ? Object.keys(response).map((key: any) => response[key])
              : [];
          setScheduleList(res_);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const showUpdateScore = (args: any) => {
    setIsUpdateScore(true);
    location.state = { schedule_id: args };
    // const updateScoreModal = new bootstrap.Modal(document.getElementById('updateScoreModal') as HTMLElement);
    // updateScoreModal.show();
  };

  const showMatchDetails = (args: any) => {
    setIsMatchDetails(true);
    location.state = { schedule_id: args };
    // const matchDetailsModal = new bootstrap.Modal(document.getElementById('matchDetailsModal') as HTMLElement);
    // matchDetailsModal.show();
  };
  useEffect(() => {
    setSelectedGroup(location.state !== null ? location.state.group_id : 0);
    userGroupsByUserId();
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById(
      'updateScoreModal'
    ) as HTMLElement;

    if (modalElement) {
      const myModalEl = new bootstrap.Modal(modalElement);

      modalElement.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isUpdateScore) {
          setIsUpdateScore(false);
        }
      });

      // Example to show the modal
      //myModalEl.show();
    }
    if (isUpdateScore) {
      const updateScoreModal = new bootstrap.Modal(
        document.getElementById('updateScoreModal') as HTMLElement
      );
      updateScoreModal.show();
    }

    if (isMatchDetails) {
      const matchDetailsModal = new bootstrap.Modal(
        document.getElementById('matchDetailsModal') as HTMLElement
      );
      matchDetailsModal.show();
    }
  }, [isUpdateScore, isMatchDetails]);

  useEffect(() => {
    getScheduleList();
  }, []);
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-3">
            <div className="d-flex justify-content-between">
              <h4 className="text-start">Schedule</h4>
              <div
                className="d-flex align-content-center"
                style={{ whiteSpace: 'nowrap' }}
              >
                <select
                  className="form-select me-2"
                  value={selectedGroup}
                  onChange={(e) => changeGroup(e)}
                >
                  <option value={0}>--Select group--</option>
                  {groupLists.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.group_id}>
                        {item.group_name}
                      </option>
                    );
                  })}
                </select>
                <button
                  className={`btn btn-dark ${
                    selectedGroup === 0 ? 'disabled' : ''
                  }`}
                  data-bs-toggle="modal"
                  data-bs-target="#scheduleModal"
                >
                  Create Schedule
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Group name</th>
                  <th>Court name</th>
                  <th>Schedule name</th>
                  <th scope="col">Scheduled Date</th>
                  <th scope="col">Start Date Time</th>
                  <th scope="col">End Date Time</th>
                  <th scope="col">User Status</th>
                  <th scope="col">Match Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((data: any, index) => {
                  return (
                    <tr key={index}>
                      <td>{data.schedule_group_name || 'NA'}</td>

                      <td>{data.court_name}</td>
                      <td>{data.schedule_name || 'NA'}</td>
                      <td>{data.schedule_date}</td>
                      <td>{data.schedule_starttime}</td>
                      <td>{data.schedule_endtime}</td>
                      <td>
                        <div className="dropdown">
                          <button
                            className="btn btn-outline-dark dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            User status
                          </button>
                          <ul className="dropdown-menu dropdown-menu-end">
                            <li>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={(e) =>
                                  updateStatus({
                                    id: data.schedule_id,
                                    status: 1,
                                  })
                                }
                              >
                                Accept
                              </button>
                            </li>
                            <li>
                              <button
                                className="dropdown-item"
                                type="button"
                                onClick={(e) =>
                                  updateStatus({
                                    id: data.schedule_id,
                                    status: -1,
                                  })
                                }
                              >
                                Reject
                              </button>
                            </li>

                            <li>
                              <hr className="dropdown-divider" />
                            </li>
                            <li>
                              <button
                                className="dropdown-item text-danger"
                                type="button"
                              >
                                Cancel
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                      <td>
                        <button
                          className="btn btn-outline-dark"
                          onClick={() => showMatchDetails(data.schedule_id)}
                        >
                          Match Details
                        </button>
                      </td>
                      <td className="text-end">
                        <div className="d-flex justify-content-end">
                          <div className="dropdown">
                            <button
                              className="btn btn-outline-dark dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li>
                                <button className="dropdown-item" type="button">
                                  <EditIcon/>
                                  Edit
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={(e) =>
                                    showUpdateScore(data.schedule_id)
                                  }
                                >
                                  <UpdateScoreIcon/>
                                  Update Score
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  onClick={(e) =>
                                    playerSummaryData(data.schedule_id)
                                  }
                                >
                                  <PlayerSummaryIcon/>
                                  Player Summary
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item"
                                  type="button"
                                  data-bs-toggle="modal"
                                  data-bs-target="#teamDetailsModal"
                                >
                                  <PlayersListsIcon/>
                                  Player Lists
                                </button>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <button
                                  className="dropdown-item text-danger"
                                  type="button"
                                >
                                  <DeleteIcon/>
                                  Delete
                                </button>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <ScheduleModal />
      {isUpdateScore && <UpdateScore />}
      {isPlayerSummary && <PlayerSummary _data={playerSummary} />}
      <TeamDetails />
      {isMatchDetails && <MatchDetails />}
    </>
  );
}
