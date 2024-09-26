import { MultiSelect } from 'primereact/multiselect';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from 'react';

export function CreateCourtV2() {
  const stepperRef: any = useRef(null);
  const [surfaces, setSurfaces] = useState<any[]>([
    { id: 1, name: 'Hard' },
    { id: 2, name: 'Clay' },
    { id: 3, name: 'Grass' },
    { id: 4, name: 'Carpet' },
    { id: 5, name: 'Acrylic' },
  ]);

  const [selectedSurfaces, setSelectedSurfaces] = useState([]);
  const [selectedAmities, setSelectedAmities] = useState([]);

  const [courtRequest, setCourtRequest] = useState({
    court_name: '',
    court_address: '',
    court_map_latitude: '',
    court_map_longitude: '',
    court_indoor_count: 0,
    court_outdoor_count: 0,
    court_description: '',
    court_note: '',
    court_surface_ids: {},
    court_aminity_ids: {},
    court_avail_ids: {},
  });
  const [formData, setFormData] = useState({
    // Initialize the state with default values for each iterated element
    Monday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Tuesday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Wednesday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Thursday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Friday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Saturday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    Sunday: {
      isChecked: false,
      startTime: '',
      endTime: '',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    // ... similar objects for other days
  });

  const handleCheckboxChange = (day: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        isChecked: !prevData[day].isChecked,
      },
    }));
  };

  const handleTimeChange = (day, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };

  const handleAmPmChange = (day, field, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [day]: {
        ...prevData[day],
        [field]: value,
      },
    }));
  };

  const stepOneValidation = () => {
    if (
      courtRequest.court_name.length > 0 &&
      courtRequest.court_address.length > 0 &&
      courtRequest.court_indoor_count > 0 &&
      courtRequest.court_outdoor_count > 0 &&
      courtRequest.court_map_latitude.length > 0 &&
      courtRequest.court_map_longitude.length > 0
    ) {
      return true;
    }
    return false;
  };
  const stepTwoValidation = () => {
    if (selectedSurfaces.length > 0 && selectedAmities.length > 0) {
      return true;
    }
    return false;
  };
  const stepThreeValidation = () => {
    if (
      formData.Monday.isChecked ||
      formData.Tuesday.isChecked ||
      formData.Wednesday.isChecked ||
      formData.Thursday.isChecked ||
      formData.Friday.isChecked ||
      formData.Saturday.isChecked ||
      formData.Sunday.isChecked
    ) {
      return true;
    }
    return false;
  };

  const stepFiveValidation = () => {
    if (courtRequest.court_note.length > 0) {
      return true;
    }
    return false;
  };

  const convertFormData = (inputData : any) => {
    const outputData : any = {};

    let counter = 1;
    for (const day in inputData) {
      const dayData = inputData[day];

      if (dayData.isChecked) {
        const startTime = parseInt(dayData.startTime.split(':')[0]);
        const endTime = parseInt(dayData.endTime.split(':')[0]);
        const amPmStart = dayData.amPmStart;
        const amPmEnd = dayData.amPmEnd;

        // Adjust start and end times based on AM/PM
        let adjustedStartTime = startTime;
        let adjustedEndTime = endTime;
        if (amPmStart === 'PM') {
          adjustedStartTime += 12;
        }
        if (amPmEnd === 'PM') {
          adjustedEndTime += 12;
        }

        outputData[counter] = {
          start: adjustedStartTime.toString().padStart(2, '0'),
          end: adjustedEndTime.toString().padStart(2, '0'),
        };
        counter++;
      }
    }

    return outputData;
  };

  const create_courts = () => {
    console.log('courtRequest', courtRequest);
    console.log('selectedSurfaces', selectedSurfaces);
    console.log('selectedAmities', selectedAmities);
    console.log('formData', formData);
    const times : any = convertFormData(formData); 
    setCourtRequest({
      ...courtRequest,
      court_surface_ids: { ...selectedAmities.map((items: any) => items.id) },
      court_aminity_ids: { ...selectedSurfaces.map((items: any) => items.id) },
      court_avail_ids:  times,
    });


    fetch('https://acepicklapi.raganindustries.com/api_create_court.php',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body : JSON.stringify(courtRequest)      
    }
    ).then(res=>res.json())
    .then((response)=>{
      console.log(response)
    }).catch((error)=>{
      console.error(error)
    })
  };

  return (
    <div
      className="modal fade"
      id="createCourtModal"
      tabIndex={-1}
      aria-labelledby="createCourtModalLabel"
      aria-hidden="true"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="createCourtModalLabel">
              Create Court
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
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput"
                      className="form-label"
                    >
                      Court Title
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput"
                      placeholder="Enter court title/name"
                      value={courtRequest.court_name}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_name: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Court Address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Court Address"
                      value={courtRequest.court_address}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_address: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Court Location
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Court Latitude"
                      value={courtRequest.court_map_latitude}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_map_latitude: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3 d-none">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Court Longitude
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Court Longitude"
                      value={courtRequest.court_map_longitude}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_map_longitude: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput4"
                      className="form-label"
                    >
                      No. of Indoor Pickle Ball Courts
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formGroupExampleInput4"
                      placeholder="No.of indoor courts"
                      value={courtRequest.court_indoor_count}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_indoor_count: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      No. of Outdoor Pickle Ball Courts
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="No.of outdoor courts"
                      value={courtRequest.court_outdoor_count}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_outdoor_count: Number(e.target.value),
                        })
                      }
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Lines <small>(Optional)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Enter lines"
                    />
                  </div>
                </div>

                <div className="d-flex pt-4 justify-content-end">
                  <button
                    className={`btn btn-primary ${
                      stepOneValidation() ? '' : 'disabled'
                    }`}
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="null">
                <div className="d-flex flex-column">
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Nets
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Nets details"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Surface(s)
                    </label>
                    <MultiSelect
                      className="form-control d-flex"
                      options={surfaces}
                      optionLabel="name"
                      placeholder="Select Surface(s)"
                      maxSelectedLabels={3}
                      onChange={(e) => setSelectedSurfaces(e.value)}
                      display="chip"
                      value={selectedSurfaces}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Amenities
                    </label>
                    <MultiSelect
                      className="form-control d-flex"
                      options={surfaces}
                      optionLabel="name"
                      placeholder="Select Amenities"
                      maxSelectedLabels={3}
                      onChange={(e) => setSelectedAmities(e.value)}
                      display="chip"
                      value={selectedAmities}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Additional description
                    </label>
                    <textarea name="" id="" className="form-control"></textarea>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  <button
                    className={`btn btn-primary ${
                      stepTwoValidation() ? '' : 'disabled'
                    }`}
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="2">
                <div className="">
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Facility hours
                    </label>

                    <table className="table table-bordered">
                      <tbody>
                        {[
                          'Monday',
                          'Tuesday',
                          'Wednesday',
                          'Thursday',
                          'Friday',
                          'Saturday',
                          'Sunday',
                        ].map((day, index) => (
                          <tr key={day}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={formData[day].isChecked}
                                  onChange={() => handleCheckboxChange(day)}
                                  id={'flexCheckDefault' + index}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={'flexCheckDefault' + index}
                                >
                                  {day}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  type="time"
                                  className="form-control me-2"
                                  value={formData[day].startTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      day,
                                      'startTime',
                                      e.target.value
                                    )
                                  }
                                />
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Basic radio toggle button group"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradio' + day}
                                    id={'btnRadio-start' + day + index + '-am'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-start' + day + index + '-am'
                                    }
                                  >
                                    AM
                                  </label>
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradio' + day}
                                    id={'btnRadio-start' + day + index + '-pm'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-start' + day + index + '-pm'
                                    }
                                  >
                                    PM
                                  </label>
                                </div>
                              </div>
                            </td>
                            <td>
                              <label htmlFor="" className="px-3">
                                to
                              </label>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  type="time"
                                  className="form-control me-2"
                                  value={formData[day].endTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      day,
                                      'endTime',
                                      e.target.value
                                    )
                                  }
                                />
                                <div
                                  className="btn-group"
                                  role="group"
                                  aria-label="Basic radio toggle button group"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradioend' + day}
                                    id={'btnRadio-end' + day + index + '-am'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-end' + day + index + '-am'
                                    }
                                  >
                                    AM
                                  </label>
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradioend' + day}
                                    id={'btnRadio-end' + day + index + '-pm'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-end' + day + index + '-pm'
                                    }
                                  >
                                    PM
                                  </label>
                                </div>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  {/* <button className='btn' onClick={(e)=>console.log(formData)}>
                        get data
                  </button> */}
                  <button
                    className={`btn btn-primary ${
                      stepThreeValidation() ? '' : 'disabled'
                    }`}
                    onClick={() => stepperRef.current.nextCallback()}
                  >
                    Next
                  </button>
                </div>
              </StepperPanel>
              <StepperPanel header="3">
                <div className="d-flex flex-column">
                  <h4>Reservations & Access</h4>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Access
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Unknown"
                    />
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Fee details
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Unknown"
                    />
                  </div>
                  <div className="form-check form-switch">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="flexSwitchCheckDefault"
                    />
                    <label
                      className="form-check-label"
                      htmlFor="flexSwitchCheckDefault"
                    >
                      Reservations allowed
                    </label>
                  </div>
                  <hr />
                  <h4>Contact details</h4>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      E-mail address
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Unknown"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Phone number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Unknown"
                    />
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Website
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Unknown"
                    />
                  </div>
                </div>

                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-primary"
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
              <StepperPanel header="4">
                <div className="d-flex flex-column">
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Select court image"
                    />
                    <button className="btn btn-dark">Upload</button>
                  </div>
                  <div className="mb-3">
                    <label
                      htmlFor="formGroupExampleInput2"
                      className="form-label"
                    >
                      Private notes to reviewers
                    </label>
                    <textarea
                      name=""
                      id=""
                      className="form-control"
                      value={courtRequest.court_note}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_note: e.target.value,
                        })
                      }
                    ></textarea>
                  </div>
                </div>
                <div className="d-flex pt-4 justify-content-between">
                  <button
                    className="btn btn-primary"
                    onClick={() => stepperRef.current.prevCallback()}
                  >
                    Back
                  </button>
                  <button
                    className={`btn btn-success ${
                      stepFiveValidation() ? '' : 'disabled'
                    }`}
                    onClick={(e) => {
                      create_courts();
                    }}
                  >
                    Submit court
                  </button>
                </div>
              </StepperPanel>
            </Stepper>
          </div>
          <div className="modal-footer d-none">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
