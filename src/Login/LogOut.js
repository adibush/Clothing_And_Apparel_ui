import React, { useContext } from "react";
import classes from './LogOut.module.css'
import AuthContext from "../context/AuthProvider";
import { Link } from "react-router-dom";

function LogOut() {

    const { setAuth } = useContext(AuthContext);


    const logOutUser = () => {
        setAuth(0)
    }




    return (
        <div className={classes.container}>
            <h2>Are you sure you want to log out?</h2>


            <Link to="/">  <button onClick={logOutUser} className={classes.logout_button}>log out</button> </Link>
            <br /><br />

            <Link to="/delete" className={classes.delete} >  delete account </Link>





        </div>
    )
}

export default LogOut;