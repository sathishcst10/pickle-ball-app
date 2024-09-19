import { MultiSelect } from 'primereact/multiselect';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { useRef, useState } from 'react';

export function CreateCourtV2() {
  const stepperRef: any = useRef(null);
  const [surfaces, setSurfaces] = useState<any[]>([
    { name: 'Hard' },
    { name: 'Clay' },
    { name: 'Grass' },
    { name: 'Carpet' },
    { name: 'Acrylic' },
  ]);
  return (
    <div
      className="offcanvas offcanvas-end m-4 rounded-4 w-75"
      tabIndex={-1}
      id="createCourtOffCanvas"
      aria-labelledby="createCourtOffCanvasLabel"
      style={{ zIndex: 10000 }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="createCourtOffCanvasLabel">
          Create Court
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
        <Stepper ref={stepperRef}>
          <StepperPanel header="1">
            <div className="d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput" className="form-label">
                  Court Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput"
                  placeholder="Example input placeholder"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Court Address
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Another input placeholder"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput4" className="form-label">
                  No. of Indoor Pickle Ball Courts
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput4"
                  placeholder="Another input placeholder"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  No. of Outdoor Pickle Ball Courts
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Another input placeholder"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Lines
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Another input placeholder"
                />
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
          <StepperPanel header="null">
            <div className="d-flex flex-column">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Nets
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="formGroupExampleInput2"
                  placeholder="Another input placeholder"
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
                className="btn btn-primary"
                onClick={() => stepperRef.current.nextCallback()}
              >
                Next
              </button>
            </div>
          </StepperPanel>
          <StepperPanel header="2">
            <div className="d-flex">
              <div className="mb-3">
                <label htmlFor="formGroupExampleInput2" className="form-label">
                  Facility hours
                </label>

                <table className="table">
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
                              value=""
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
                          <input type="time" className="form-control" />
                        </td>
                        <td>
                          <label htmlFor="" className="px-3">
                            to
                          </label>
                        </td>
                        <td>
                          <input type="time" className="form-control" />
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
              <button
                className="btn btn-primary"
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
                        <label htmlFor="formGroupExampleInput2" className="form-label">Access</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Unknown"/>
                    </div>
              
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Fee details</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Unknown"/>
                    </div>
                    <div className="form-check form-switch">
                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"/>
                        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Reservations allowed</label>
                    </div>
                    <hr/>
                    <h4>Contact details</h4>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">E-mail address</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Unknown"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Phone number</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Unknown"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Website</label>
                        <input type="text" className="form-control" id="formGroupExampleInput2" placeholder="Unknown"/>
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
                <div className='d-flex flex-column'>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Upload Court Image</label>
                        <input type="file" className="form-control" id="formGroupExampleInput2"/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="formGroupExampleInput2" className="form-label">Private notes to reviewers</label>
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
                        className="btn btn-success"
                      
                    >
                        Submit court
                    </button>
                </div>
          </StepperPanel>
        </Stepper>
      </div>
    </div>
  );
}
