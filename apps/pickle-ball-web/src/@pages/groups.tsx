import Swal from 'sweetalert2';
import { AddPlayerToGroup } from '../@components/widgets/addPlayerToGroup';
import { CreateGroupModal } from '../@components/widgets/CreateGroupModal';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import * as bootstrap from 'bootstrap';

import {
  AddPlayersIcon,
  AdminIcon,
  ChatIcon,
  ChatIconV2,
  DeleteIcon,
  EditIcon,
  ImageIcon,
  MoreIcon,
  PlayersListsIcon,
  ProfileIcon,
  ScheduleIcon,
  ViewIcon,
} from '../@components/_icons/menu_icons';
import { TeamDetailsV2 } from '../@components/widgets/teamDetails';
import { AddAdminToGroup } from '../@components/widgets/AddAdminToGroup';

export const Groups: React.FC = () => {
  const [groupLists, setGroupLists] = useState([]);
  const [groupDetails, setGroupDetails]: any = useState({});
  const [isPlayerLists, setIsPlayerLists] = useState(false);
  const [isAddGroup, setIsAddGroup] = useState(false);
  const [fnType, setFnType] = useState('Create');
  const [selectedGroup, setSelectedGroup] = useState<any>(null);
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

  const ShowPlayerLists = (args: any) => {
    setIsPlayerLists(true);
    location.state = { group_id: args };
  };

  useEffect(() => {
    userGroupsByUserId();
  }, []);

  useEffect(() => {
    const modalElement_playerListsV2 = document.getElementById(
      'teamDetailsModalV2'
    ) as HTMLElement;
    if (modalElement_playerListsV2) {
      modalElement_playerListsV2.addEventListener(
        'hidden.bs.modal',
        function (event) {
          setIsPlayerLists(false);
        }
      );
    }
    if (isPlayerLists) {
      if (isPlayerLists) {
        const playerListsModal = new bootstrap.Modal(
          document.getElementById('teamDetailsModalV2') as HTMLElement
        );
        playerListsModal.show();
      }
    }
  }, [isPlayerLists]);

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
  const changeFnType = (type: string, groupId: any) => {
    if (type === 'Edit') {
      location.state = { group_id: groupId };
    }
    setFnType(type);
    setIsAddGroup(true);
  };

  const showFileUpdload = (args: any) => {
    setSelectedGroup(args);
    const groupPhotoModal = new bootstrap.Modal(
      document.getElementById('groupPhotoModal') as HTMLElement
    );
    groupPhotoModal.show();
  }

  const uploadGroupImage = () => {
    const groupImage = document.getElementById('groupImage') as HTMLInputElement;
    const formData = new FormData();
    //formData.append('group_id', groupDetails.group_id);
    //formData.append('image_code', '1');
    formData.append('file', groupImage.files[0]);
    fetch(
      `https://acepicklapi.raganindustries.com/api_file_upload.php?image_parameter=${selectedGroup}&image_code=1`,
      {
        method: 'post',
        headers: {
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else if(response === 'STATUS OK'){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Group image uploaded successfully',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          console.log(response);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response,
          })
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    const modalElement = document.getElementById(
      'CreateGroupModal'
    ) as HTMLElement;
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', function (event) {
        setIsAddGroup(false);
      });
    }

    if (isAddGroup) {
      const createGroupModal = new bootstrap.Modal(
        document.getElementById('CreateGroupModal') as HTMLElement
      );
      createGroupModal.show();
    }
  }, [isAddGroup]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 mt-3">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h4>Groups</h4>

              <button
                className="btn btn-primary ml-auto"
                onClick={() => changeFnType('Create', null)}
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
                  <div className="position-relative">
                    <img
                      src={
                        'https://acepicklapi.raganindustries.com' +
                        group.group_photo_id
                      }
                      alt="top"
                      className="bd-placeholder-img card-img-top"
                      style={{ aspectRatio: '16/9' }}
                      height={195}
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src =
                          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                      }}
                    />
                    <button
                      className="btn btn-sm btn-secondary"
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                      }}
                      onClick={() => showFileUpdload(group.group_id)}                      
                      title='Change Group Image'
                    >
                      <ImageIcon />
                    </button>
                  </div>
                  <div className="card-body position-relative">
                    <h5 className="card-title">{group.group_name}</h5>
                    <p className="card-text">{group.group_description}</p>

                    <div
                      className="d-flex"
                      style={{ position: 'absolute', top: '5px', right: '5px' }}
                    >
                      <button className="btn btn-light me-2" title="Chat">
                        <ChatIconV2 />
                      </button>
                      <div className="dropdown">
                        <button
                          className="btn btn-dark"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <MoreIcon />
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
                            <button
                              title="Edit Group"
                              className="dropdown-item"
                              type="button"
                              onClick={() =>
                                changeFnType('Edit', group.group_id)
                              }
                            >
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
                            <button
                              title="View Images"
                              className="dropdown-item"
                              data-bs-toggle="modal"
                              data-bs-target="#addAdminModal"
                              onClick={(e) =>
                                (location.state = { group_id: group.group_id })
                              }
                            >
                              <AdminIcon />
                              Add Admin
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
                            <button
                              title="Player's Lists"
                              className="dropdown-item"
                              onClick={() => ShowPlayerLists(group.group_id)}
                            >
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
      {isAddGroup && <CreateGroupModal type={fnType} />}
      <AddPlayerToGroup />
      <AddAdminToGroup />
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
                  src={
                    'https://acepicklapi.raganindustries.com' +
                    groupDetails.group_photo_id
                  }
                  className="card-img-top"
                  alt="..."
                  height={360}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src =
                      'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
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

      {isPlayerLists && <TeamDetailsV2 />}

      <div
        className="modal fade"
        id="groupPhotoModal"
        tabIndex={-1}
        aria-labelledby="groupPhotoModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="groupPhotoModalLabel">
                Group Image Upload
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="groupImage" className="col-form-label">
                    Select image
                  </label>
                  <input type="file" className="form-control" id="groupImage" />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadGroupImage}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
