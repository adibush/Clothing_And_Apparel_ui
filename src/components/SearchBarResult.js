import React, { useContext, useEffect, useState } from "react";
import classes from './SearchBarResult.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { useLocation } from "react-router-dom";
import GridItem from "../grid/GridItem";
import { getItemByName } from "../services/api";
import normalizeItemName from "../utils/itemUtils";
import SearchBarErr from "./SearchBarErr";
import AuthContext from "../context/AuthProvider";

function SearchBarResult() {
    const authContext = useContext(AuthContext);

    const [handlerNoResultSearchBar, setHandlerNoResultSearchBar] = useState(false);
    const [itemByName, setItemByName] = useState('');

    const location = useLocation();
    const data = location.state;

    useEffect(() => {
        getItemByName("Bearer " + authContext["auth"], data).then(
            res => {
                const itemsByName = res.data.map(item => {
                    const itemName = normalizeItemName(item.title);
                    return ({ ...item, displayName: itemName })
                });

                if (res.data.length === 0) {
                    setHandlerNoResultSearchBar(true)
                } else {
                    setHandlerNoResultSearchBar(false)
                }
                setItemByName(itemsByName)
            }
        ).catch(
            setHandlerNoResultSearchBar(true)
        );
    }, [data])


    const textOnFavoriteButton = (validFavoriteButton) => {
        if (validFavoriteButton) {
            return <FontAwesomeIcon
                icon={faHeart}
                className={classes.favorite}
            />
        } else {
            return <FontAwesomeIcon
                icon={faHeart}
                className={classes.nofavorite}
            />
        }
    }

    return (
        <div className={classes.container}>
            {
                Array.isArray(itemByName)
                    ? itemByName.map((item) => (
                        <GridItem
                            id={item.id}
                            displayName={item.displayName}
                            price={item.price}
                            image={item.image}
                            itemStock={item.item_stock}
                            favorite={textOnFavoriteButton}
                        />
                    ))
                    : null
            }
            {handlerNoResultSearchBar && (
                <SearchBarErr data={data} />
            )}
        </div>
    )
}
export default SearchBarResult