import { Formik } from 'formik';
import * as Yup from 'yup';
import './auth.style.css';
import { Link } from 'react-router-dom';
// Creating schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required('Email is a required field')
    .email('Invalid email format'),
  password: Yup.string()
    .required('Password is a required field')
    .min(8, 'Password must be at least 8 characters'),
});

function BasicLogin() {
  return (
    <>
      {/* Wrapping form inside formik tag and passing our schema to validationSchema prop */}
      <Formik
        validationSchema={schema}
        initialValues={{ email: '', password: '' }}
        onSubmit={(values) => {
          // Alert the input values of the form that we filled
          alert(JSON.stringify(values));
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
        }) => (
          <div className="d-flex align-items-center py-4 bg-body-tertiary h-100 login-backdrop">
            <main className="form-signin w-100 m-auto bg-white rounded-4 position-relative">
              <Link
                className="btn-close"
                to={'/landing'}
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
              {/* Passing handleSubmit parameter tohtml form onSubmit property */}
              <form noValidate onSubmit={handleSubmit}>
                <img
                  className="mb-4"
                  src="./Logo-Green-Trans.png"
                  alt="Ace Pickl Logo"
                  width={180}
                />
                <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>
                <div className="mb-3">
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="userType"
                      id="userTYpe2"
                      value="admin"
                      checked
                    />
                    <label className="form-check-label" htmlFor="userType2">
                      Admin
                    </label>
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="userType"
                      id="userTYpe1"
                      value="player"
                    />
                    <label className="form-check-label" htmlFor="userType1">
                      Player
                    </label>
                  </div>
                </div>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                  placeholder="Enter email id / phone number"
                  className="form-control inp_text"
                  id="email"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.email && touched.email && errors.email}
                </p>
                {/* Our input html with passing formik parameters like handleChange, values, handleBlur to input properties */}
                <input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                  placeholder="Enter password"
                  className="form-control"
                />
                {/* If validation is not passed show errors */}
                <p className="error">
                  {errors.password && touched.password && errors.password}
                </p>
                {/* Click on submit button to submit the form */}
                <button type="submit">Login</button>
              </form>
            </main>
          </div>
        )}
      </Formik>
    </>
  );
}

export default BasicLogin;
