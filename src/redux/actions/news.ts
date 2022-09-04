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

export const addNews = (payload: INews): ThunkAction<void, any, null, Action<INews>> => {

    return async (dispatch: Dispatch) => {

        try {
            const snapshot = await addDoc(collection(db, "news"), payload);
            payload.id = snapshot.id

        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.ADD_NEWS, payload })
    }
}



export const deleteNews = (payload: INews): ThunkAction<void, any, null, Action<INews>> => {

    return async (dispatch: Dispatch) => {
        try {
            await deleteDoc(doc(db, "news", payload.id));
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.DEL_NEWS, payload })
    }

}

export const getNews = (): ThunkAction<void, any, null, Action<INews>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "news"))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id,
                        image: entity.image.toString(),
                        url: entity.url.toString(),
                        header: entity.header.toString(),
                        text: entity.text.toString(),
                        date: entity.date.toString()
                    }
                    dispatch({type: ActionType.ADD_NEWS, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}