import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export const ViewCourt = (props : any) => {

    const location = useLocation();
    const [courtDetails, setCourtDetails] = useState<any>({
        court_photos: []
    });

    const getCourtById = async (id: number) => {
        fetch(`https://acepicklapi.raganindustries.com/api_get_court.php`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.access_token}`
            },
            body: JSON.stringify({
                court_id: id
            })
        }).then(response => response.json())
        .then(data => {
            console.log(data);
            setCourtDetails(data);
        }).catch((error) => {
            console.error('Error:', error);
        });

    }


    useEffect(() => {
        getCourtById(location.state.court_id);
    }, []);

    return (
        <div
        className="modal fade"
        id="courtViewModal"
        tabIndex={-1}
        aria-labelledby="courtViewModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="courtViewModalLabel">
                View Court Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
                <div className="mb-0">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            {
                                courtDetails.court_photos.map((photo: any, index: number) => (
                                    <div className={`carousel-item ${index === 0 ? 'active' : ''}`} key={index}>
                                        <img
                                        src={`https://acepicklapi.raganindustries.com${photo}`}
                                        className="d-block w-100"
                                        alt={`Slide ${index + 1}`}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.onerror = null;
                                            target.src =
                                              'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png';
                                          }}
                                        />
                                    </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>

                <table className="table table-striped table-bordered">
                    <tbody>
                        <tr>
                            <td>
                                <h4>Court Name</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_name}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Description</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_description}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Indoor Count</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_indoor_count}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Outdoor Count</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_outdoor_count}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Address</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_address}</h4>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <h4>Court Notes</h4>
                            </td>
                            <td>
                                <h4>{courtDetails.court_note}</h4>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    );
}