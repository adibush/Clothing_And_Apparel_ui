
import { axiosInstance as axios } from './axiosInstance'


const GET_ALL_ITEMS = () => `item/all`;

const GET_ITEM_BY_NAME = () => `item/name`;

const CREATE_NEW_REGISTERED_USER = () => `users/create`;

const CREATE_FAVORITE_LIST = () => `favorite/create`

const GET_FAVORITE_ITEM_BY_USER_NAME = () => `favorite/get`

const DELETE_FAVORITE_ITEM_BY_ITEM_ID = () => `favorite/delete/item`

const CREATE_ORDER = () => `orders/create`

const CREATE_ITEM_ORDER_LIST = () => `item/orders/create`

const GET_ORDER_ITEM_BY_USER_NAME = () => `item/orders/get`

const DELETE_ORDER_ITEM_BY_ITEM_ID = () => `item/orders/delete`

const UPDATE_ORDER_ITEMS_BY_USER_NAME = () => `item/orders/update`

const UPDATE_ITEM_STOCK_MINUS_BY_ID = () => `item/update/minus`

const UPDATE_ITEM_STOCK_PLUS_BY_ID = () => `item/update/plus`

const GET_ORDER_BY_USER_NAME = () => `orders/get/all`

const GET_ITEM_ORDER_CLOSE_BY_ORDER_ID = () => `item/orders/get/close`

const AUTHENTICATE = () => `api/public/authenticate`;

const DELETE_USER = () => `users/delete`;



export const getAllItems = () => {
    return axios.get(GET_ALL_ITEMS());
};

export const getItemByName = (Authorization, name) => {
    return axios.get(GET_ITEM_BY_NAME(), { params: { Authorization, name } });
}

export const createNewRegisteredUser = (userBody) => {
    return axios.post(CREATE_NEW_REGISTERED_USER(), userBody);
}

export const createFavoriteList = (params, body) => {
    return axios.post(CREATE_FAVORITE_LIST(), body, { params: params });
}
export const getFavoriteItemByUserName = (params) => {
    return axios.get(GET_FAVORITE_ITEM_BY_USER_NAME(), { params: params })
}

export const deleteFavoriteItemByItemId = (Authorization, id) => {
    return axios.delete(DELETE_FAVORITE_ITEM_BY_ITEM_ID(), { params: { Authorization, id } })
}
export const createOrder = (params, userBody) => {
    return axios.post(CREATE_ORDER(), userBody, { params: params })
}
export const createItemOrderList = (params, userBody) => {
    return axios.post(CREATE_ITEM_ORDER_LIST(), userBody, { params: params })
}
export const getOrderItemByUserName = (params) => {
    return axios.get(GET_ORDER_ITEM_BY_USER_NAME(), { params: params })
}
export const deleteOrderItemByItemId = (Authorization, id) => {
    return axios.delete(DELETE_ORDER_ITEM_BY_ITEM_ID(), { params: { Authorization, id } })
}
export const updateOrderItemByUserName = (params, userBody) => {
    return axios.put(UPDATE_ORDER_ITEMS_BY_USER_NAME(), userBody, { params: params })
}
export const updateItemStockMinusById = (params, userBody) => {
    return axios.put(UPDATE_ITEM_STOCK_MINUS_BY_ID(), userBody, { params: params })
}
export const updateItemStockPlusById = (params, userBody) => {
    return axios.put(UPDATE_ITEM_STOCK_PLUS_BY_ID(), userBody, { params: params })
}

export const getOrderByUserName = (params) => {
    return axios.get(GET_ORDER_BY_USER_NAME(), { params: params })
}

export const getItemOrderCloseByOrderId = (Authorization, orders_id) => {
    return axios.get(GET_ITEM_ORDER_CLOSE_BY_ORDER_ID(), { params: { Authorization, orders_id } })

}
export const authenticate = (userBody) => {
    return axios.post(AUTHENTICATE(), userBody);
}
export const deleteAllFromUser = (params) => {
    return axios.delete(DELETE_USER(), { params: params })
}







