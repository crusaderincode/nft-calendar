import { configureStore } from '@reduxjs/toolkit'
import {eventReducer} from "./reducers/event";

export const store = configureStore({
    reducer: {
        //@ts-ignore
        event: eventReducer,
    }
})