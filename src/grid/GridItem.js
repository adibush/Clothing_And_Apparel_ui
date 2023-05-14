import React, { useContext, useEffect, useState } from "react";
import classes from './GridItem.module.css'
import { createFavoriteList, createItemOrderList, deleteFavoriteItemByItemId, deleteOrderItemByItemId, getFavoriteItemByUserName, getOrderItemByUserName, updateItemStockMinusById, updateItemStockPlusById } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle, faHeart, faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthProvider";


function GridItem(props) {
    const authContext = useContext(AuthContext);

    const [favoriteButton, setFavoriteButton] = useState(false);
    const [favoriteIdItems, setFavoriteIdItems] = useState('');
    const [orderButton, setOrderButton] = useState(false);
    const [messageForStock, setMessageForStock] = useState(false);


    const onClickToOrder = () => {
        if (props.itemStock === 0) {
            setMessageForStock(true)
        } else {
            if (orderButton) {
                setOrderButton(false)
            } else {
                setOrderButton(true)
            }
            if (orderButton === false) {
                const bodyForItemOrderList = {
                    orders_id: null,
                    item_id: props.id,
                    title: props.displayName,
                    price: props.price,
                    image: props.image,
                    status: "TEMP"
                }
                createItemOrderList({ "Authorization": "Bearer " + authContext["auth"] }, bodyForItemOrderList)

                const bodyForUpdaeItemStock = {
                    id: props.id
                }
                updateItemStockMinusById({ "Authorization": "Bearer " + authContext["auth"] }, bodyForUpdaeItemStock)

            } else {
                deleteOrderItemByItemId("Bearer " + authContext["auth"], props.id)
                const bodyForUpdaeItemStock = {
                    id: props.id
                }
                updateItemStockPlusById({ "Authorization": "Bearer " + authContext["auth"] }, bodyForUpdaeItemStock)
            }
        }


    }

    const onClickToFavorite = () => {
        if (favoriteButton) {
            setFavoriteButton(false)
        } else {
            setFavoriteButton(true)
        }
        const findExistItem = favoriteIdItems.find(itemId => {
            return itemId === props.id
        })
        if (findExistItem === undefined && favoriteButton === false) {
            const bodyForFavoriteList = {
                item_id: props.id,
                title: props.displayName,
                price: props.price,
                image: props.image,
                item_stock: props.itemStock
            }
            createFavoriteList({ "Authorization": "Bearer " + authContext["auth"] }, bodyForFavoriteList)
        }
        else {
            deleteFavoriteItemByItemId("Bearer " + authContext["auth"], props.id)
        }
    }

    useEffect(() => {
        if (Object.keys(authContext["auth"]).length > 0) {
            getFavoriteItemByUserName({ "Authorization": "Bearer " + authContext["auth"] }).then(
                res => {
                    const idOfItems = res.data.map(item => {
                        if (item.item_id === props.id) {
                            setFavoriteButton(true)
                        }
                        return (item.item_id)
                    })
                    setFavoriteIdItems(idOfItems)
                }
            )
        }
    }, [])

    useEffect(() => {
        if (Object.keys(authContext["auth"]).length > 0) {
            getOrderItemByUserName({ "Authorization": "Bearer " + authContext["auth"] }).then(
                res => {
                    res.data.map(item => {
                        if (item.item_id === props.id) {
                            setOrderButton(true)
                        }
                        return (item.item_id)
                    })

                }
            )
        }
    }, [])



    const validItemStock = () => {
        if (props.itemStock === 0) {
            return <FontAwesomeIcon icon={faCircle} className={classes.invalid} />;
        }
        else {
            return <FontAwesomeIcon icon={faCircle} className={classes.valid} />
        }
    }

    const notValidItemStock = () => {
        if (props.itemStock === 0) {
            return " 0 units in stock ";
        }
    }

    const messageStock = () => {
        if (messageForStock) {
            setMessageForStock(false)
        }
    }


    const textOnOrderButton = () => {
        if (orderButton) {
            return <FontAwesomeIcon
                icon={faShoppingCart}
                className={classes.text_order}
            />
        } else {
            return <FontAwesomeIcon
                icon={faShoppingCart}
                className={classes.no_text_order}
            />
        }
    }




    return (
        <div>
            <div className={classes.item_grid} onClick={messageStock}>
                <img className={classes.image_of_grid} src={props.image} />
                <div className={classes.text_on_grid}>
                    <h4 >{props.displayName}</h4>
                    <h5>{props.price}$</h5>
                    <h5> {validItemStock()}{notValidItemStock()}</h5>
                </div>
                {Object.keys(authContext["auth"]).length > 0 && (
                    <div>
                        <button className={classes.button_favorite} title="To favorite" onClick={onClickToFavorite}>{props.favorite(favoriteButton)}</button>
                        <button className={classes.button_order} title="To order" onClick={onClickToOrder} >{textOnOrderButton()}</button>
                    </div>
                )}
                <h4 className={messageForStock ? classes.valid_message_for_stock : classes.hide}>Products cannot be added <br /> if they are not available in stock</h4>

            </div>

        </div>

    )



}
export default GridItem