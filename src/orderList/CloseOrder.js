import React, { useContext, useEffect, useState } from "react";
import classes from './CloseOrder.module.css'
import { getItemOrderCloseByOrderId } from "../services/api";
import CloseItemOrder from "./CloseItemOrder";
import AuthContext from "../context/AuthProvider";

function CloseOrder(props) {
    const authContext = useContext(AuthContext);


    const [itemOfOrder, setItemOfOrder] = useState(false);
    const [clickOrder, setClickOrder] = useState(false);


    useEffect(() => {
        getItemOrderCloseByOrderId("Bearer " + authContext["auth"], props.id).then(
            res => {
                setItemOfOrder(res.data)
            }
        )
    }, [props.payHandler])

    const onClickOrder = () => {
        if (clickOrder === true) {
            setClickOrder(false)
        } else {
            setClickOrder(true)
        }
    }



    return (
        <div>
            <br></br> <br></br>
            <div className={classes.container}>
                <br></br>
                <h2 className={classes.number_order} onClick={onClickOrder}>Number order : {props.id}</h2>
                {clickOrder && (
                    <div>
                        <div className={classes.mini_container}>
                            <h3>Date : {props.date}</h3>
                            <h3>To address :  {props.address}</h3>
                            <h3>Total price :  {props.price}$</h3>


                        </div>


                        <div className={classes.grid}>

                            {Array.isArray(itemOfOrder)
                                ? itemOfOrder.map((item) => (
                                    <CloseItemOrder
                                        price={item.price}
                                        title={item.title}
                                        image={item.image}


                                    />
                                )) : null


                            }
                        </div>
                    </div>
                )}



            </div>
        </div>
    )
}

export default CloseOrder