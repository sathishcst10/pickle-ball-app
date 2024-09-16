export const ScheduleModal = () => {
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
                            {
                                [1,2,3].map((i) => {
                                    return <li className="list-group-item" key={i}>
                                        <span>Schedule {i}</span>
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-danger dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                Action
                                            </button>
                                            <ul className="dropdown-menu">
                                                <li><a className="dropdown-item" href="#">Action</a></li>
                                                <li><a className="dropdown-item" href="#">Another action</a></li>
                                                <li><a className="dropdown-item" href="#">Something else here</a></li>
                                                <li><hr className="dropdown-divider"/></li>
                                                <li><a className="dropdown-item" href="#">Separated link</a></li>
                                            </ul>
                                        </div>
                                    </li>
                                })
                            }
                            <li className="list-group-item">
                                Schedule 1
                            </li>
                            
                        </ul>
                    </div>
                    <div className="col-9 border-start">
                        <div className="p-2">
                            <form className="row">
                                <div className="col-12 mb-3">
                                    <label htmlFor="inputScheduleName" className="form-label">Schedule Name</label>
                                    <input type="text" className="form-control" id="inputScheduleName" placeholder="Schedule Name"/>
                                </div>
                                <div className="col-12 mb-3">
                                    <label htmlFor="inputDescription" className="form-label">Description</label>
                                    <textarea className="form-control" id="inputDescription" rows={1}></textarea>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="inputStartDate" className="form-label">Start Date</label>
                                    <input type="date" className="form-control" id="inputStartDate"/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="inputEndDate" className="form-label">End Date</label>
                                    <input type="date" className="form-control" id="inputEndDate"/>
                                </div>
                                <div className="col-12 mb-3">
                                <div className="form-check form-switch">
                                    <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
                                    <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Checked switch checkbox input</label>
                                </div>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="inputStartTime" className="form-label">Repeat Day</label>
                                    <input type="date" className="form-control" id="inputStartTime"/>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="inputStartTime" className="form-label">Repeat till</label>
                                    <input type="date" className="form-control" id="inputStartTime"/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="inputSkillLevel" className="form-label">Skill level</label>
                                    <select id="inputSkillLevel" className="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">Beginner</option>
                                        <option value="2">Intermediate</option>
                                        <option value="3">Advanced</option>
                                    </select>
                                </div>
                                <div className="col-6 mb-3">
                                    <label htmlFor="inputRating" className="form-label">Skill level</label>
                                    <select id="inputRating" className="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                        <option value="4">4</option>
                                        <option value="5">5</option>
                                        <option value="6">6</option>                                        
                                    </select>   
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="inputVisibility" className="form-label me-3">Visibility : </label>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="option1" />
                                        <label className="form-check-label" htmlFor="inlineRadio1">Public</label>
                                    </div>
                                    <div className="form-check form-check-inline">
                                        <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="option2" />
                                        <label className="form-check-label" htmlFor="inlineRadio2">Private</label>
                                    </div>
                                </div>
                                <div className="col-12 mb-3">
                                    <div className="form-check form-switch">
                                        <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckChecked" checked/>
                                        <label className="form-check-label" htmlFor="flexSwitchCheckChecked">Auto email</label>
                                    </div>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="inputFormat" className="form-label">Format</label>
                                    <select id="inputFormat" className="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">Singles</option>
                                        <option value="2">Doubles</option>
                                        <option value="3">Mixed</option>
                                    </select>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="inputCost" className="form-label">Cost</label>
                                    <input type="text" className="form-control" id="inputCost" placeholder=""/>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="inputFormat" className="form-label">Court Allocation format</label>
                                    <select id="inputFormat" className="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">Random</option>
                                        <option value="2">Round Robin</option>
                                        <option value="3">Custom</option>
                                    </select>
                                </div>

                                <div className="col-6 mb-3">
                                    <label htmlFor="inputCourt" className="form-label">Court</label>
                                    <select id="inputCourt" className="form-select">
                                        <option selected>Choose...</option>
                                        <option value="1">Court 1</option>
                                        <option value="2">Court 2</option>
                                        <option value="3">Court 3</option>
                                    </select>
                                </div>

                                <div className="col-12 mb-3">
                                    <label htmlFor="inputNotePlayer" className="form-label">Note to Player</label>
                                    <input type="text" name="" id="inputNotePlayer" className="form-control"/>
                                </div>
                                <div className="col-12 mb3">
                                    <label htmlFor="inputNoteReviewer" className="form-label">Note to Reviewer</label>
                                    <input type="text" name="" id="inputNoteReviewer" className="form-control"/>
                                </div>
                               
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <div className="modal-footer p-1">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Create schedule
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
