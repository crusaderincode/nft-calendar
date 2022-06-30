import {ActionType} from "../types";
import { collection,
    doc,
    addDoc,
    query,
    deleteDoc,
    getDocs,
} from "firebase/firestore";
import db from "../../firebase"
import {ThunkAction} from "redux-thunk";
import {Action, Dispatch} from "@reduxjs/toolkit";

export const addTicket = (payload: ITicket): ThunkAction<void, any, null, Action<ITicket>> => {

    return async (dispatch: Dispatch) => {

        try {
            const snapshot = await addDoc(collection(db, "tickets"), payload);
            payload.id = snapshot.id

        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.ADD_TICKET, payload })
    }
}



export const deleteTicket = (payload: ITicket): ThunkAction<void, any, null, Action<ITicket>> => {

    return async (dispatch: Dispatch) => {
        try {
            await deleteDoc(doc(db, "tickets", payload.id));
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.DEL_TICKET, payload })
    }

}

export const getTickets = (): ThunkAction<void, any, null, Action<ITicket>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "tickets"))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id,
                        email: entity.email.toString(),
                        ticket: entity.ticket.toString(),
                    }
                    dispatch({type: ActionType.ADD_TICKET, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}