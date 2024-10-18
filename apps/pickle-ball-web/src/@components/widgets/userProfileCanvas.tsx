import { useState } from "react";
import Swal from "sweetalert2";
import * as bootstrap from 'bootstrap';

export const UserProfileCanvas = () => {

  const {
    user_email,
    user_fname,
    user_lname,
    user_phone,
    user_dob,
    user_age,
    user_address,    
  } = JSON.parse(localStorage.getItem('user') || '{}');

  const [userProfile, setUserProfile] = useState({
    user_email : user_email,
    user_fname : user_fname,
    user_lname : user_lname,
    user_phone : user_phone,
    user_dob : user_dob,
    user_age : user_age,
    user_address : user_address,
    map_location : '',
    user_rating : '',
    user_country : '',
  })
  const showFileUpdload = (args: any) => {
    //setSelectedGroup(args);
    const userPhotoModal = new bootstrap.Modal(
      document.getElementById('profileImageModal') as HTMLElement
    );
    userPhotoModal.show();
  }
  const updateProfile = (event : any) => {
    event.preventDefault();
    fetch('https://acepicklapi.raganindustries.com/api_user_update_profile.php', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${JSON.parse(localStorage.getItem('user')!)?.access_token}`
      },
      body: JSON.stringify(userProfile)
    }).then(response => response.json())
    .then(data => {
        console.log(data);
        if(data === "STATUS OK") {
          Swal.fire({
            icon: 'success',
            title: 'SUCCESS',
            text: 'Profile updated successfully',
          });
        }else{
          //alert(data.status +" : "+ data.description);
          Swal.fire({
            icon: 'error',
            title: 'ERROR',
            text: data,
          });
        }
    }).catch((error) => {
        console.error('Error:', error);
    });
  }

  const uploadGroupImage = (e:any) => {
    e.preventDefault();
    const profileImage = document.getElementById('profileImage') as HTMLInputElement;
    const formData = new FormData();
    //formData.append('group_id', groupDetails.group_id);
    //formData.append('image_code', '1');
    formData.append('file', profileImage.files[0]);
    fetch(
      `https://acepicklapi.raganindustries.com/api_file_upload.php?image_parameter=${''}&image_code=0`,
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
            text: 'Group image uploaded successfully',
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

  return (
    <>
    <div
      className="offcanvas offcanvas-end"
      tabIndex={-1}
      id="userProfileCanvas"
      data-bs-backdrop="static"
      aria-labelledby="userProfileCanvasLabel"
      style={{ width: '520px' }}
    >
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="userProfileCanvasLabel">
          User Profile
        </h5>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        ></button>
      </div>
      <div className="offcanvas-body">
      <div className="d-flex text-center">
        <div className="profileWrap">
            <img src="" alt="profile"
              className="rounded-4"    
              width={72}
              height={72}
              onClick={(e)=>showFileUpdload(e)}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.onerror = null;
                target.src =
                  'user_avatar.png';
              }}
            />
        </div>
            
          </div>
        <form className="row g-3 mt-3" onSubmit={(e)=>updateProfile(e)}>         
          <div className="col-md-6">
            <label htmlFor="inputFirstName" className="form-label">
              First Name
            </label>
            <input type="text" className="form-control" id="inputFirstName" value={userProfile.user_fname ?? ''} 
              onChange={(e)=>setUserProfile({...userProfile, user_fname : e.target.value})}/>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputLastName" className="form-label">
              Last Name
            </label>
            <input type="text" className="form-control" id="inputLastName" value={userProfile.user_lname || ''}
              onChange={(e)=>setUserProfile({...userProfile, user_lname : e.target.value})}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input type="email" className="form-control" id="inputEmail" value={userProfile.user_email || ''}
              onChange={(e)=>setUserProfile({...userProfile, user_email : e.target.value})}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputPhone" className="form-label">
              Phone
            </label>
            <input type="text" className="form-control" id="inputPhone" value={userProfile.user_phone || ''}
              onChange={(e)=>setUserProfile({...userProfile, user_phone : e.target.value})}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="selectCountry" className="form-label">
              Country
            </label>
            <select id="selectCountry" className="form-select" value={userProfile.user_country} 
              onChange={(e)=>setUserProfile({...userProfile, user_country : e.target.value})}
            >
              <option value={''}>Choose...</option>
              <option>United States</option>
            </select>
          </div>
          <div className="col-md-6">
            <label htmlFor="inputRating" className="form-label">
              Player rating
            </label>
            <input type="text" className="form-control" id="inputRating" value={userProfile.user_rating}
              onChange={(e)=>setUserProfile({...userProfile, user_rating : e.target.value})}
            />
          </div>
          <hr />
          <div className="col-md-6">
            <label htmlFor="inputDOB" className="form-label">
              Date of Birth
            </label>
            <input type="date" className="form-control" id="inputDOB" value={userProfile.user_dob || ''} 
              onChange={(e)=>setUserProfile({...userProfile, user_dob : e.target.value})}
            />
          </div>
          <div className="col-md-6">
            <label htmlFor="inputAge" className="form-label">
              Age<small>(Optional)</small>
            </label>
            <input type="number" className="form-control" id="inputAge" value={userProfile.user_age || ''}
              onChange={(e)=>setUserProfile({...userProfile, user_age : e.target.value})}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputAddress" className="form-label">
              Address
            </label>
            <input type="text" className="form-control" id="inputAddress" value={userProfile.user_address || ''}
              onChange={(e)=>setUserProfile({...userProfile, user_address : e.target.value})}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="inputLocation" className="form-label">
              Map location
            </label>
            <input type="text" className="form-control" id="inputLocation" value={userProfile.map_location}
              onChange={(e)=>setUserProfile({...userProfile, map_location : e.target.value})}
            />
          </div>

          <div className="col-12 text-center">
            <button type="submit" className="btn btn-primary">
              Update profile
            </button>
          </div>
        </form>
      </div>
    </div>
              
    <div className="modal fade" id="profileImageModal" tabIndex={-1} aria-labelledby="profileImageModalLabel" aria-hidden="true">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="profileImageModalLabel">Modal title</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form action="" onSubmit={(e)=>uploadGroupImage(e)}>
              <div className="mb-3">
                <label htmlFor="profileImage" className="form-label">Select image</label>
                <input type="file" className="form-control" id="profileImage" />
              </div>
              <div>
                <button type="submit" className="btn btn-primary">Upload</button>
              </div>
            </form>
          </div>          
        </div>
      </div>
    </div>
    </>
  );
};
