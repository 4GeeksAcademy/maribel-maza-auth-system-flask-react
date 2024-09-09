import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { Navigate, Link } from "react-router-dom";
import { Context } from "../store/appContext";


export const Private = () => {
	const { store, actions } = useContext(Context);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            actions.verifyToken(); 
        }
        setLoading(false);
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!store.auth) {
        return <Navigate to="/" />;
    }

	return (
		<div className="bg-secondary text-white d-flex flex-column justify-content-center align-items-center gap-3 p-4 ">
			<div className="form-container m-3">
				<h2 className="m-3">Welcome back {store.email} 😊</h2>
	       		 <div className="container d-flex flex-column justify-content-center align-items-center">
					<br></br>
					<div className="m-5" >
                		<img src="https://i.imgur.com/YyGmIvV.jpeg" class="img-fluid" alt="Star Wars"/>
  					</div>
	    		</div>	
        	</div>
		</div>
	);
};

Private.propTypes = {
	match: PropTypes.object
};