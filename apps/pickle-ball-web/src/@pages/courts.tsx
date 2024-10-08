import React, { useEffect, useRef } from 'react';
import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CreateCourtV2 } from '../@components/widgets/CreateCourtOffCanvas';
import * as bootstrap from 'bootstrap';
import { ViewIcon, EditIcon, AddPlayersIcon, ScheduleIcon, PlayersListsIcon, DeleteIcon, ViewImagesIcon, ProfileIcon, ImageIcon } from '../@components/_icons/menu_icons';
import Swal from 'sweetalert2';
import { ViewCourt } from '../@components/widgets/viewCourt';

export default function AceCourts() {
  const stepperRef = useRef(null);
  const [courtLists, setCourtLists] = React.useState([]);
  const [isAddCourt, setIsAddCourt] = React.useState(false);
  const [isViewCourt, setIsViewCourt] = React.useState(false);
  const [fnType, setFnType] = React.useState('Create');
  const [selectedCourt, setSelectedCourt] = React.useState(null);
  const navigate = useNavigate();
  const location = useLocation();

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
  const showFileUpload = (args: any) => {
    setSelectedCourt(args);
    const groupPhotoModal = new bootstrap.Modal(
      document.getElementById('courtPhotoModal') as HTMLElement
    );
    groupPhotoModal.show();
  }
  const uploadCourtImage = () => {
    const groupImage = document.getElementById('groupImage') as HTMLInputElement;
    const formData = new FormData();
    //formData.append('group_id', groupDetails.group_id);
    //formData.append('image_code', '1');
    formData.append('file', groupImage.files[0]);
    fetch(
      `https://acepicklapi.raganindustries.com/api_file_upload.php?image_parameter=${selectedCourt}&image_code=2`,
      {
        method: 'post',
        headers: {
          Authorization:
            'Bearer ' +
            JSON.parse(localStorage.getItem('user') as string).access_token,
        },
        body: formData,
      }
    )
      .then((res) => res.json())
      .then((response) => {
        if (response === 'ACCESS TOKEN ERROR') {
          console.log('Unauthorized');
          localStorage.clear();
          navigate('/login');
        } else if(response === 'STATUS OK'){
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Court image uploaded successfully',
          }).then((result) => {
            if (result.isConfirmed) {
              window.location.reload();
            }
          });
          console.log(response);
        }else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: response,
          })
        }

      })
      .catch((error) => {
        console.log(error);
      });
  }
const showCreateCourt = (type : string, courtId : any) => {
  if(type === 'Edit'){
    location.state = { court_id: courtId };
  }
  setIsAddCourt(true);
  setFnType(type);
}

const showViewCourt = (courtId : any) => {
  location.state = { court_id: courtId };
  setIsViewCourt(true);
}

  useEffect(() => {
    getCourtLists();

    const modalElement = document.getElementById('createCourtModal') as HTMLElement;
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', function (event) {
        setIsAddCourt(false);
      });
    }
    const modalViewElement = document.getElementById('courtViewModal') as HTMLElement;
    if (modalViewElement) {
      modalViewElement.addEventListener('hidden.bs.modal', function (event) {
        setIsViewCourt(false);
      });
    }

    if(isAddCourt){      
        const createGroupModal = new bootstrap.Modal(
          document.getElementById('createCourtModal') as HTMLElement
        );
        createGroupModal.show();      
    }

    if(isViewCourt){
      const viewCourtModal = new bootstrap.Modal(
        document.getElementById('courtViewModal') as HTMLElement
      );
      viewCourtModal.show();
    }

  }, [isAddCourt, isViewCourt]);

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-12 my-3">
            <div className="d-flex justify-content-between">
              <h4 className="text-start">Courts</h4>
              <button className="btn btn-dark"
                onClick={() => showCreateCourt('Create', null)}         
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
                      <div className="position-relative h-100">
                        <img
                          src="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
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
                          <button
                      className="btn btn-sm btn-secondary"
                      style={{
                        position: 'absolute',
                        bottom: '5px',
                        right: '5px',
                      }}
                      onClick={() => showFileUpload(court.court_id)}                      
                      title='Change Court Image'
                    >
                      <ImageIcon />
                    </button>
                      </div>
                    </div>
                    <div className="col-md-8">
                      <div className="card-body">
                        <h5 className="card-title">{court.court_name}</h5>
                        <p className="card-text d-none">{court.court_description}</p>
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
                        <div
                        className="dropdown"
                        style={{ position: 'absolute', bottom: '5px', right: '5px' }}
                      >
                        <button
                          className="btn btn-dark"
                          type="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"

                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            width={24}
                            height={24}
                            color={'currentColor'}
                            fill={'none'}
                          >
                            <path
                              d="M11.992 12H12.001"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9842 18H11.9932"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            <path
                              d="M11.9998 6H12.0088"
                              stroke="currentColor"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </button>
                        <ul className="dropdown-menu dropdown-menu-end">
                          <li>
                            <button
                              className="dropdown-item"
                              type="button"
                              title="View Court"
                              onClick={(e)=>showViewCourt(court.court_id)}
                              
                            >
                              <ViewIcon /> View Court
                            </button>
                          </li>
                          <li>
                            <button title='Edit Court' className="dropdown-item" type="button" onClick={(e)=>showCreateCourt('Edit', court.court_id)}>
                              <EditIcon /> Edit Court
                            </button>
                          </li>
                          
                          <li>
                            <button title="View Images"  className="dropdown-item">
                              <ViewImagesIcon />
                              View Images
                            </button>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <button
                              className="dropdown-item text-danger"
                              type="button"
                              title="Delete Court"
                              
                            >
                              <DeleteIcon />
                              Delete Court
                            </button>
                          </li>
                        </ul>
                      </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

     {isAddCourt && <CreateCourtV2 type={fnType}/>}
     {
      isViewCourt && <ViewCourt/>
     }

     <div
        className="modal fade"
        id="courtPhotoModal"
        tabIndex={-1}
        aria-labelledby="courtPhotoModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="courtPhotoModalLabel">
                Court Image Upload
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="groupImage" className="col-form-label">
                    Select image
                  </label>
                  <input type="file" className="form-control" id="groupImage" />
                </div>
                <div>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={uploadCourtImage}
                  >
                    Upload
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
