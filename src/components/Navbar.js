import React, { useContext, useState } from "react";
import classes from './Navbar.module.css'
import { Link, } from "react-router-dom";
import AuthContext from "../context/AuthProvider";

function Navbar() {
    const authContext = useContext(AuthContext);
    const [searchBar, setSearchBar] = useState('');


    const onClickSearch = () => {
        setSearchBar("")
    }
    const searchBarChangeHandler = (event) => {
        setSearchBar(event.target.value);
    };

    return (
        <div>
            <form >
                <div >
                    <div className={classes.navbar}>
                        <Link to="/" >  <h3 className={classes.name}>Clothing <br />  <span className={classes.for_space}>sss</span>&<br /> Apparel</h3> </Link>
                        <Link to="/" > <img className={classes.icon} src={"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgq09Eg1oYIYDlE9PmRKp4FLvmAQ2ABivDfzQGg68ep6GHYq9Rw7KdJbdMP2F0UHnTj0Q&usqp=CAU"} />  </Link>
                        <div className={classes.button}>
                            {Object.keys(authContext["auth"]).length > 0 && (
                                <div>
                                    <Link to="/order" className={classes.button}>  Order </Link>
                                    <Link to="/favorite" className={classes.button}>  Favorite </Link>
                                    <Link to="/logOut" className={classes.button}> Log out/delete </Link>
                                </div>
                            )}{!Object.keys(authContext["auth"]).length > 0 && (
                                <div>
                                    <Link to="/login" className={classes.button}>  Order </Link>
                                    <Link to="/login" className={classes.button}>  Favorite </Link>
                                    <Link to="/login" className={classes.button}> Login/Sign up </Link>
                                </div>)}
                        </div>
                        <div className={classes.search}>
                            <input value={searchBar} className={classes.search_input} onChange={searchBarChangeHandler} type="text" placeholder="Clothing & Apparel                                                                              " />
                            <Link to="/result" state={searchBar} ><button onClick={onClickSearch} className={classes.search_button} type="submit"><i class="fa fa-search"> </i></button> </Link>
                        </div>
                    </div>
                </div>
            </form>


        </div>




    )
}


export default Navbar