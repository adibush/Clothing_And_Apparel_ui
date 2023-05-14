import React, { useContext, useState } from "react";
import classes from './OrderItem.module.css'
import { deleteOrderItemByItemId, updateItemStockPlusById } from "../services/api";
import AuthContext from "../context/AuthProvider";

function OrderItems(props) {
    const authContext = useContext(AuthContext);

    const onClickRemoveOrder = () => {
        deleteOrderItemByItemId("Bearer " + authContext["auth"], props.id)

        const bodyForUpdaeItemStock = {
            id: props.id
        }
        updateItemStockPlusById({ "Authorization": "Bearer " + authContext["auth"] }, bodyForUpdaeItemStock)
    }


    return (
        <div>
            <div className={classes.item_grid}>
                <img className={classes.image_of_grid} src={props.image} />
                <h2 className={classes.text}>{props.title}</h2>
                <h3 className={classes.text}>{props.price}$</h3>
                <button className={classes.button_order} onClick={onClickRemoveOrder}>remove from order</button>

            </div>

        </div>
    )
}
export default OrderItems