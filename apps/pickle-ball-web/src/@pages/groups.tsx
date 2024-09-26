import Swal from 'sweetalert2';
import { AddPlayerToGroup } from '../@components/widgets/addPlayerToGroup';
import { CreateGroupModal } from '../@components/widgets/CreateGroupModal';
import { ScheduleModal } from '../@components/widgets/scheduleModal';
import { useEffect, useState } from 'react';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import { Link, useNavigate } from 'react-router-dom';

export const Groups: React.FC = () => {
  const [groupLists, setGroupLists] = useState([]);
  const [groupDetails, setGroupDetails]: any = useState({});
  const navigate = useNavigate();
  const userGroupsByUserId = (id: any = 1) => {
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
        body: JSON.stringify({ user_id: id }),
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
    userGroupsByUserId(JSON.parse(localStorage.getItem('user')!).user_id && 1);
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
                  <svg
                    className="bd-placeholder-img card-img-top"
                    width="100%"
                    height="225"
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    aria-label="Placeholder: Thumbnail"
                    preserveAspectRatio="xMidYMid slice"
                    focusable="false"
                  >
                    <title>Placeholder</title>
                    <rect width="100%" height="100%" fill="#55595c"></rect>
                    <text x="50%" y="50%" fill="#eceeef" dy=".3em">
                      Thumbnail
                    </text>
                  </svg>
                  <div className="card-body">
                    <h5 className="card-title">{group.group_name}</h5>
                    <p className="card-text">{group.group_description}</p>
                    <div className="d-flex justify-content-between align-items-center">
                      <div className="btn-group">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          title="Edit/View Group"
                          data-bs-toggle="modal"
                          data-bs-target="#viewGroupModal"
                          onClick={(e) => getGroupDetails(group.group_id)}
                        >
                          View
                        </button>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          title="Add/View players"
                          data-bs-toggle="modal"
                          data-bs-target="#addPlayerModal"
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
                              d="M20.7739 18C21.5232 18 22.1192 17.5285 22.6543 16.8691C23.7498 15.5194 21.9512 14.4408 21.2652 13.9126C20.5679 13.3756 19.7893 13.0714 18.9999 13M17.9999 11C19.3806 11 20.4999 9.88071 20.4999 8.5C20.4999 7.11929 19.3806 6 17.9999 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M3.2259 18C2.47659 18 1.88061 17.5285 1.34548 16.8691C0.250028 15.5194 2.04861 14.4408 2.73458 13.9126C3.43191 13.3756 4.21052 13.0714 4.99994 13M5.49994 11C4.11923 11 2.99994 9.88071 2.99994 8.5C2.99994 7.11929 4.11923 6 5.49994 6"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                            />
                            <path
                              d="M8.08368 15.1112C7.0619 15.743 4.38286 17.0331 6.01458 18.6474C6.81166 19.436 7.6994 20 8.8155 20H15.1843C16.3004 20 17.1881 19.436 17.9852 18.6474C19.6169 17.0331 16.9379 15.743 15.9161 15.1112C13.52 13.6296 10.4797 13.6296 8.08368 15.1112Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M15.4999 7.5C15.4999 9.433 13.9329 11 11.9999 11C10.0669 11 8.49988 9.433 8.49988 7.5C8.49988 5.567 10.0669 4 11.9999 4C13.9329 4 15.4999 5.567 15.4999 7.5Z"
                              stroke="currentColor"
                              strokeWidth="1.5"
                            />
                          </svg>
                        </button>

                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          title="Edit group"
                        >
                          Edit
                        </button>

                        <Link
                          role="button"
                          className="btn btn-sm btn-outline-dark"
                          title="Schedule"
                          to={'/ap/schedule'}
                          state={{ group_id: group.group_id }}
                        >
                          Schedule
                        </Link>
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-dark"
                          title="Delete group"
                          onClick={(e) => deleteGroup(group.group_id)}
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
                      <small className="text-body-secondary d-none">
                        9 mins
                      </small>
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
    </>
  );
};
