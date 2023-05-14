import React from "react";
import classes from './SearchBarErr.module.css'

function SearchBarErr(props) {


    return (
        <div className={classes.container}>
            <h1 className={classes.h1}>Sorry but we can't find result for "{props.data}"</h1>
            <h3>Try to check if there is a spelling mistake or try to type a more general phrase!</h3>
        </div>

    )




}
export default SearchBarErr;