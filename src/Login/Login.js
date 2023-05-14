import React, { useContext, useEffect, useRef, useState } from "react";
import classes from './Login.module.css'
import { Link } from "react-router-dom";
import { authenticate } from "../services/api";
import AuthContext from "../context/AuthProvider";



function Login() {

    const { setAuth } = useContext(AuthContext);

    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const [errMsg, setErrMsg] = useState("");
    const [success, setSuccess] = useState(false);

    const inputRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg("");
    }, [userName, password]);

    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    }


    const loginHandler = async (event) => {
        event.preventDefault();

        try {
            const userBody = {
                username: userName,
                password: password,
            };
            const response = await authenticate(userBody);
            setSuccess(true);
            setAuth(response.data.jwt)
            setUserName("");
            setPassword("");

        } catch (err) {
            if (!err.response) {
                setErrMsg("No Server Response");
            } else if (err.response.status === 403) {
                setErrMsg("Incorrect Username Or Password");
            } else {
                setErrMsg("Authentication Failed");
            }
            errRef.current.focus();
        }




    }


    return (

        <div>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                    <br />
                    <p>
                        <Link className={classes.link_to_home} to={"/"}>Go to Home</Link>
                    </p>
                </section>
            ) : (
                <form onSubmit={loginHandler}>
                    <h1 className={classes.h1}>Clothing & Apparel</h1>
                    <div className={classes.login}>
                        <p ref={errRef} className={errMsg ? classes.error_mes : "offscreen"}>{errMsg}</p>
                        <h2 className={classes.h2}>Login</h2>
                        <input className={classes.login_input} ref={inputRef} type="text" value={userName} onChange={userNameChangeHandler} placeholder="User name" required />
                        <input className={classes.login_input} type="password" value={password} onChange={passwordChangeHandler} placeholder="Password" required />
                        <br />

                        <div className={classes.login_button}>
                            <button type="submit" >Login </button>
                            <div className={classes.sign_up_button}>
                                <Link to="/signUp"> <button >Sign up</button> </Link>
                            </div>

                        </div>

                    </div>
                </form>
            )}
        </div>

    )
}

export default Login 