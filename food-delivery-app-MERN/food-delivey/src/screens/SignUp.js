import React, { useState } from 'react'
import 'font-awesome/css/font-awesome.min.css';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';

export default function SignUp() {

    const [credentials, setcredentials] = useState({ name: "", email: "", password: "", geolocation: "" })
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/createuser", {
            // fetch backend ka and then send it the user details to be pushed into the database
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({name:credentials.name, email:credentials.email, password:credentials.password, location:credentials.password})
            // the keys must be same as what was defined in the backend
        })
        // now storing the response obtained from the above request sent to backend
        const json = await response.json();
        console.log(json);

        if(!json.success){
            alert("Enter valid credentials")
        }

    }

    const onChange=(event) => {
        setcredentials({...credentials,[event.target.name]:event.target.value})
    }

    return (
        <div>
            <section className="vh-60 m-5" style={{ "backgroundColor": "#222222" }}>
                <div className="container h-50">
                    <div className="row d-flex justify-content-center align-items-center h-80">
                        <div className="col-lg-12 col-xl-11">
                            <div className="card text-black" style={{ "borderRadius": "25px", "backgroundColor": "#ff6d4d" }}>
                                <div className="card-body p-md-2">
                                <p className="text-center fw-bold fs-1 fst-italic text-white"  >YessFood</p>

                                    <div className="row justify-content-center">
                                        <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                                            <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-2">Sign up</p>

                                            <form className="mx-1 mx-4 md-2" onSubmit={handleSubmit}>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fa fa-user fa-2x me-2  mt-4 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 mt-3">
                                                        {/* <label className="form-label" for="form3Example1c">Your Name</label> */}
                                                        <input type="text"
                                                            id="form3Example1c"
                                                            className="form-control"
                                                            placeholder='Your name'
                                                            style={{ "backgroundColor": "white","color":"black"  }}
                                                            name='name'  //must be same as whats defined in the useState variable list
                                                            value={credentials.name}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fa fa-envelope fa-2x me-2  mt-4 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 mt-3">
                                                        {/* <label className="form-label" for="form3Example3c">Your Email</label> */}
                                                        <input 
                                                            type="email" 
                                                            id="form3Example3c" 
                                                            className="form-control" 
                                                            placeholder='Your Email' 
                                                            style={{ "backgroundColor": "white","color":"black"  }} 
                                                            name='email'
                                                            value={credentials.email}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fa fa-map-marker fa-2x me-2  mt-4 fa-fw"></i>
                                                    <div className="form-outline flex-fill mb-0 mt-3">
                                                        {/* <label className="form-label" for="form3Example1c">Your Name</label> */}
                                                        <input type="text"
                                                            id="form3Example2c"
                                                            className="form-control"
                                                            placeholder='Your address'
                                                            style={{ "backgroundColor": "white","color":"black"  }}
                                                            name='geolocation'
                                                            value={credentials.geolocation}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-2">
                                                    <i className="fa fa-lock fa-2x me-2 fa-fw "></i>
                                                    <div className="form-outline flex-fill mb-4 mt-3">
                                                        {/* <label className="form-label" for="form3Example4c">Password</label> */}
                                                        <input 
                                                            type="password" 
                                                            id="form3Example4c" 
                                                            className="form-control" 
                                                            placeholder='Password' 
                                                            style={{ "backgroundColor": "white","color":"black"  }}
                                                            name='password'
                                                            value={credentials.password}
                                                            onChange={onChange}
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <button type="submit" className="btn btn-lg" style={{ "backgroundColor": "black" }} >Register</button>
                                                </div>
                                                <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                                                    <Link to="/login" className='m-2 btn btn-info'>Already a User?</Link>
                                                </div>
                                            </form>

                                        </div>
                                        <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                                            <img src="https://img.freepik.com/premium-vector/customer-shopping-online-smartphone-mobile-supermarket-online-department-store-new-normal-lifestyle-shopping_40876-1837.jpg"
                                                className="img-fluid rounded" alt="Sample image" />

                                        </div>
                                    </div>
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
