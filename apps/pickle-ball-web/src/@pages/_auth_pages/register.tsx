import { Link } from "react-router-dom";
import { countries } from "../../@helpers/constant_data";
import { useEffect, useState } from "react";

export function Register() {
    const [password, setPassword] = useState("");
    const [userRequest, setUserRequest] = useState({
        "user_email" : "",
        "user_phone" : "",
        "user_name" : "",
        "user_password" : ""
    })

    const registerUser = async () => {
        const response = await fetch('https://acepicklapi.raganindustries.com/api_user_signin.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userRequest)
        });
        const data = await response.json();
        if(data.status === "STATUS OK") {
            console.log("Register Successful");
            window.location.href = '/login';
        }else{
          alert(data.status +" : "+ data.description);
        }
        console.log(data);        
    }

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
          <form  onSubmit={(e)=>{e.preventDefault(); registerUser()}}>
            <img
              className="mb-4"
              src="./Logo-Green-Trans.png"
              alt="Ace Pickl Logo"
              width={180}
            />
            <h1 className="h3 mb-3 fw-bold">Welcome to ACEPickl</h1>

            <div className="row g-3">
                <div className="col-12">
                    <label htmlFor="inputFirst" className="form-label">Full name</label>
                    <input type="text" className="form-control" id="inputFirst" value={ userRequest.user_name }
                    onChange={(e) => setUserRequest({...userRequest, user_name: e.target.value})}
                    onBlur={(e) => e.target.value === "" ? e.target.classList.add('is-invalid') : e.target.classList.remove('is-invalid')}
                    />
                </div>
               
                <div className="col-12">
                    <label htmlFor="inputEmail" className="form-label">E-mail address</label>
                    <input type="email" className="form-control" id="inputEmail" 
                    value={ userRequest.user_email }
                    onChange={(e) => setUserRequest({...userRequest, user_email: e.target.value})}
                    onBlur={(e) => (e.target.value === "" || !e.target.value.includes('@')) ? e.target.classList.add('is-invalid') : e.target.classList.remove('is-invalid')}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPhone" className="form-label">Phone number</label>
                    <input type="phone" className="form-control" id="inputPhone"
                    value={ userRequest.user_phone }
                    onChange={(e) => setUserRequest({...userRequest, user_phone: e.target.value})}
                    onBlur={(e) => e.target.value === "" ? e.target.classList.add('is-invalid') : e.target.classList.remove('is-invalid')}   
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputPassword" className="form-label">Password</label>
                    <input type="password" className="form-control" id="inputPassword"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onBlur={(e) => e.target.value === ""  ? e.target.classList.add('is-invalid') : e.target.classList.remove('is-invalid')}
                    />
                </div>
                <div className="col-12">
                    <label htmlFor="inputRepeatPassword" className="form-label">Repeat password</label>
                    <input type="password" className="form-control" id="inputRepeatPassword"
                        value={ userRequest.user_password }
                        onChange={(e) => setUserRequest({...userRequest, user_password: e.target.value})}
                        onBlur={(e) => e.target.value === "" ? e.target.classList.add('is-invalid') : e.target.classList.remove('is-invalid')}
                    />
                    {
                        userRequest.user_password !== password ?
                        <div className="text-danger" >
                            Passwords do not match.
                        </div>
                        :
                        <div className="text-success" >
                            Passwords match.
                        </div>
                    }
                </div>
                <div className="col-12">
                    <label htmlFor="inputLast" className="form-label">Country of residents</label>
                    <select className="form-select" id="inputCountry">
                        <option value={''}>Choose...</option>
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