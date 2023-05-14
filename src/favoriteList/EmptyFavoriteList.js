import React from "react";
import classes from './EmptyFavoriteList.module.css'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";


function EmptyFavoriteList(props) {


    return (
        <div>
            {props.emptyFavorite && (
                <div className={classes.empty_Favorite}>
                    <h1 className={classes.h1} >You don`t add yet items to your favorite list</h1>
                    <h3>Please pay attention that you add items to your favorite list on click  <FontAwesomeIcon icon={faHeart} className={classes.nofavorite}
                    /></h3>

                </div>
            )}

        </div>
    )
}
export default EmptyFavoriteList