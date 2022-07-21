import {ActionType} from "../types";
import { collection,
    doc,
    addDoc,
    query,
    where,
    deleteDoc,
    getDocs,
    setDoc,
    orderBy,
    Timestamp
} from "firebase/firestore";
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

export const deleteUnlistedEvent = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {
        try {
            await deleteDoc(doc(db, "events", payload.id));
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.DEL_UNLISTED, payload })
    }

}

export const getEvents = (): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "events"), where('listed', "==", true), where('date', ">=", Timestamp.now()), orderBy('date', 'desc'))
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
                        promo: entity.promo.toString(),
                        verified: entity.verified.toString(),
                    }
                    dispatch({type: ActionType.ADD, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}

export const getPastEvents = (): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {

        try {
            const q = query(collection(db, "events"), where('listed', "==", true), where('date', "<", Timestamp.now()), orderBy('date', 'desc'))
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
                        promo: entity.promo.toString(),
                        verified: entity.verified.toString(),
                    }
                    dispatch({type: ActionType.ADD_PAST, payload})
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
                        banner: entity.banner.toString(),
                        verified: entity.verified.toString(),
                    }
                    dispatch({type: ActionType.ADD_UNLISTED, payload})
                }

            })
        } catch (e) {
            console.error("Fatal error: ", e);
        }

    }
}

export const listEvent = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {
        const ref = doc(db, 'events', payload.id)
        try {
            await setDoc(ref, {listed: true}, { merge: true });
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.DEL_UNLISTED, payload })
    }

}

export const verifyEvent = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {
        const ref = doc(db, 'events', payload.id)
        try {
            await setDoc(ref, {verified: payload.verified}, { merge: true });
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.VER, payload })
    }

}

export const changeEventImage = (payload: IEvent): ThunkAction<void, any, null, Action<IEvent>> => {

    return async (dispatch: Dispatch) => {
        const ref = doc(db, 'events', payload.id)
        try {
            await setDoc(ref, {image: payload.image}, { merge: true });
        } catch (e) {
            console.error("Fatal error: ", e);
        }
        dispatch({ type: ActionType.SET_IMG, payload })
    }

}