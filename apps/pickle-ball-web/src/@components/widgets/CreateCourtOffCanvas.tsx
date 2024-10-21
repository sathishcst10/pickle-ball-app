import { MultiSelect } from 'primereact/multiselect';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Swal from 'sweetalert2';

interface SURFACE {
  id : number,
  name : string
}

export function CreateCourtV2(props : any) {
  const stepperRef: any = useRef(null);
  const [surfaces, setSurfaces] = useState<SURFACE[]>([
    { id: 1, name: 'Hard' },
    { id: 2, name: 'Clay' },
    { id: 3, name: 'Grass' },
    { id: 4, name: 'Carpet' },
    { id: 5, name: 'Acrylic' },
  ]);
  const location = useLocation();
  const [selectedSurfaces, setSelectedSurfaces] = useState<SURFACE[]>([]);
  const [selectedAmities, setSelectedAmities] = useState<SURFACE[]>([]);

  const [formData, setFormData] = useState([
    {
      name : 'Sunday',
      day : 0,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Monday',
      day : 1,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Tuesday',
      day : 2,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Wednesday',
      day : 3,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Thursday',
      day : 4,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Friday',
      day : 5,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    },
    {
      name : 'Saturday',
      day : 6,
      isChecked: false,
      startTime: '08:00',
      endTime: '18:00',
      amPmStart: 'AM',
      amPmEnd: 'AM',
    }
  ]);

  const [courtRequest, setCourtRequest] : any = useState({
    court_name: '',
    court_address: '',
    court_map_latitude: '',
    court_map_longitude: '',
    court_indoor_count: undefined,
    court_outdoor_count: undefined,
    court_description: '',
    court_note: '',
    court_surface_ids: [],
    court_aminity_ids: [],
    court_avail_ids: [],
  });
  const handleCheckboxChange = (dayIndex : number) => {
  //   setCourtRequest({
  //     ...courtRequest,
  //     court_avail_ids: courtRequest.court_avail_ids.map((day, index) => {
  //       if (index === dayIndex) {
  //         return { ...day, isChecked: !day.isChecked };
  //       }
  //       return day;
  //   })
  // });

    setFormData(prevData => {
      return prevData.map((day, index) => {
        if (index === dayIndex) {
          return { ...day, isChecked: !day.isChecked };
        }
        return day;
      });
    });
  };

  const handleTimeChange = (dayIndex : number, field : any, value : any) => {
    // setCourtRequest({
    //   ...courtRequest,
    //   court_avail_ids: courtRequest.court_avail_ids.map((day, index) => {
    //     if (index === dayIndex) {
    //       return { ...day, [field]: value };
    //     }
    //     return day;
    //   })
    // })

    setFormData((prevData) => {
      const updatedData : any = [...prevData];
      updatedData[dayIndex][field] = value;
      return updatedData;
    });
  };

  const handleAmPmChange = (dayIndex :any, field : any, value : any) => {
    // setFormData((prevData) => {
    //   const updatedData : any = [...prevData];
    //   updatedData[dayIndex][field] = value;
    //   return updatedData;
    // });
  };

  const stepOneValidation = () => {
    if (
      courtRequest.court_name.length > 0 &&
      courtRequest.court_address.length > 0 &&
      courtRequest.court_indoor_count !== undefined &&
      courtRequest.court_outdoor_count !== undefined
    ) {
      return true;
    }
    return false;
  };
  const stepTwoValidation = () => {
    if (courtRequest.court_aminity_ids.length > 0 && courtRequest.court_surface_ids.length > 0) {
      return true;
    }
    return false;
  };
  const stepThreeValidation = () => {
    if (
     formData.some((day) => day.isChecked)
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


  const create_courts = () => {
   
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
      if(response === 'ACCESS TOKEN ERROR'){
        console.log('Unauthorized')
        localStorage.clear()
        // navigate('/login')
      }else if(response === 'STATUS OK'){
        console.log('Court created successfully')
        Swal.fire({
          icon: 'success',
          title: 'Court created successfully',
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response,
        })
      }


    }).catch((error)=>{
      console.error(error)
    })
  };

  useEffect(() => {
    setCourtRequest({
      ...courtRequest,
      court_avail_ids: formData.filter((_day, index)=>_day.isChecked).map((day, index) => {
        return {
          day : day.day,
          startTime : day.startTime,
          endTime : day.endTime
      }})
    })
},[
    formData
  ])

  const update_courts = () => {
    fetch('https://acepicklapi.raganindustries.com/api_edit_court.php',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body : JSON.stringify({
        ...courtRequest,
        court_id : location.state.court_id
      })
    }).then(res=>res.json())
    .then((response)=>{
      console.log(response)
      if(response === 'ACCESS TOKEN ERROR'){
        console.log('Unauthorized')
        localStorage.clear()
        // navigate('/login')
      }else if(response === 'STATUS OK'){
        console.log('Court updated successfully')
        Swal.fire({
          icon: 'success',
          title: 'Court updated successfully',
          showConfirmButton: false,
          timer: 2000
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        })
      }else{
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: response,
        })
      }
    }).catch((error)=>{
      console.error(error)
    })
  }


  const getCourtById = (id : number) => {
    fetch('https://acepicklapi.raganindustries.com/api_get_court.php',{
      method : "POST",
      headers : {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem('user') as string).access_token,
      },
      body : JSON.stringify({court_id : id})
    }).then(res=>res.json())
    .then((response : any)=>{
      console.log(response)
      if(response === 'ACCESS TOKEN ERROR'){
        console.log('Unauthorized')
        localStorage.clear()
        // navigate('/login')
      }else {
        console.log(response);
        setCourtRequest(
          {
            court_name: response.court_name,
            court_address: response.court_address,
            court_map_latitude: response.court_map_latitude,
            court_map_longitude: response.court_map_longitude,
            court_indoor_count: response.court_indoor_count,
            court_outdoor_count: response.court_outdoor_count,
            court_description: response.court_description,
            court_note: response.court_note,
            court_surface_ids: [],
            court_aminity_ids: [],
            court_avail_ids : [],
          }          
        )

      }
    }).catch((error)=>{
      console.error(error)
    })

  }


  useEffect(() => {
    if(props.type === 'Edit'){
      getCourtById(location.state.court_id)
    }
  },[props.type])


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
             { props.type === 'Create' ?  'Create Court' : 'Edit Court' }
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
                      maxLength={150}
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
                      Court Location <small>(Google Maps Link)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="Court Location"
                      max={150}
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
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput4"
                      placeholder="No.of indoor courts"
                      value={courtRequest.court_indoor_count}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_indoor_count: e.target.value,
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
                      type="text"
                      className="form-control"
                      id="formGroupExampleInput2"
                      placeholder="No.of outdoor courts"
                      value={courtRequest.court_outdoor_count}
                      onChange={(e) =>
                        setCourtRequest({
                          ...courtRequest,
                          court_outdoor_count: e.target.value,
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
                      onChange={(e) => setCourtRequest({ ...courtRequest, court_surface_ids: e.value })}
                      display="chip"
                      value={courtRequest.court_surface_ids}
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
                      onChange={(e) => setCourtRequest({ ...courtRequest, court_aminity_ids: e.value })}
                      display="chip"
                      value={courtRequest.court_aminity_ids}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="" className="form-label">
                      Additional description
                    </label>
                    <input type="text" name="" id="" maxLength={150} className='form-control'/>
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
                        {formData.map((day, index) => (
                          <tr key={index}>
                            <td>
                              <div className="form-check">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={day.isChecked}
                                  onChange={() => handleCheckboxChange(index)}
                                  id={'flexCheckDefault' + index}
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor={'flexCheckDefault' + index}
                                >
                                  {day.name}
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="d-flex">
                                <input
                                  type="time"
                                  className="form-control me-2"
                                  value={day.startTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      index,
                                      'startTime',
                                      e.target.value
                                    )
                                  }
                                />
                                <div
                                  className="btn-group d-none"
                                  role="group"
                                  aria-label="Basic radio toggle button group"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradio' + day.name}
                                    id={'btnRadio-start' + day.name + index + '-am'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-start' + day.name + index + '-am'
                                    }
                                  >
                                    AM
                                  </label>
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradio' + day.name}
                                    id={'btnRadio-start' + day.name + index + '-pm'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-start' + day.name + index + '-pm'
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
                            <td >
                              <div className="d-flex">
                                <input
                                  type="time"
                                  className="form-control me-2"
                                  value={day.endTime}
                                  onChange={(e) =>
                                    handleTimeChange(
                                      index,
                                      'endTime',
                                      e.target.value
                                    )
                                  }
                                />
                                <div
                                  className="btn-group d-none"
                                  role="group"
                                  aria-label="Basic radio toggle button group"
                                >
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradioend' + day.name}
                                    id={'btnRadio-end' + day.name + index + '-am'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-end' + day.name + index + '-am'
                                    }
                                  >
                                    AM
                                  </label>
                                  <input
                                    type="radio"
                                    className="btn-check"
                                    name={'btnradioend' + day.name}
                                    id={'btnRadio-end' + day.name + index + '-pm'}
                                    autoComplete="off"
                                  />
                                  <label
                                    className="btn btn-outline-dark"
                                    htmlFor={
                                      'btnRadio-end' + day.name + index + '-pm'
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
                      maxLength={150}
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
                  {
                    props.type === 'Edit' ?
                    <button
                      className={`btn btn-success ${
                        stepFiveValidation() ? '' : 'disabled'
                      }`}
                      onClick={(e) => {
                        update_courts();
                      }}
                    >
                      Update court
                    </button> :

                    <button
                    className={`btn btn-success ${
                      stepFiveValidation() ? '' : 'disabled'
                    }`}
                    onClick={(e) => {
                      create_courts();
                    }}
                    >
                    Create court
                    </button>
                  }
                 
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
