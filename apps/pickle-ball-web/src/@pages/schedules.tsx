import { useEffect, useState } from 'react';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateScore } from '../@components/widgets/updateScore';
import { PlayerSummary } from '../@components/widgets/playerSummary';
import { TeamDetails } from '../@components/widgets/teamDetails';
import { MatchDetails } from '../@components/widgets/matchDetails';
import Swal from 'sweetalert2';

import * as bootstrap from 'bootstrap';
import { DeleteIcon, EditIcon, PlayersListsIcon, PlayerSummaryIcon, UpdateScoreIcon, ViewIcon } from '../@components/_icons/menu_icons';

export function Schedule() {
  const [groupLists, setGroupLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGroup, setSelectedGroup] = useState(0);

  const [isPlayerSummary, setIsPlayerSummary] = useState(false);
  const [isUpdateScore, setIsUpdateScore] = useState(false);
  const [isMatchDetails, setIsMatchDetails] = useState(false);
  const [isPlayerLists, setIsPlayerLists] = useState(false);
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

  const showPlayerLists = (args: any) => {
    setIsPlayerLists(true);
    location.state = { schedule_id: args };
    // const teamDetailsModal = new bootstrap.Modal(document.getElementById('teamDetailsModal') as HTMLElement);
    // teamDetailsModal.show();
  }
  const filterSchedules = (e: any) => {
    
    console.log(e.target[e.target.selectedIndex].getAttribute("data-item"));
    if(e.target.value === "0"){
      getScheduleList();
    }else{
      //  getScheduleList();
      setScheduleList(
        scheduleList.filter((item: any) => item.schedule_group_name === e.target[e.target.selectedIndex].getAttribute("data-item"))
      );
    }
  }
  const getScheduleStatus = async (args: any) => {
    const response = await fetch(`https://acepicklapi.raganindustries.com/api_get_schedule_status.php`,{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token
      },
      body: JSON.stringify({
        schedule_id: args
      })
    });
    const data = await response.json();

    if(data === 'ACCESS TOKEN ERROR'){
      console.log('Unauthorized');
      localStorage.clear();
      navigate('/login');
    }else if(['Accepted', 'Rejected', 'Not Responded'].includes(data)){
      return data;
    }else{
      Swal.fire({
        title: 'Error',
        text: data,
        icon: 'error'
      })
    }
    console.log(data);
  }


  useEffect(() => {
    setSelectedGroup(location.state !== null ? location.state.group_id : 0);
    userGroupsByUserId();
  }, []);

  useEffect(() => {
    const modalElement = document.getElementById(
      'updateScoreModal'
    ) as HTMLElement;

    const modalElement_playerLists = document.getElementById(
      'teamDetailsModal'
    ) as HTMLElement;

    const modalElement_playerListsV2 = document.getElementById(
      'teamDetailsModalV2'
    ) as HTMLElement;

    const modalElement_playerSummary = document.getElementById(
      'playerSummaryModal'
    ) as HTMLElement;

    const modalElement_matchDetails = document.getElementById(
      'matchDetailsModal'
    ) as HTMLElement;



    if (modalElement) {
      const myModalEl = new bootstrap.Modal(modalElement);

      modalElement.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isUpdateScore) {
          setIsUpdateScore(false);
        }
      });
    }else if(modalElement_playerLists){
      const myModalEl = new bootstrap.Modal(modalElement_playerLists);

      modalElement_playerLists.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isPlayerLists) {
          setIsPlayerLists(false);
        }
      });
    }else if(modalElement_playerListsV2){
      const myModalEl = new bootstrap.Modal(modalElement_playerListsV2);

      modalElement_playerListsV2.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isPlayerLists) {
          setIsPlayerLists(false);
        }
      });
    }else if(modalElement_playerSummary){
      const myModalEl = new bootstrap.Modal(modalElement_playerSummary);

      modalElement_playerSummary.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isPlayerSummary) {
          setIsPlayerSummary(false);
        }
      });
    }
    else if(modalElement_matchDetails){
      const myModalEl = new bootstrap.Modal(modalElement_matchDetails);

      modalElement_matchDetails.addEventListener('hidden.bs.modal', (event) => {
        // Your logic goes here...
        if (isMatchDetails) {
          setIsMatchDetails(false);
        }
      });
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

    if(isPlayerLists){
      const playerListsModal = new bootstrap.Modal(
        document.getElementById('teamDetailsModal') as HTMLElement
      );
      playerListsModal.show();
    }
  }, [isUpdateScore, isMatchDetails, isPlayerLists]);

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
                  onChange={(e) => {changeGroup(e); filterSchedules(e)}}
                >
                  <option value={0} data-item="0">--Select Group--</option>
                  {groupLists.map((item: any, index: number) => {
                    return (
                      <option key={index} value={item.group_id} data-item={item.group_name}>
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
                        {
                          data.user_status === 'Accepted' ? <span className="badge bg-success">{data.user_status}</span> :
                          data.user_status === 'Rejected' ? <span className="badge bg-danger">{data.user_status}</span> :
                          <div className="dropdown">
                          <button
                            className="btn btn-outline-dark dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                          >
                            User Status                          
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
                        }         
                        
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
                                  <ViewIcon/>
                                    View
                                </button>
                              </li>
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
                                  onClick={(e) =>showPlayerLists(data.schedule_id)}
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
      {isPlayerLists && <TeamDetails/>}
      {isMatchDetails && <MatchDetails />}
    </>
  );
}
