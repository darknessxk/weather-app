import { combineReducers } from '@reduxjs/toolkit'
import locationReducer from './reducers/location'
import languageReducer from './reducers/language'

export default combineReducers({
    location: locationReducer,
    language: languageReducer
})
