import React, { useContext, useEffect, useState } from "react";
import classes from './OrderList.module.css'
import { createOrder, getOrderByUserName, getOrderItemByUserName, updateOrderItemByUserName } from "../services/api";
import EmptyOrderList from "./EmptyOrderList";
import OrderItems from "./OrderItem";
import CloseOrder from "./CloseOrder";
import AuthContext from "../context/AuthProvider";


function OrderList() {
    const authContext = useContext(AuthContext);

    const [orderItems, setOrderItems] = useState('');
    const [validOrder, setValidOrder] = useState(false);
    const [orderItemPrice, setOrderItemPrice] = useState(false);
    const [shippingAddress, setShippingAddress] = useState('');
    const [validCloseOrder, setValidCloseOrder] = useState(false);
    const [closeOrder, setCloseOrder] = useState('');
    const [clickPendingOrder, setClickPendingOrder] = useState(true);
    const [clickCloseOrder, setClickCloseOrder] = useState(true);
    const [boolien, setBoolien] = useState(false);

    const shippingAddressChangeHandler = (event) => {
        setShippingAddress(event.target.value)
    }

    const payHandler = (event) => {
        event.preventDefault();
        const bodyForOrder = {
            date_time: new Date().toLocaleString(),
            shipping_address: shippingAddress,
            total_price: calculateTotalPrice(),
            status: "CLOSE"
        }
        createOrder({ "Authorization": "Bearer " + authContext["auth"] }, bodyForOrder).then(res => {
            const bodyForUpdateItems = {
                orders_id: res.data,
                status: "CLOSE",
            }
            updateOrderItemByUserName({ "Authorization": "Bearer " + authContext["auth"] }, bodyForUpdateItems)
            setBoolien(true)
        })
        setClickCloseOrder(true)
        setShippingAddress("")
    }


    useEffect(() => {
        if (Object.keys(authContext["auth"]).length > 0) {
            getOrderItemByUserName({ "Authorization": "Bearer " + authContext["auth"] }).then(
                res => {
                    if (res.data.length === 0) {
                        setValidOrder(false)
                    } else {
                        setValidOrder(true)
                    }
                    setOrderItems(res.data)
                    const priceOfItem = res.data.map(item => {
                        return (item.price)
                    })
                    setOrderItemPrice(priceOfItem)
                }
            )
        }
    }, [payHandler])



    useEffect(() => {
        if (Object.keys(authContext["auth"]).length > 0) {
            getOrderByUserName({ "Authorization": "Bearer " + authContext["auth"] }).then(
                res => {
                    if (res.data.length === 0) {
                        setValidCloseOrder(false)
                    } else {
                        setValidCloseOrder(true)
                    }
                    setCloseOrder(res.data)
                }
            )
        }
    }, [boolien])


    const calculateTotalPrice = () => {
        let total = 0
        for (let i = 0; i < orderItemPrice.length; i++) {
            total += orderItemPrice[i]
        }
        return total.toFixed(2)
    }

    const onClickPendingOrder = () => {
        if (clickPendingOrder === true) {
            setClickPendingOrder(false)
        } else {
            setClickPendingOrder(true)
        }
    }


    const onClickCloseOrder = () => {
        if (clickCloseOrder === true) {
            setClickCloseOrder(false)
        } else {
            setClickCloseOrder(true)
        }
    }



    return (
        <div>
            <div>
                {validOrder && (
                    <div>

                        <h1 className={classes.h1} onClick={onClickPendingOrder}>Your pending order</h1>
                        <div >
                            {clickPendingOrder && (
                                <div>
                                    <div className={classes.grid_container}>
                                        {
                                            Array.isArray(orderItems)
                                                ? orderItems.map((item) => (
                                                    <OrderItems
                                                        id={item.item_id}
                                                        image={item.image}
                                                        orderId={item.orders_id}
                                                        price={item.price}
                                                        status={item.status}
                                                        title={item.title}

                                                    />

                                                ))
                                                : null
                                        }
                                    </div>
                                    <div className={classes.pay_container}>
                                        <form onSubmit={payHandler}>
                                            <h3>total_price :  {calculateTotalPrice()} $</h3>
                                            <label className={classes.label}>shipping_address:  </label>
                                            <input className={classes.input} value={shippingAddress} onChange={shippingAddressChangeHandler} required></input>
                                            <br />
                                            <button type="submit" className={classes.button}>pay</button>
                                        </form>
                                    </div>

                                </div>
                            )}
                        </div>
                        <br /> <br /><br />
                        <hr />

                    </div>
                )}

                <div>
                    {validCloseOrder && (
                        <div>
                            <h1 className={classes.title_close_order} onClick={onClickCloseOrder}>Your closed orders</h1>
                            <br></br>
                            {clickCloseOrder && (
                                <div>
                                    {Array.isArray(closeOrder)
                                        ? closeOrder.map((order) => (
                                            <CloseOrder
                                                id={order.id}
                                                date={order.date_time}
                                                address={order.shipping_address}
                                                price={order.total_price}
                                                payHandler={payHandler}
                                            />
                                        ))
                                        : null}
                                </div>
                            )}
                        </div>
                    )}

                </div>

            </div>
            {!validOrder && (
                <div>
                    {!validCloseOrder && (
                        <EmptyOrderList />
                    )}
                </div>
            )}

        </div>
    )
}
export default OrderList