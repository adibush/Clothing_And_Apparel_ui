import React, { useContext, useEffect, useState } from "react";
import classes from './GridContainer.module.css'
import GridItem from "./GridItem";
import { getAllItems } from "../services/api";
import normalizeItemName from "../utils/itemUtils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function GridContainer() {

    const [availableItems, setAvailableItems] = useState()

    useEffect(() => {
        getAllItems().then(
            res => {
                const items = res.data.map(item => {
                    const itemName = normalizeItemName(item.title);
                    return ({ ...item, displayName: itemName })
                });
                setAvailableItems(items)
            }
        );
    }, []);

    const textOnFavoriteButton = (favoriteButton) => {
        if (favoriteButton) {
            return <FontAwesomeIcon
                icon={faHeart}
                className={classes.text_favorite}
            />
        } else {
            return <FontAwesomeIcon
                icon={faHeart}
                className={classes.no_text_favorite}
            />
        }
    }


    return (
        <div className={classes.container}>
            {!availableItems ? "Loading..." :
                <div>
                    <div className={classes.container}>
                        {Array.isArray(availableItems)
                            ? availableItems.map((item) => (
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
                    </div>
                </div>
            }
        </div>
    )
}
export default GridContainer;