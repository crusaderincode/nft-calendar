import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import {eventReducer} from "./reducers/event";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: {
        //@ts-ignore
        event: eventReducer,
    }, composedEnhancer
})