import React, { useRef, useEffect, useState } from "react";
import classes from './SignUp.module.css'
import { createNewRegisteredUser } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const USER_NAME_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{4,24}$/;
const PASSWORD_REGEX = /^(?=.*[A-z])(?=.*[0-9]).{8,24}$/;

function SignUp() {

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [userName, setUserName] = useState('');
    const [validUserName, setValidUserName] = useState(false);
    const [UserNameFocus, setUserNameFocus] = useState(false);
    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState('');
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);


    const inputRef = useRef();
    const errRef = useRef();

    useEffect(() => {
        setErrMsg('');
    }, [userName, password])


    useEffect(() => {

        inputRef.current.focus();

    }, [])

    useEffect(() => {
        setValidUserName(USER_NAME_REGEX.test(userName));
    }, [userName])

    useEffect(() => {
        setValidPassword(PASSWORD_REGEX.test(password))
    }, [password])



    const firstNameChangeHandler = (event) => {
        setFirstName(event.target.value);
    };
    const lastNameChangeHandler = (event) => {
        setLastName(event.target.value);
    }
    const userNameChangeHandler = (event) => {
        setUserName(event.target.value);
    }
    const passwordChangeHandler = (event) => {
        setPassword(event.target.value);
    }
    const emailChangeHandler = (event) => {
        setEmail(event.target.value);
    }
    const phoneNumberChangeHandler = (event) => {
        setPhoneNumber(event.target.value);
    }
    const addressChangeHandler = (event) => {
        setAddress(event.target.value);
    }


    const OnSubmitHandler = async (event) => {
        event.preventDefault();

        const v1 = USER_NAME_REGEX.test(userName);
        const v2 = PASSWORD_REGEX.test(password);
        if (!v1 || !v2) {
            setErrMsg("Invalid Entry");
            return;
        }
        try {
            const registeredUser = {
                first_name: firstName,
                last_name: lastName,
                user_name: userName,
                password: password,
                email: email,
                phone: phoneNumber,
                address: address
            }

            const respone = await createNewRegisteredUser(registeredUser);
            setSuccess(true)

            setFirstName("")
            setLastName("")
            setEmail("")
            setUserName("")
            setPassword("")
            setAddress("")
            setPhoneNumber("")
        } catch (err) {
            if (!err.response) {
                setErrMsg('No Server Response');
            } else if (err.response.status === 400) {
                setErrMsg('Username Taken');
            } else {
                setErrMsg('Registration Failed')
            }
            errRef.current.focus();
        }
    }


    return (
        <div>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <Link className={classes.login_link} to={"/login"}>Login</Link>
                    </p>
                </section>
            ) : (

                <div>
                    <h1 className={classes.h1}>Clothing & Apparel</h1>
                    <form onSubmit={OnSubmitHandler}>
                        <div className={classes.signup}>
                            <h2 className={classes.h2}>Sign Up</h2>
                            <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>{errMsg}</p>

                            <input ref={inputRef} type="text" value={firstName} onChange={firstNameChangeHandler} placeholder="First Name" required />

                            <input type="text" value={lastName} onChange={lastNameChangeHandler} placeholder="Last Name" required />

                            <input onFocus={() => { setUserNameFocus(true) }} onBlur={() => { setUserNameFocus(false) }} className={validUserName || !userName ? classes.hide : classes.invalid} type="text" value={userName} onChange={userNameChangeHandler} placeholder="User name" required />
                            <p className={UserNameFocus && userName && !validUserName ? classes.instructions : classes.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                4 to 24 characters<br />
                                Letters and numbers allowed.
                            </p>

                            <input onFocus={() => { setPasswordFocus(true) }} onBlur={() => { setPasswordFocus(false) }} className={validPassword || !password ? classes.hide : classes.invalid} type="password" value={password} onChange={passwordChangeHandler} placeholder="Password" required />
                            <p className={passwordFocus && password && !validPassword ? classes.instructions : classes.offscreen}>
                                <FontAwesomeIcon icon={faInfoCircle} />
                                8 to 24 characters.<br />
                                Letters and numbers allowed.
                            </p>

                            <input type="text" value={email} onChange={emailChangeHandler} placeholder="Email" required />

                            <input type="text" value={phoneNumber} onChange={phoneNumberChangeHandler} placeholder="Phone number" required />

                            <input type="text" value={address} onChange={addressChangeHandler} placeholder="Address (country and city is enough)" required />

                            <br />
                            <div >
                                <button className={classes.sign_in_button} type="submit">Sign up</button>
                            </div>
                        </div>
                    </form>
                </div>
            )}

        </div>
    )

}
export default SignUp