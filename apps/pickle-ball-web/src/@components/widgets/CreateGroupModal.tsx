import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Link, useNavigate } from 'react-router-dom';
import { CreateCourt } from './CreateCourt';
import { CreateCourtV2 } from './CreateCourtOffCanvas';
import { create } from 'domain';
import Swal from 'sweetalert2';

interface CreateGroup {
  group_name: string;
  group_description: string;
  group_allowpublic: number;
  group_court_id: number;
  group_access_name: string;
  group_access_visibility: number;
  group_access_skill_level: number;
  group_access_rating: number;
  group_access_invite_others: number;
  group_access_message_all: number;
}

export const CreateGroupModal: React.FC = () => {
  const stepperRef: any = useRef(null);
  const courts = [
    { name: 'Ace Pickl Court-1', code: '1' },
    { name: 'Ace Pickl Court-2', code: '2' },
    { name: 'Ace Pickl Court-3', code: '3' },
    { name: 'Ace Pickl Court-4', code: '4' },
    { name: 'Ace Pickl Court-5', code: '5' },
  ];

  const [createGroupRequest, setCreateGroupRequest] = useState({
    group_name: '',
    group_description: '',
    group_allowpublic: 0,
    group_court_id: -1,
    group_access_name: '',
    group_access_visibility: 0,
    group_access_skill_level: 0,
    group_access_rating: 0,
    group_access_invite_others: 0,
    group_access_message_all: 0,
  });
  const [courtLists, setCourtLists] = useState([]);
  const navigate = useNavigate();

  const getCourtLists = () => {
    fetch('https://acepicklapi.raganindustries.com/api_select_all_courts.php', {
      method: 'get',
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log('Unauthorized');
        }
        return res.json();
      })
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          const lists: any =
            response !== undefined
              ? Object.keys(response).map((key) => response[key])
              : [];
          setCourtLists(lists);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const saveGroup = () => {
    fetch('https://acepicklapi.raganindustries.com/api_create_group.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body: JSON.stringify(createGroupRequest),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data === 'STATUS OK') {
            console.log('Group created successfully');
            Swal.fire({
              title: 'Group created successfully',
              icon: 'success',
              confirmButtonText: 'Ok',
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            })
          
        } else {
          alert(data.status + ' : ' + data.description);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const stepOneValidation = () => {
    if (
      createGroupRequest.group_name !== '' &&
      createGroupRequest.group_description !== ''
    ) {
      return true;
    }
    return false;
  };

  const stepTwoValidation = () => {
    if (createGroupRequest.group_court_id !== -1) {
      return true;
    }
    return false;
  }

  useEffect(() => {
    getCourtLists();
  }, []);

  return (
    <div
      className="modal fade"
      id="CreateGroupModal"
      tabIndex={-1}
      aria-labelledby="CreateGroupModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="CreateGroupModalLabel">
              Create Group
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <Stepper ref={stepperRef}>
              <StepperPanel header="1">
                <div className="flex flex-column h-12rem">
                  <div className="">
                    <div className="mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="form-label"
                      >
                        Group name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Enter group name"
                        value={createGroupRequest?.group_name}
                        onChange={(e) =>
                          setCreateGroupRequest({
                            ...createGroupRequest,
                            group_name: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="formGroupExampleInput2"
                        className="form-label"
                      >
                        Group description
                      </label>
                      <textarea
                        className="form-control"
                        id="formGroupExampleInput2"
                        placeholder="Enter group description"
                        value={createGroupRequest?.group_description}
                        onChange={(e) =>
                          setCreateGroupRequest({
                            ...createGroupRequest,
                            group_description: e.target.value,
                          })
                        }
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="form-label"
                      >
                        How many members does your club have? (Optional)
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Count of members"
                      />
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor="switchPlayerUpload"
                        >
                          Do you want to upload club members and send invite?
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchPlayerUpload"
                        />
                      </div>
                    </div>
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Select excel file
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="formGroupExampleInput"
                        className="form-label"
                      >
                        Playing hours
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="formGroupExampleInput"
                        placeholder="Enter playing hours"
                      />
                    </div>

                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor="switchPermission"
                        >
                          I would like to display my details as the group admin.
                        </label>
                        <input
                          className="form-check-input"
                          type="checkbox"
                          role="switch"
                          id="switchPermission"
                          value={createGroupRequest?.group_allowpublic}
                          checked={
                            createGroupRequest.group_allowpublic === 1
                              ? true
                              : false
                          }
                          onChange={(e) =>
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_allowpublic: e.target.checked ? 1 : 0,
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-end">
                  <button
                    className={`btn btn-primary ${stepOneValidation() ? '' : 'disabled'}`}
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="Header II">
                <div className="flex flex-column h-12rem">
                  <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    <div className="mb-3">
                      <label className="form-label">Choose you court</label>
                      <select
                        className="form-select"
                        id="inputCourt"
                        value={createGroupRequest.group_court_id}
                        onChange={(e) => {
                          setCreateGroupRequest({
                            ...createGroupRequest,
                            group_court_id: Number(e.target.value),
                          });
                        }}
                      >
                        <option value={-1}>Choose...</option>
                        {courtLists.map((court: any, index: number) => (
                          <option key={index} value={court.court_id}>
                            {court.court_name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-muted">
                      Don't see your court?{' '}
                      <Link to={'/ap/courts'}>Add court</Link>
                    </p>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  <button
                    className={`btn btn-primary ${stepTwoValidation() ? '' : 'disabled'}`}
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="Header III">
                <div className="flex flex-column h-12rem">
                  <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    <div className="mb-3">
                      <label className="form-label">Visibility</label>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          name="visibility"
                          id="success-outlined"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_visibility === 0
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_visibility: Number(
                                e.target.checked ? 0 : 1
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-primary me-2"
                          htmlFor="success-outlined"
                        >
                          Private
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="visibility"
                          id="danger-outlined"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_visibility === 1
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_visibility: Number(
                                e.target.checked ? 1 : 0
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-primary"
                          htmlFor="danger-outlined"
                        >
                          Public
                        </label>
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Skill level</label>
                      <div>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-skill-level"
                          id="success-outlined1"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_skill_level === 0
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_skill_level: Number(
                                e.target.checked && 0
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-dark me-2"
                          htmlFor="success-outlined1"
                        >
                          All
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-skill-level"
                          id="danger-outlined2"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_skill_level === 1
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_skill_level: Number(
                                e.target.checked ? 1 : 0
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-dark me-2"
                          htmlFor="danger-outlined2"
                        >
                          Beginner
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-skill-level"
                          id="success-outlined3"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_skill_level === 2
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_skill_level: Number(
                                e.target.checked ? 2 : 0
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-dark me-2"
                          htmlFor="success-outlined3"
                        >
                          Intermediate
                        </label>
                        <input
                          type="radio"
                          className="btn-check"
                          name="options-skill-level"
                          id="danger-outlined4"
                          autoComplete="off"
                          checked={
                            createGroupRequest.group_access_skill_level === 3
                              ? true
                              : false
                          }
                          onChange={(e) => {
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_access_skill_level: Number(
                                e.target.checked ? 3 : 0
                              ),
                            });
                          }}
                        />
                        <label
                          className="btn btn-outline-dark"
                          htmlFor="danger-outlined4"
                        >
                          Advanced
                        </label>
                      </div>
                    </div>
                    <hr />
                    <div className="mb-3">
                      <div>
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                            checked={
                              createGroupRequest.group_access_invite_others ===
                              1
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_invite_others: Number(
                                  e.target.checked ? 1 : 0
                                ),
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                          >
                            Allow players to invite others
                          </label>
                        </div>

                        <div className="form-check form-switch">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked21"
                            checked={
                              createGroupRequest.group_access_message_all === 1
                                ? true
                                : false
                            }
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_message_all: Number(
                                  e.target.checked ? 1 : 0
                                ),
                              });
                            }}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked21"
                          >
                            Allow players to message the entire groups
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="Header IV">
                <div className="flex flex-column h-12rem">
                  <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">
                    <div className="mb-3">
                      <label htmlFor="formFile" className="form-label">
                        Select group image
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                      />
                    </div>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-secondary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  <button
                    className="btn btn-primary"
                    onClick={() => saveGroup()}
                  >
                    Save group
                  </button>
                </div>
              </StepperPanel>
            </Stepper>
          </div>
        </div>
      </div>
    </div>
  );
};
