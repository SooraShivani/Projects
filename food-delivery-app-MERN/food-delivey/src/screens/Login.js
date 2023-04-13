import React, { useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../components/Footer';
import { Link, useNavigate } from 'react-router-dom';
import '../Stylesheets/Login.css'

export default function Login() {

  const [credentials, setcredentials] = useState({ email: "", password: "" })
  let navigate = useNavigate()  //to navigate to the home page is login credentials is correct

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      // fetch backend ka and then send it the user details to be pushed into the database
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
      // the keys must be same as what was defined in the backend
    })
    // now storing the response obtained from the above request sent to backend
    const json = await response.json();
    console.log(json);

    if (!json.success) {
      alert("Enter valid credentials");
    }

    if (json.success) {
      navigate('/');
    }

  }

  const onChange = (event) => {
    setcredentials({ ...credentials, [event.target.name]: event.target.value })
  }

  return (
    <div>
      <section className="vh-60 m-5" style={{ "backgroundColor": "#222222" }}>
                <div className="container h-50">
                    <div className="row d-flex justify-content-center align-items-center h-80">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px", "backgroundColor": "#ff6d4d" }}>
                                <div className="card-body p-md-4">
                                <p className="text-center fw-bold fs-1 fst-italic text-white mt-3"  >YessFood</p>
                                <section className="vh-70">
                                    <div className="container-fluid h-custom">
                                      <div className="row d-flex justify-content-center align-items-center h-100">
                                        <div className="col-md-9 col-lg-6 col-xl-5">
                                          <img src="https://img.freepik.com/free-vector/delivery-staff-ride-motorcycles-shopping-concept_1150-34879.jpg"
                                            className="img-fluid rounded" alt="Sample image" />
                                        </div>
                                        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                                          <form onSubmit={handleSubmit}>
                                            <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start other-links">
                                              <p className="lead fw-normal mb-0 me-3">Sign in with</p>
                                              <button type="button" className="btn btn-primary btn-floating mx-1 bg-info">
                                                <i className="fa fa-facebook-f"></i>
                                              </button>

                                              <button type="button" className="btn btn-primary btn-floating mx-1 bg-info">
                                                <i className="fa fa-twitter"></i>
                                              </button>

                                              <button type="button" className="btn btn-primary btn-floating mx-1 bg-info">
                                                <i className="fa fa-google"></i>
                                              </button>
                                            </div>

                                            <div className="divider d-flex align-items-center my-4">
                                              <p className="text-center fw-bold mx-3 mb-0">Or</p>
                                            </div>

                                            {/* <!-- Email input --> */}
                                            <div className="form-outline mb-4">
                                              <input 
                                                type="email" 
                                                id="form3Example3" 
                                                className="form-control form-control-lg"
                                                placeholder="Enter a valid email address" 
                                                name='email'  //must be same as whats defined in the useState variable list
                                                value={credentials.email}
                                                onChange={onChange}
                                              />
                                              {/* <label className="form-label" htmlFor="form3Example3">Email address</label> */}
                                            </div>

                                            {/* <!-- Password input --> */}
                                            <div className="form-outline mb-3">
                                              <input 
                                                type="password" 
                                                id="form3Example4" 
                                                className="form-control form-control-lg"
                                                placeholder="Enter password" 
                                                name='password'
                                                value={credentials.password}
                                                onChange={onChange}
                                              />
                                              {/* <label className="form-label" htmlFor="form3Example4">Password</label> */}
                                            </div>

                                            <div className="d-flex justify-content-between align-items-center">
                                              {/* <!-- Checkbox --> */}
                                              <div className="form-check mb-0">
                                                <input className="form-check-input me-2 bg-info text-black" type="checkbox" value="" id="form2Example3" />
                                                <label className="form-check-label" htmlFor="form2Example3">
                                                  Remember me
                                                </label>
                                              </div>
                                            </div>

                                            <div className="text-center text-lg-start mt-4 pt-2 mb-4">
                                              <button type="submit" className="btn btn-primary btn-lg"
                                                style={{"paddingLeft": "2.5rem", "paddingRight": "2.5rem",'backgroundColor':"black"}}>Login</button>
                                              <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account? <Link to="/createuser"
                                                className="link-danger text-white">Register</Link></p>
                                            </div>

                                          </form>
                                        </div>
                                      </div>
                                    </div>
                                    
                                  </section>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div><Footer /></div>





      
    </div>
  )
}
