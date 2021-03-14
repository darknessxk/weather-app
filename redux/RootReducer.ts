import { combineReducers } from '@reduxjs/toolkit'
import locationReducer from './reducers/location'

export default combineReducers({
    location: locationReducer
})
