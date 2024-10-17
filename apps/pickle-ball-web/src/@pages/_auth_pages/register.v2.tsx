import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';

const UserRegistration = () => {
  const [userRequest, setUserRequest] = useState({
    user_email: '',
    user_phone: '',
    user_fname: '',
    user_lname: '',
    user_country: '',
    user_password: '',
  });
  const navigate = useNavigate();
  // Define the validation schema using Yup
  const validationSchema = Yup.object().shape({
    user_email: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    user_phone: Yup.string()
      .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
      .required('Phone number is required'),
    user_fname: Yup.string()
      .min(2, 'First name must be at least 2 characters')
      .required('First name is required'),
    user_lname: Yup.string()
      .min(2, 'Last name must be at least 2 characters')
      .required('Last name is required'),
    user_country: Yup.string().required('Country is required'),
    user_password: Yup.string()
      .min(8, 'Password must be at least 8 characters')
      .required('Password is required'),
  });

  const handleSubmit = (values: any) => {
    console.log('Form Data', values);
    registerUser(values);
    setUserRequest(values);
  };
  const registerUser = async (req_data : any) => {
    const response = await fetch(
      'https://acepicklapi.raganindustries.com/api_user_signin.php',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(req_data),
      }
    );
    const data = await response.json();
    if (data.status === 'STATUS OK') {
      console.log('Register Successful');
      navigate('/login');
    } else {
      alert(data.status + ' : ' + data.description);
    }
    console.log(data);
  };
  useEffect(() => {
    if(localStorage.getItem('isLoggedIn')){
      navigate('/ap/groups');
    }
    document.title = 'Login | ACEPickl';
    document.getElementsByTagName('body')[0].classList.add('loginLayout');

    // const popoverTriggerList = document.querySelectorAll(
    //   '[data-bs-toggle="popover"]'
    // );
    // for (let i = 0; i < popoverTriggerList.length; i++) {
    //   const popoverTriggerEl = popoverTriggerList[i];
    //   new bootstrap.Popover(popoverTriggerEl);
    // }

    return () => {
      document.getElementsByTagName('body')[0].classList.remove('loginLayout');
    };
  });
  return (
    <Formik
      initialValues={userRequest}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {() => (
        <div className="d-flex align-items-center py-4 bg-body-tertiary h-100 login-backdrop">
          <main className="form-signin w-100 m-auto bg-white rounded-4 position-relative">
            <Link
              className="btn-close"
              to={'/'}
              style={{
                width: '32px',
                height: '32px',
                textAlign: 'center',
                position: 'absolute',
                right: '10px',
                top: '10px',
                padding: '3px',
              }}
            ></Link>
            <Form>
              <img
                className="mb-4"
                src="./Logo-Green-Trans.png"
                alt="Ace Pickl Logo"
                width={180}
              />
              <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>
              <div className="row g-3">
              <div className="col-6 mb-0">
                <label>First Name:</label>
                <Field type="text" name="user_fname" className="form-control" />
                <ErrorMessage
                  name="user_fname"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="col-6 mb-0">
                <label>Last Name:</label>
                <Field type="text" name="user_lname" className="form-control" />
                <ErrorMessage
                  name="user_lname"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-0">
                <label>Email:</label>
                <Field
                  type="email"
                  name="user_email"
                  className="form-control"
                />
                <ErrorMessage
                  name="user_email"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-0">
                <label>Phone:</label>
                <Field type="text" name="user_phone" className="form-control" />
                <ErrorMessage
                  name="user_phone"
                  component="div"
                  className="text-danger"
                />
              </div>

             

            
              <div className="mb-0">
                <label>Password:</label>
                <Field
                  type="password"
                  name="user_password"
                  className="form-control"
                />
                <ErrorMessage
                  name="user_password"
                  component="div"
                  className="text-danger"
                />
              </div>
              <div className="mb-0">
                <label>Country:</label>
                <Field
                  as="select"
                  name="user_country"
                  className="form-select"
                >
                    <option value="">Select Country</option>
                    <option value="USA">USA</option>
                    <option value="Canada">Canada</option>
                    <option value="Mexico">Mexico</option>
                </Field>
                <ErrorMessage
                  name="user_country"
                  component="div"
                  className="text-danger"
                />
              </div>

              <div className="mb-3">
                <label>Rating:</label>
                <Field
                  type="text"
                  name="user_rating"
                  className="form-control"
                />
                    
                <ErrorMessage
                  name="user_rating"
                  component="div"
                  className="text-danger"
                />
              </div>

              <button type="submit" className='btn btn-primary mt-3'>Submit</button>
              </div>
            </Form>
          </main>
        </div>
      )}
    </Formik>
  );
};

export default UserRegistration;
