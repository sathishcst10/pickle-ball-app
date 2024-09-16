export function Schedule() {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <h4 className="text-start">Schedule</h4>
                    
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
                            <tr>
                                <td>Game 1</td>
                                <td>2021-10-01</td>
                                <td>10:00 AM</td>
                                <td>Group 1</td>
                                <td>Court 1</td>
                                <td>
                                    <button className="btn btn-primary me-2">Edit</button>
                                    <button className="btn btn-dark me-2">Add scores</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Game 2</td>
                                <td>2021-10-01</td>
                                <td>11:00 AM</td>
                                <td>Group 2</td>
                                <td>Court 2</td>
                                <td>
                                    <button className="btn btn-primary me-2">Edit</button>
                                    <button className="btn btn-dark me-2">Add scores</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                            <tr>
                                <td>Game 3</td>
                                <td>2021-10-01</td>
                                <td>12:00 PM</td>
                                <td>Group 3</td>
                                <td>Court 3</td>
                                <td>
                                    <button className="btn btn-primary me-2">Edit</button>
                                    <button className="btn btn-dark me-2">Add scores</button>
                                    <button className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>        
            </div>            
        </div>
    )
}