import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './../Stylesheets/Navbar.css'
import Badge from 'react-bootstrap/Badge'
import Modal from '../Model';
import Cart from '../screens/Cart';
import { useCart } from '../components/ContextReducer';

export default function Navbar() {

    const [cartView, setCartView] = useState(false);

    let data = useCart();

    const navigate = useNavigate();
    const handleLogout = () =>{
        localStorage.removeItem("authToken");
        navigate("/login")
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-nav">
                <div className="container-fluid">
                    <Link className="navbar-brand fs-1 fst-italic" to="/">YessFood</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        {/* me-auto makes it to occupy the entire available free space putting the login and signup buttons at the end */}
                        <ul className="navbar-nav me-auto mb-1">
                            <li className="nav-item">
                                <Link className="nav-link active fs-5" aria-current="page" to="/">Home</Link>
                            </li>

                            {(localStorage.getItem("authToken")) ?
                                <li className="nav-item">
                                    <Link className="nav-link active fs-5" aria-current="page" to="/">My Orders</Link>
                                </li>
                                : ""
                            }
                        </ul>
                        {/* we want MyOrders option to be displayed for the users logged in, we make use of the locally stored authtoken to check if they are registered users or not */}

                        <div className='d-flex'>
                            {(localStorage.getItem("authToken")) ?
                                <div className="d-flex">
                                    <div className="btn bg-white mx-1 inOut" onClick={()=>{setCartView(true)}}>
                                        My Cart {"   "}
                                        <Badge pill bg="dark">{data.length===0?"":data.length}</Badge>
                                    </div>
                                    {cartView? <Modal onClose={()=> setCartView(false)}> <Cart/> </Modal> : null}

                                    <div className="btn bg-white inOut mx-1" onClick={handleLogout}>Logout</div>
                                </div>
                                :
                                <div className="d-flex">
                                    <Link className="btn bg-white mx-1 inOut" to="/login">Login</Link>
                                    <Link className="btn bg-white inOut mx-1" to="/createuser">Sign Up</Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

