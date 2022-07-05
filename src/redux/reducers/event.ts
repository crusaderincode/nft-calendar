import {ActionType} from "../types"

const initialState : EventsState = {
    events: [],
    unlisted: [],
    past: []
};

export const eventReducer = (state = initialState, action: EventsAction) => {

    switch (action.type) {

        case ActionType.ADD:
            return {
                ...state,
                events: [{...action.payload}, ...state.events]
            }
        case ActionType.ADD_PAST:
            return {
                ...state,
                past: [{...action.payload}, ...state.past]
            }
        case ActionType.ADD_UNLISTED:
            return {
                ...state,
                unlisted: [{...action.payload}, ...state.unlisted]
            }
        case ActionType.DEL:
            return {
                ...state,
                events: state.events.filter(e => e.id !== action.payload.id),
                past: state.past.filter(e => e.id !== action.payload.id)
            }
        case ActionType.DEL_UNLISTED:
            return {
                ...state,
                unlisted: state.unlisted.filter(e => e.id !== action.payload.id)
            }

        default: return state;

    }

};
