import React from "react";
import classes from './CloseItemOrder.module.css'

function CloseItemOrder(props) {




    return (
        <div className={classes.item_grid}>
            <h3 className={classes.h3_title}>{props.title}</h3>
            <h3 className={classes.h3_price}>{props.price}$</h3>

            <img className={classes.image_of_grid} src={props.image} />

        </div>
    )
}
export default CloseItemOrder