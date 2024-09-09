import React, {useContext} from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
	
	const { store, actions } = useContext(Context);

	return (
		// <nav className="navbar navbar-light bg-light">
		// 	<div className="container">
		// 		<Link to="/">
		// 			<span className="navbar-brand mb-0 h1">React Boilerplate</span>
		// 		</Link>
		// 		<div className="ml-auto">
		// 			<Link to="/demo">
		// 				<button className="btn btn-primary">Check the Context in action</button>
		// 			</Link>
		// 		</div>
		// 	</div>
		// </nav>
		<nav className="navbar navbar-expand-lg bg-dark text-white">
			<div className="container-fluid">
    			<a className="navbar-brand" href="#"> <img src="https://i.imgur.com/YhauhRo.png" alt="Logo Star Wars" width="50px" style={{ marginLeft: '20px' }} /></a>
				<div className="ml-auto">	
				{store.auth == true ? <button onClick={() => actions.logout()} 
					className="btn btn-danger">Logout</button> : null}
				</div>
    		</div>		
		</nav>
	);
};
