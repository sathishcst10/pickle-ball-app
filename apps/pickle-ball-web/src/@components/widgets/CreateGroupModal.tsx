import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { useRef, useState } from 'react';
import { MultiSelect } from 'primereact/multiselect';
import { Link } from 'react-router-dom';
import { CreateCourt } from './CreateCourt';
import { CreateCourtV2 } from './CreateCourtOffCanvas';
import { create } from 'domain';

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
    group_court_id: 0,
    group_access_name: '',
    group_access_visibility: 0,
    group_access_skill_level: 0,
    group_access_rating: 0,
    group_access_invite_others: 0,
    group_access_message_all: 0,
  });

  const saveGroup = () => {
    debugger;
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
        if (data.status === 'STATUS OK') {
          console.log('Group created successfully');
          window.location.href = '/groups';
        } else {
          alert(data.status + ' : ' + data.description);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <>
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
                Create a Group
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
                <StepperPanel header="null">
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
                          value={createGroupRequest?.group_allowpublic}
                          onChange={(e) =>
                            setCreateGroupRequest({
                              ...createGroupRequest,
                              group_allowpublic: Number(e.target.value),
                            })
                          }
                        />
                        <div className="form-check form-switch">
                          <label
                            className="form-check-label"
                            htmlFor="flexSwitchCheckChecked"
                          >
                            Do you want to upload club members and send invite?
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
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
                            htmlFor="flexSwitchCheckChecked"
                          >
                            I would like to display my details as the group
                            admin.
                          </label>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            role="switch"
                            id="flexSwitchCheckChecked"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex pt-4 justify-content-end">
                    <button
                      className="btn btn-primary"
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
                          <option selected>Choose...</option>
                          {courts.map((court, index) => (
                            <option key={index} value={court.code}>
                              {court.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <p className="text-muted">
                        Don't see your court?{' '}
                        <Link
                          data-bs-toggle="offcanvas"
                          to={'#createCourtOffCanvas'}
                          role="button"
                        >
                          Add court
                        </Link>
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
                      className="btn btn-primary"
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
                            value={createGroupRequest.group_access_visibility}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_visibility: Number(e.target.value),
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
                            value={createGroupRequest.group_access_visibility}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_visibility: Number(e.target.value),
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
                            value={createGroupRequest.group_access_skill_level}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_skill_level: Number(
                                  e.target.value
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
                            value={createGroupRequest.group_access_skill_level}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_skill_level: Number(
                                  e.target.value
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
                            value={createGroupRequest.group_access_skill_level}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_skill_level: Number(
                                  e.target.value
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
                            value={createGroupRequest.group_access_skill_level}
                            onChange={(e) => {
                              setCreateGroupRequest({
                                ...createGroupRequest,
                                group_access_skill_level: Number(
                                  e.target.value
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
                              value={
                                createGroupRequest.group_access_invite_others
                              }
                              onChange={(e) => {
                                setCreateGroupRequest({
                                  ...createGroupRequest,
                                  group_access_invite_others: Number(
                                    e.target.value
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
                              value={
                                createGroupRequest.group_access_message_all
                              }
                              onChange={(e) => {
                                setCreateGroupRequest({
                                  ...createGroupRequest,
                                  group_access_message_all: Number(
                                    e.target.value
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
      <CreateCourt />
      <CreateCourtV2 />
    </>
  );
};
