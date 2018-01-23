// @flow
import React from "react"
import {filterStoreInstance, orderStoreInstance} from "../diContainer"
import CleanOrderStorageButtonComponent from "../../Orders/Storage/CleanOrderStorageButtonComponent"

const CleanOrderStorageButtonContainer = () => {

  const clearOrderStore = () => {
    orderStoreInstance.clear(filterStoreInstance)
  }

  return <CleanOrderStorageButtonComponent onClick={clearOrderStore}/>
}

export default CleanOrderStorageButtonContainer
