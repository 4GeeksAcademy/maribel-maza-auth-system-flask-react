import React, { useState,useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import Login from "./login";
import "../../styles/home.css";
import { Navigate } from "react-router-dom";

export const Home = () => {

    const { store, actions } = useContext(Context);
    const [loading, setLoading] = useState(true);
    const [mounted, setMounted] = useState(true); 
    useEffect(() => {
        const verifyToken = async () => {
            await actions.verifyToken();
            if (mounted) {
                setLoading(false);
            }
        };
        if (loading) {
            verifyToken();
        }

        return () => {
            setMounted(false);
        };
    }, [loading, actions, mounted]);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (store.auth) {
        return <Navigate to="/private" />;
    }
	return (
        <div className="">
            <Login />
        </div>
	);
};
