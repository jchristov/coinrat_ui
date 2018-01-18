// @flow
import React from "react"
import {orderStoreInstance} from "../Orders/OrderStore"
import CleanOrderStorageButtonComponent from "../Orders/Storage/CleanOrderStorageButtonComponent"
import {filterStoreInstance} from "./FilterStore"

const CleanOrderStorageButtonContainer = () => {

  const clearOrderStore = () => {
    orderStoreInstance.clear(filterStoreInstance)
  }

  return <CleanOrderStorageButtonComponent onClick={clearOrderStore}/>
}

export default CleanOrderStorageButtonContainer
