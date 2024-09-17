export function Schedule() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12 my-3">
          <div className="d-flex justify-content-between">
            <h4 className="text-start">Schedule</h4>
            <button className="btn btn-dark">Add Schedule</button>
          </div>
        </div>
        <div className="col-12">
          <table className="table table-bordered">
            <thead className="table-dark">
              <tr>
                <th scope="col">Schedule name</th>
                <th scope="col">Date</th>
                <th scope="col">Time</th>
                <th scope="col">Group</th>
                <th scope="col">Court</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {[1, 2, 3, 4, 5].map((i) => {
                return (
                  <tr>
                    <td>Game 1</td>
                    <td>2021-10-01</td>
                    <td>10:00 AM</td>
                    <td>Group 1</td>
                    <td>Court 1</td>
                    <td className="text-end">
                      <button className="btn btn-primary me-2">Edit</button>
                      <button className="btn btn-dark me-2">Add scores</button>
                      <button className="btn btn-danger">Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
