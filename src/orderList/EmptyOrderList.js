import React from "react";
import classes from './EmptyOrderList.module.css'

function EmptyOrderList(props) {


    return (
        <div>


            <div className={classes.empty_Order}>
                <h1 className={classes.h1} >You don`t add yet items to your order list</h1>
                <h3>Please pay attention that you add items to your order list on click </h3>

            </div>


        </div>
    )
}
export default EmptyOrderList