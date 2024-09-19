import { useRef, useState } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { MultiSelect, MultiSelectChangeEvent } from 'primereact/multiselect';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
export const ScheduleModal = () => {
  const stepperRef: any = useRef(null);
  const [scheduleRequest, setScheduleRequest] = useState({
    schedule_name: '',
    schedule_description: '',
    schedule_starttime: '',
    schedule_endtime: '',
    schedule_repeat: 0,
    schedule_repeat_day: '',
    schedule_repeat_till: '',
    schedule_visibility: 0,
    schedule_skilllevel: '',
    schedule_rating: '',
    schedule_format: '',
    schedule_cost: '',
    schedule_signup: '',
    schedule_note_player: '',
    schedule_note_reviewer: '',
    schedule_auto_email: 0,
    schedule_created_on: '',
    schedule_courts: [],
    schedule_group_id: 2,
  });

  const courtList = [
    { label: 'Court 1', value: '1' },
    { label: 'Court 2', value: '2' },
    { label: 'Court 3', value: '3' },
  ]

    const navigate = useNavigate();

  const createSchedule = async (e : any) => {

    const request = {
        ...scheduleRequest,
        schedule_courts : JSON.stringify({...scheduleRequest.schedule_courts}) 
    }

    e.preventDefault();
    const response = await fetch(
      'https://acepicklapi.raganindustries.com/api_create_schedule.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: JSON.stringify(request),
      }
    );
    const data = await response.json();
    if (data === 'STATUS OK') {      
       Swal({
        title: 'Success',
        text: 'Schedule created successfully',
        icon: 'success',
       }) 
    } else if( data === 'ACCESS TOKEN ERROR'){
        localStorage.clear();
        navigate('/login');
    }
    console.log(data);
  };

  return (
    <div
      className="modal fade"
      id="scheduleModal"
      tabIndex={-1}
      aria-labelledby="scheduleModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-xl">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="scheduleModalLabel">
              Create schedule
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="container-fluid g-1">
              <div className="row g-1">
                <div className="col-3">
                  <h6>Schedules</h6>
                  <ul className="list-group">
                    {[1, 2, 3].map((i) => {
                      return (
                        <li className="list-group-item" key={i}>
                          <span>Schedule {i}</span>
                          <div className="btn-group d-none">
                            <button
                              type="button"
                              className="btn btn-danger dropdown-toggle"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Action
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <a className="dropdown-item" href="#">
                                  Action
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Another action
                                </a>
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Something else here
                                </a>
                              </li>
                              <li>
                                <hr className="dropdown-divider" />
                              </li>
                              <li>
                                <a className="dropdown-item" href="#">
                                  Separated link
                                </a>
                              </li>
                            </ul>
                          </div>
                        </li>
                      );
                    })}
                    <li className="list-group-item">Schedule 1</li>
                  </ul>
                </div>
                <div className="col-9 border-start">
                  <div className="p-2">
                    <form className="row" onSubmit={(e) => createSchedule(e)}>
                      <Stepper ref={stepperRef}>
                        <StepperPanel header="Basic">
                          <div className="row">
                            <div className="col-12 mb-3">
                              <label
                                htmlFor="inputScheduleName"
                                className="form-label"
                              >
                                Schedule Name
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputScheduleName"
                                placeholder="Schedule Name"
                                value={scheduleRequest.schedule_name}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_name: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label
                                htmlFor="inputDescription"
                                className="form-label"
                              >
                                Description
                              </label>
                              <textarea
                                className="form-control"
                                id="inputDescription"
                                rows={1}
                                value={scheduleRequest.schedule_description}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_description: e.target.value,
                                  })
                                }
                              ></textarea>
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputStartDate"
                                className="form-label"
                              >
                                Start Date
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="inputStartDate"
                                value={scheduleRequest.schedule_starttime}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_starttime: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputEndDate"
                                className="form-label"
                              >
                                End Date
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="inputEndDate"
                                value={scheduleRequest.schedule_endtime}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_endtime: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  name="flexSwitchCheckChecked"
                                  role="switch"
                                  id="flexSwitchCheckChecked"
                                  checked={scheduleRequest.schedule_repeat === 1 ? true : false}
                                  onChange={(e) =>
                                    setScheduleRequest({
                                      ...scheduleRequest,
                                      schedule_repeat: e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked"
                                >
                                  Schedule repeat
                                </label>
                              </div>
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputStartTime"
                                className="form-label"
                              >
                                Repeat Day
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputStartTime"
                                value={scheduleRequest.schedule_repeat_day}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_repeat_day: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputStartTime"
                                className="form-label"
                              >
                                Repeat till
                              </label>
                              <input
                                type="datetime-local"
                                className="form-control"
                                id="inputStartTime"
                                value={scheduleRequest.schedule_repeat_till}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_repeat_till: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputSkillLevel"
                                className="form-label"
                              >
                                Skill level
                              </label>
                              <select
                                id="inputSkillLevel"
                                className="form-select"
                                value={scheduleRequest.schedule_skilllevel}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_skilllevel: e.target.value,
                                  })
                                }
                              >
                                <option selected>Choose...</option>
                                <option value="1">Beginner</option>
                                <option value="2">Intermediate</option>
                                <option value="3">Advanced</option>
                              </select>
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputRating"
                                className="form-label"
                              >
                                Skill level
                              </label>
                              <input
                                type="text"
                                name="inputRating"
                                className="form-control"
                                id="inputRating"
                                value={scheduleRequest.schedule_rating}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_rating: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-12 mb-3">
                              <label
                                htmlFor="inputVisibility"
                                className="form-label me-3"
                              >
                                Visibility :{' '}
                              </label>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadioPublic"
                                  value={0}
                                  checked = {scheduleRequest.schedule_visibility === 0}
                                  onChange={(e) =>
                                    setScheduleRequest({
                                      ...scheduleRequest,
                                      schedule_visibility:  parseInt(e.target.value),
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadioPublic"
                                >
                                  Public
                                </label>
                              </div>
                              <div className="form-check form-check-inline">
                                <input
                                  className="form-check-input"
                                  type="radio"
                                  name="inlineRadioOptions"
                                  id="inlineRadioPrivate"
                                  value={1}
                                  checked = {scheduleRequest.schedule_visibility === 0}
                                  onChange={(e) =>
                                    setScheduleRequest({
                                      ...scheduleRequest,
                                      schedule_visibility: parseInt(e.target.value),
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="inlineRadioPrivate"
                                >
                                  Private
                                </label>
                              </div>
                            </div>
                            <div className="col-12 mb-3">
                              <div className="form-check form-switch">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  role="switch"
                                  id="flexSwitchCheckChecked1"
                                  value={scheduleRequest.schedule_auto_email}
                                  checked={scheduleRequest.schedule_auto_email === 1 ? true : false}
                                  onChange={(e) =>
                                    setScheduleRequest({
                                      ...scheduleRequest,
                                      schedule_auto_email: e.target.checked ? 1 : 0,
                                    })
                                  }
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="flexSwitchCheckChecked1"
                                >
                                  Auto email
                                </label>
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
                        <StepperPanel header="Advanced">
                          <div className="row">
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputFormat"
                                className="form-label"
                              >
                                Format
                              </label>
                              <select
                                id="inputFormat"
                                className="form-select"
                                value={scheduleRequest.schedule_format}
                                onChange={(e) =>setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_format: e.target.value,
                                })}
                              >
                                <option value={-1}>Choose...</option>
                                <option value="1">Singles</option>
                                <option value="2">Doubles</option>
                                <option value="3">Mixed</option>
                              </select>
                            </div>
                            <div className="col-6 mb-3">
                              <label htmlFor="inputCost" className="form-label">
                                Cost
                              </label>
                              <input
                                type="text"
                                className="form-control"
                                id="inputCost"
                                placeholder=""
                                value={scheduleRequest.schedule_cost}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_cost: e.target.value,
                                  })
                                }
                              />
                            </div>
                            <div className="col-6 mb-3">
                              <label
                                htmlFor="inputFormat"
                                className="form-label"
                              >
                                Court Allocation format
                              </label>
                              <select
                                id="inputFormat"
                                className="form-select"
                                value={scheduleRequest.schedule_signup}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_signup: e.target.value,
                                  })
                                }
                              >
                                <option value={-1}>Choose...</option>
                                <option value="1">Random</option>
                                <option value="2">Round Robin</option>
                                <option value="3">Custom</option>
                              </select>
                            </div>
                            <div className="col-6 mb-3">
                                <label htmlFor="inputCourt" className="form-label">
                                    Court
                                </label>
                                <MultiSelect
                                    id="inputCourt"
                                    value={scheduleRequest.schedule_courts}
                                    options={courtList}
                                    className="w-100"
                                    onChange={(e : MultiSelectChangeEvent) => {
                                        const selectedCourts = e.value;
                                
                                        // Append selected values to the existing array
                                        setScheduleRequest((prevState : any) => {
                                            // Create a new array with the previous values and new selected ones (without duplicates)
                                            const updatedCourts = [...new Set([...prevState.schedule_courts,  ...selectedCourts])];
                                          
                                            return {
                                                ...prevState,
                                                schedule_courts: updatedCourts, // Update state with new array
                                            };
                                        });
                                    }}
                                    optionLabel="label"
                                    display="chip"
                                    filter
                                />
                            </div>
                            <div className="col-12 mb-3">
                              <label
                                htmlFor="inputNotePlayer"
                                className="form-label"
                              >
                                Note to Player
                              </label>
                              <input
                                type="text"
                                name=""
                                id="inputNotePlayer"
                                value={scheduleRequest.schedule_note_player}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_note_player: e.target.value,
                                  })
                                }
                                className="form-control"
                              />
                            </div>
                            <div className="col-12 mb3">
                              <label
                                htmlFor="inputNoteReviewer"
                                className="form-label"
                              >
                                Note to Reviewer
                              </label>
                              <input
                                type="text"
                                name=""
                                id="inputNoteReviewer"
                                className="form-control"
                                value={scheduleRequest.schedule_note_reviewer}
                                onChange={(e) =>
                                  setScheduleRequest({
                                    ...scheduleRequest,
                                    schedule_note_reviewer: e.target.value,
                                  })
                                }
                              />
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
                                type='submit'
                              className="btn btn-primary"                              
                            >
                              Create schedule
                            </button>
                          </div>
                        </StepperPanel>
                      </Stepper>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer p-1 d-none">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button
              type="button"
              className="btn btn-primary"
            
            >
              Create schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
