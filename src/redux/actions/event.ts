import {ActionType} from "../types";
import { collection, addDoc } from "firebase/firestore";
import db from "../../firebase"
import {jsx} from "@emotion/react";

export const addEvent = (payload: Event): any => {

    return async (dispatch: any) => {
        console.log('Im here' + JSON.stringify(payload))
        try {
            const docRef = await addDoc(collection(db, "events"), {title: payload.title});
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
        dispatch({type: ActionType.ADD, payload})
    }
}



export const deleteEvent = (payload: Event): EventsAction => (
    { type: ActionType.DEL, payload }
)