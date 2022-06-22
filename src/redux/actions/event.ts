import {ActionType} from "../types";
import { collection, doc, addDoc, query, where, deleteDoc, getDocs } from "firebase/firestore";
import db from "../../firebase"
import {ThunkAction} from "redux-thunk";
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
            const q = query(collection(db, "events"), where('listed', "==", true))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id,
                        name: entity.name.toString(),
                        image: entity.image.toString(),
                        discord: entity.discord.toString(),
                        discordMembers: entity.discordMembers.toString(),
                        twitter: entity.twitter.toString(),
                        twitterMembers: entity.twitterMembers.toString(),
                        website: entity.website.toString(),
                        price: entity.price.toString(),
                        supply: entity.supply.toString(),
                        currency: entity.currency.toString(),
                        date: entity.date.toString(),
                        description: entity.description.toString(),
                    }
                    dispatch({type: ActionType.ADD, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}

export const getUnslitedEvents = (): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "events"), where('listed', "==", false))
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                const entity = doc.data()
                if (entity) {
                    let payload = {id: doc.id,
                        name: entity.name.toString(),
                        image: entity.image.toString(),
                        discord: entity.discord.toString(),
                        discordMembers: entity.discordMembers.toString(),
                        twitter: entity.twitter.toString(),
                        twitterMembers: entity.twitterMembers.toString(),
                        website: entity.website.toString(),
                        price: entity.price.toString(),
                        supply: entity.supply.toString(),
                        currency: entity.currency.toString(),
                        date: entity.date.toString(),
                        description: entity.description.toString(),
                        email: entity.email.toString(),
                        currencyPromo: entity.currencyPromo.toString(),
                        promo: entity.promo.toString(),
                        txPromo: entity.txPromo.toString(),
                    }
                    dispatch({type: ActionType.ADD_UNLISTED, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}