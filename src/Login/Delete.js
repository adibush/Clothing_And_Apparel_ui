import React, { useContext, useState } from "react";
import classes from './Delete.module.css'
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthProvider";
import { deleteAllFromUser } from "../services/api";

function Delete() {
    const authContext = useContext(AuthContext);
    const { setAuth } = useContext(AuthContext);

    const [success, setSuccess] = useState(false);

    const deleteUser = () => {
        deleteAllFromUser({ "Authorization": "Bearer " + authContext["auth"] })
        setAuth(0)
        setSuccess(true)
    }




    return (
        <div>
            {success ? (
                <section>
                    <h1>your account delete successfull!</h1>
                    <br />
                    <p>
                        <Link className={classes.link_to_home} to={"/"}>Go to Home</Link>
                    </p>
                </section>
            ) : (


                <div className={classes.container}>
                    <h2>Are you sure you want to delete your account?</h2>


                    <button onClick={deleteUser} className={classes.delete_button}>Delete</button>
                    <br /><br />






                </div>
            )}
        </div>


    )
}
export default Delete