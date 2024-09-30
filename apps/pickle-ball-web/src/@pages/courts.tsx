import React, { useEffect, useRef } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { CreateCourtV2 } from '../@components/widgets/CreateCourtOffCanvas';

export default function AceCourts() {
  const stepperRef = useRef(null);
  const [courtLists, setCourtLists] = React.useState([]);
  const navigate = useNavigate();

  const getCourtLists = () => {
    fetch('https://acepicklapi.raganindustries.com/api_select_all_courts.php', {
      method: 'get',
      headers: {
        Authorization:
          'Bearer ' +
          JSON.parse(localStorage.getItem('user') as string).access_token,
      },
    })
      .then((res) => {
        if (res.status === 401) {
          console.log('Unauthorized');
        }
        return res.json();
      })
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else {
          setCourtLists(response);
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    getCourtLists();
  }, []);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-3">
            <div className="d-flex justify-content-between">
              <h4 className="text-start">Courts</h4>
              <button className="btn btn-dark"
                 data-bs-toggle="modal"
                 data-bs-target='#createCourtModal'                 
              >Create Court</button>
            </div>
          </div>
        </div>

        <div className="row">
          {courtLists.map((court: any, index: number) => {
            return (
              <div className="col-3" key={index}>
                <div className="card mb-3">
                  <div className="row g-0">
                    <div className="col-md-4">
                      <img
                        src="..."
                        className="img-fluid h-100"
                        alt="..."
                        style={{ backgroundColor: '#d1d5db' }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src =
                            'https://fisnikde.com/wp-content/uploads/2019/01/broken-image.png';
                        }}
                      />
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{court.court_name}</h5>
                        <p className="card-text">{court.court_description}</p>
                        <div>
                          <span className="badge bg-secondary me-1">
                            Indoor : {court.court_indoor_count}
                          </span>
                          <span className="badge bg-secondary me-1">
                            Outdoor : {court.court_outdoor_count}
                          </span>
                          <span className="badge bg-secondary me-1">
                            Nets : {court.court_net_count}
                          </span>
                        </div>
                        <p className="card-text">
                          <small className="text-body-secondary">
                            Note : {court.court_note}
                          </small>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <CreateCourtV2 />
    </>
  );
}
