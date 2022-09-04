import { configureStore, applyMiddleware } from '@reduxjs/toolkit'
import {eventReducer} from "./reducers/event";
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {contactReducer} from "./reducers/contact";
import {promoReducer} from "./reducers/promo";
import {newsReducer} from "./reducers/news";

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))

export const store = configureStore({
    reducer: {
        //@ts-ignore
        event: eventReducer,
        //@ts-ignore
        contact: contactReducer,
        //@ts-ignore
        promo: promoReducer,
        //@ts-ignore
        new: newsReducer
    }, composedEnhancer
})

