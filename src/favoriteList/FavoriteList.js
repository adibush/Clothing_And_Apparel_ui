import React, { useContext, useEffect, useState } from "react";
import { getFavoriteItemByUserName } from "../services/api";
import GridItem from "../grid/GridItem";
import EmptyFavoriteList from "./EmptyFavoriteList";
import classes from './FavoriteList.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import AuthContext from "../context/AuthProvider";



function FavoritList() {
    const authContext = useContext(AuthContext);

    const [favoriteItems, setFavoriteItems] = useState('');
    const [emptyFavorite, setEmptyFavorite] = useState(false);

    const textOnFavoriteButton = () => {
        return <FontAwesomeIcon
            icon={faHeart}
            className={classes.favorite}
        />
    }


    useEffect(() => {
        if (Object.keys(authContext["auth"]).length > 0) {
            getFavoriteItemByUserName({ "Authorization": "Bearer " + authContext["auth"] }).then(
                res => {
                    if (res.data.length === 0) {
                        setEmptyFavorite(true)
                    } else {
                        setEmptyFavorite(false)
                    }
                    setFavoriteItems(res.data)
                }
            )
        }
    }, [textOnFavoriteButton])



    return (

        <div className={classes.container}>
            {
                Array.isArray(favoriteItems)
                    ? favoriteItems.map((item) => (
                        <GridItem
                            id={item.item_id}
                            displayName={item.title}
                            price={item.price}
                            image={item.image}
                            itemStock={item.item_stock}
                            favorite={textOnFavoriteButton}
                        />
                    ))
                    : null
            }

            <EmptyFavoriteList emptyFavorite={emptyFavorite} />
        </div>
    )
}
export default FavoritList;