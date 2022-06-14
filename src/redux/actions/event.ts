import {ActionType} from "../types";

export const addEvent = (payload: Event): EventsAction => (
    { type: ActionType.ADD, payload }
)