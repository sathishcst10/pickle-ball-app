import { useEffect, useState } from 'react';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { UpdateScore } from '../@components/widgets/updateScore';
import { PlayerSummary } from '../@components/widgets/playerSummary';
import { TeamDetails } from '../@components/widgets/teamDetails';
import { MatchDetails } from '../@components/widgets/matchDetails';

export function Schedule() {
  const [groupLists, setGroupLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGroup, setSelectedGroup] = useState(0);
  const userGroupsByUserId = () => {
    fetch('https://acepicklapi.raganindustries.com/api_select_user_groups.php', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({}),
  }).then(res=>res.json())
  .then(
    (response) => {
      if(response === 'ACCESS TOKEN ERROR'){
        console.log('Unauthorized');
        localStorage.clear();
        navigate('/login');
      }else{
        console.log(response);
        const res_ : any = response !== undefined ? (Object.keys(response).map((key : any)=>response[key])) : [];
        setGroupLists(
          res_
        );
      }
    }
  ).catch((error) => {
    console.log(error);
  });
  }
  const changeGroup = (e: any) => {
    setSelectedGroup(e.target.value);
    location.state = {group_id:e.target.value}
  }
  const getScheduleList = () => {
    fetch('https://acepicklapi.raganindustries.com/api_show_schedule_details.php',{
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({
        group_id: selectedGroup
      })
    }).then((res)=>res.json())
    .then((response)=>{
      if(response === 'ACCESS TOKEN ERROR'){
        console.log('Unauthorized');
        localStorage.clear();
        navigate('/login');
      }else{
        console.log(response);
        const res_ : any = response !== undefined ? (Object.keys(response).map((key : any)=>response[key])) : [];
        setScheduleList(
          res_
        );
      }
    })
    .catch((error)=>{
      console.log(error)
    });
  }

  useEffect(() => {

    setSelectedGroup(location.state !== null ? location.state.group_id : 0);
    userGroupsByUserId();
    
  }, []);

  useEffect(() => {
    getScheduleList();
  },[selectedGroup])
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-3">
            <div className="d-flex justify-content-between">
              <h4 className="text-start">Schedule</h4>
              <div className='d-flex align-content-center' style={{whiteSpace:"nowrap"}}>
                <select className='form-select me-2' value={selectedGroup} 
                  onChange={(e)=>changeGroup(e)}
                >
                  <option>--Select group--</option>
                  {
                    groupLists.map((item: any) => {
                      return (
                        <option value={item.group_id}>{item.group_name }</option>
                      )
                    })
                  }
                </select>
                <button
                  className="btn btn-dark"
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
                  <th scope='col'>User Status</th>
                  <th scope='col'>Match Details</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((data : any, index) => {
                  return (
                    <tr>
                      <td>
                        {data.schedule_group_name || 'NA'}
                      </td>

                      <td>
                        { data.court_name }
                      </td>
                      <td>
                        {data.schedule_name || 'NA'}
                      </td>
                      <td>
                        {data.schedule_date}
                      </td>
                      <td>
                        {data.schedule_starttime}
                      </td>
                      <td>
                        {data.schedule_endtime}
                      </td>                                      
                      <td>
                      <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              User status
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><button className="dropdown-item" type="button">Accept</button></li>
                              <li><button className="dropdown-item" type="button">Reject</button></li>                              

                              <li><hr className="dropdown-divider"/></li>
                              <li><button className="dropdown-item text-danger" type="button">Cancel</button></li>
                            </ul>
                          </div>
                      </td>
                      <td>
                        <button className="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#matchDetailsModal">Match Details</button>
                      </td>
                      <td className="text-end">
                        <div className='d-flex justify-content-end'>                          
                          <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><button className="dropdown-item" type="button">Edit</button></li>
                              <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#updateScoreModal">Update Score</button></li>
                              <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#playerSummaryModal">Player Summary</button></li>
                              <li><button className="dropdown-item" type="button" data-bs-toggle="modal" data-bs-target="#teamDetailsModal">Team Details</button></li>
                              <li><hr className="dropdown-divider"/></li>
                              <li><button className="dropdown-item text-danger" type="button">Delete</button></li>
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
      <ScheduleModal/>
      <UpdateScore/>
      <PlayerSummary/>
      <TeamDetails/>
      <MatchDetails/>
    </>
  );
}
