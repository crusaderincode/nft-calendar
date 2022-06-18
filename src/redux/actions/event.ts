import {ActionType} from "../types";
import { collection, doc, addDoc, deleteDoc, getDocs } from "firebase/firestore";
import db from "../../firebase"
import {jsx} from "@emotion/react";
import {ThunkAction, ThunkActionDispatch} from "redux-thunk";
import {Action, Dispatch} from "@reduxjs/toolkit";


export const addEvent = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {

        try {
            const snapshot = await addDoc(collection(db, "events"), payload);
            payload.id = snapshot.id
            if (payload.date) {
                payload.date = payload.date.toString()
            }

        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({type: ActionType.ADD, payload})
    }
}



export const deleteEvent = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

return async (dispatch: Dispatch) => {
    try {
        await deleteDoc(doc(db, "events", payload.id));
    } catch (e) {
        console.error("Fatal error: ", e);
    }
    dispatch({ type: ActionType.DEL, payload })
}

}

export const getEvents = (): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {

        try {
            const querySnapshot = await getDocs(collection(db, "events"));
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id, name: entity.name.toString()}
                    dispatch({type: ActionType.ADD, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}