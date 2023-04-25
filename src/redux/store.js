import {configureStore} from '@reduxjs/toolkit'
import {combineReducers} from 'redux'
import { alertsSlice } from './reducers/alertsSlice'
import { userSlice } from './reducers/userSlice'

const rootReducer = combineReducers({
    alerts : alertsSlice.reducer,
    user : userSlice.reducer
})

const store = configureStore({
    reducer : rootReducer,
})

export default store;