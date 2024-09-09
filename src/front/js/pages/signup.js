import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, Link } from "react-router-dom";

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { store, actions } = useContext(Context);
    const navigate = useNavigate(); 

    function sendData(e) {
        e.preventDefault();
        console.log('send data');
        console.log(email, password);
        actions.signup(email, password);
        navigate("/");
    }

    return (
        <div className="bg-image  d-flex flex-column justify-content-center align-items-center min-vh-100">
            <div className="row w-100 justify-content-center">
                <div className="col-12 col-sm-8 col-md-6 col-lg-4">
                    <form onSubmit={sendData} className="p-5 rounded shadow-sm  bg-dark text-white">
                        <h2 className="mb-4 text-center">Create new account</h2>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail" className="form-label">Email address</label>
                            <input
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                className="form-control"
                                id="exampleInputEmail"
                                placeholder="Enter email"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputPassword" className="form-label">Password</label>
                            <input
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                className="form-control"
                                id="exampleInputPassword"
                                placeholder="Enter password"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-warning w-100">Signup</button>
                        <div className="mt-3 text-center">
                        <p className="text-center mt-3">or</p>
                        <Link to="/">
                            <button className="btn btn-info w-100">Login</button>
                        </Link>
                    </div>
                    </form>

                </div>
            </div>
        </div>
    );
}

export default Signup;