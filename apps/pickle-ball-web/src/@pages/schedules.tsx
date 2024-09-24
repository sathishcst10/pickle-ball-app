import { useEffect, useState } from 'react';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useLocation, useNavigate } from 'react-router-dom';

export function Schedule() {
  const [groupLists, setGroupLists] = useState([]);
  const [scheduleList, setScheduleList] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedGroup, setSelectedGroup] = useState(0);
  const userGroupsByUserId = (id: any = 1) => {
    fetch('https://acepicklapi.raganindustries.com/api_select_user_groups.php', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify({ user_id: id }),
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
    userGroupsByUserId(JSON.parse(localStorage.getItem('user')!).user_id && 1);
    
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
                  onChange={(e)=>setSelectedGroup(Number(e.target.value))}
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
                  Add Schedule
                </button>
              </div>
            </div>
          </div>
          <div className="col-12">
            <table className="table table-bordered">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Schedule name</th>
                  <th scope="col">Scheduled date</th>
                  <th scope="col">Start date time</th>
                  <th scope="col">End date time</th>
                  <th scope="col">Repeat till</th>
                  <th scope='col'>Scheduled format</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {scheduleList.map((data : any, index) => {
                  return (
                    <tr>
                      <td>
                        { data.court_name }
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
                        {data.schedule_repeat_till}
                      </td>
                      <td>
                        {data.schedule_format}
                      </td>
                      <td className="text-end">
                        <div className='d-flex justify-content-end'>
                          <button className='btn btn-success me-2'>Accept</button>
                          <button className='btn btn-danger me-2'>Reject</button>
                          <div className="dropdown">
                            <button className="btn btn-outline-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                              Action
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                              <li><button className="dropdown-item" type="button">Edit</button></li>
                              <li><button className="dropdown-item" type="button">Add/update score</button></li>
                              <li><button className="dropdown-item" type="button">Player summary</button></li>
                              <li><button className="dropdown-item" type="button">Team details</button></li>
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
      <ScheduleModal />
    </>
  );
}
