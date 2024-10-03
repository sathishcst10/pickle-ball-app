import Swal from 'sweetalert2';
import { AddPlayerToGroup } from '../@components/widgets/addPlayerToGroup';
import { CreateGroupModal } from '../@components/widgets/CreateGroupModal';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  AddPlayersIcon,
  ChatIcon,
  ChatIconV2,
  DeleteIcon,
  EditIcon,
  PlayersListsIcon,
  ScheduleIcon,
  ViewIcon,
} from '../@components/_icons/menu_icons';
import { TeamDetailsV2 } from '../@components/widgets/teamDetails';

export const Groups: React.FC = () => {
  const [groupLists, setGroupLists] = useState([]);
  const [groupDetails, setGroupDetails]: any = useState({});
  const navigate = useNavigate();
  const location = useLocation();
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

  useEffect(() => {
    userGroupsByUserId();
  }, []);

  const getGroupDetails = (id: any) => {
    fetch(
      'https://acepicklapi.raganindustries.com/api_select_group_details.php',
      {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: JSON.stringify({ group_id: id }),
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
          setGroupDetails(response['1']);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteGroup = (id: any) => {
    console.log(id);
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Selected group has been deleted.',
          icon: 'success',
        });
      }
    });
  };

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Groups</h4>

              <button
                className="btn btn-primary ml-auto"
                data-bs-toggle="modal"
                data-bs-target="#CreateGroupModal"
              >
                Create Group
              </button>
            </div>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          {groupLists.map((group: any, index: number) => {
            return (
              <div className="col" key={index}>
                <div className="card shadow-sm">
                  <img
                    src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
                    alt="top"
                    className="bd-placeholder-img card-img-top"
                    style={{aspectRatio: '16/9'}}
                    height={195}
                  />
                  <div className="card-body position-relative">
                    <h5 className="card-title">{group.group_name}</h5>
                    <p className="card-text">{group.group_description}</p>

                    <div className='d-flex' style={{ position: 'absolute', top: '5px', right: '5px' }}>
                      <button className='btn btn-light me-2' title='Chat'>
                        <ChatIconV2/>
                      </button>
                      <div
                        className="dropdown"
                        
                      >
                        <button
                          className="btn btn-dark"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"

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
                              d="M11.992 12H12.001"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9842 18H11.9932"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9998 6H12.0088"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              title="View Group"
                              data-bs-toggle="modal"
                              data-bs-target="#viewGroupModal"
                              onClick={(e) => getGroupDetails(group.group_id)}
                            >
                              <ViewIcon /> View Group
                            </button>
                          </li>
                          <li>
                            <button title='Edit Group' className="dropdown-item" type="button">
                              <EditIcon /> Edit Group
                            </button>
                          </li>
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              title="Add Players"
                              data-bs-toggle="modal"
                              data-bs-target="#addPlayerModal"
                              onClick={(e) =>
                                (location.state = { group_id: group.group_id })
                              }
                            >
                              <AddPlayersIcon />
                              Add Players
                            </button>
                          </li>
                          <li>
                            <Link
                              className="dropdown-item"
                              title="Schedule"
                              to={'/ap/schedule'}
                              state={{ group_id: group.group_id }}
                            >
                              <ScheduleIcon />
                              Schedule
                            </Link>
                          </li>
                          <li>
                            <button title="Player's Lists"  className="dropdown-item" data-bs-toggle="modal" data-bs-target="#teamDetailsModalV2">
                              <PlayersListsIcon />
                              Player's List
                            </button>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              type="button"
                              title="Delete group"
                              onClick={(e) => deleteGroup(group.group_id)}
                            >
                              <DeleteIcon />
                              Delete Group
                            </button>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <CreateGroupModal />
      <AddPlayerToGroup />
      <div
        className="modal fade"
        id="viewGroupModal"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex={-1}
        aria-labelledby="viewGroupModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="viewGroupModalLabel">
                Group - {groupDetails.group_name}
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="card mb-3">
                <img
                  src={groupDetails.group_photo_id}
                  className="card-img-top"
                  alt="..."
                  height={360}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      'https://img.freepik.com/free-vector/404-error-with-landscape-concept-illustration_114360-7898.jpg';
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{groupDetails.group_name}</h5>
                  <p className="card-text">{groupDetails.group_description}</p>
                  {/* <p className="card-text"><small className="text-body-secondary">Last updated 3 mins ago</small></p> */}
                </div>
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
            </div>
          </div>
        </div>
      </div>

      <TeamDetailsV2/>
    </>
  );
};
