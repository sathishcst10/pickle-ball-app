import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { useRef } from 'react';
import { MultiSelect } from 'primereact/multiselect';

export const CreateGroupModal: React.FC = () => {
  const stepperRef: any = useRef(null);
  const courts = [
    { name: 'Ace Pickl Court-1', code: 'NY' },
    { name: 'Ace Pickl Court-2', code: 'RM' },
    { name: 'Ace Pickl Court-3', code: 'LDN' },
    { name: 'Ace Pickl Court-4', code: 'IST' },
    { name: 'Ace Pickl Court-5', code: 'PRS' },
  ];

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
                      ></textarea>
                    </div>
                    <div className="mb-3">
                      <div className="form-check form-switch">
                        <label
                          className="form-check-label"
                          htmlFor="flexSwitchCheckChecked"
                        >
                          I would like to display my details as the group admin.
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
                      <select className="form-select" id="inputCourt">
                        <option selected>Choose...</option>
                        {courts.map((court, index) => (
                          <option key={index} value={court.code}>
                            {court.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <p className="text-muted">
                      Don't see your court? <a href="#">Add court</a>
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
                          name="options-outlined"
                          id="success-outlined"
                          autoComplete="off"
                          checked
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
                          name="options-outlined"
                          id="danger-outlined"
                          autoComplete="off"
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
                          checked
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
                          checked
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
                            checked
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
                            checked
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
                    onClick={() => stepperRef.current.nextCallback()}
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
