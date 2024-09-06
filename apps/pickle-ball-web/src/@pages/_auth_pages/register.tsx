import { Link } from "react-router-dom";
import { countries } from "../../@helpers/constant_data";
import { useEffect } from "react";

export function Register() {
    useEffect(() => {
        document.title = "Login | ACEPickl";
        document.getElementsByTagName("body")[0].classList.add("loginLayout");

        return () => {
            document.getElementsByTagName("body")[0].classList.remove("loginLayout");
        }
    });
    return (
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
            padding: '3px'
          }}
        >
         
        </Link>
          <form action="#">
            <img
              className="mb-4"
              src="./Logo-Green-Trans.png"
              alt="Ace Pickl Logo"
              width={180}
            />
            <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>

            <div className="row g-3">
                <div className="col-6">
                    <label htmlFor="inputFirst" className="form-label">First name</label>
                    <input type="text" className="form-control" id="inputFirst"/>
                </div>
                <div className="col-6">
                    <label htmlFor="inputLast" className="form-label">Last name</label>
                    <input type="text" className="form-control" id="inputLast"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">E-mail address</label>
                    <input type="email" className="form-control" id="inputEmail"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">Phone number</label>
                    <input type="phone" className="form-control" id="inputPhone"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputRepeatPassword" className="form-label">Repeat password</label>
                    <input type="password" className="form-control" id="inputRepeatPassword"/>
                </div>
                <div className="col-12">
                    <label htmlFor="inputLast" className="form-label">Country of residents</label>
                    <select className="form-select" id="inputCountry">
                        <option selected>Choose...</option>
                        {
                            countries.map((country, index) => 
                                <option key={index} value={country.code}>{country.name}</option>
                            )                            
                        }
                    </select>
                </div>
            </div>
            
            <button className="btn btn-dark w-100 py-2 mt-2" type="submit">
              Register
            </button>
            <p className="mt-2 mb-3 text-body-secondary text-center">
                If you already have an account, please 
                <Link to={'/login'} className="ms-1">login</Link>
            </p>
            

          </form>
        </main>
    </div>
    )
}