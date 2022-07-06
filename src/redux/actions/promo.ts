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

export const addPromo = (payload: IPromo): ThunkAction<void, any, null, Action<IPromo>> => {

    return async (dispatch: Dispatch) => {

        try {
            const snapshot = await addDoc(collection(db, "promo"), payload);
            payload.id = snapshot.id

        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.ADD_PROMO, payload })
    }
}



export const deletePromo = (payload: IPromo): ThunkAction<void, any, null, Action<IPromo>> => {

    return async (dispatch: Dispatch) => {
        try {
            await deleteDoc(doc(db, "promo", payload.id));
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.DEL_PROMO, payload })
    }

}

export const getPromos = (): ThunkAction<void, any, null, Action<IPromo>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "promo"))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id,
                        image: entity.image.toString(),
                        url: entity.url.toString()
                    }
                    dispatch({type: ActionType.ADD_PROMO, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}