import React from "react"
import {orderStoreInstance} from "../Orders/OrderStore"
import CleanOrderStorageButtonComponent from "../Orders/CleanOrderStorageButtonComponent"

const CleanOrderStorageButtonContainer = () => {
 return <CleanOrderStorageButtonComponent onClick={orderStoreInstance.clear}/>
}

export default CleanOrderStorageButtonContainer
