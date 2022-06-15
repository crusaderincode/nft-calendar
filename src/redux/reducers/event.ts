import {ActionType} from "../types"

const initialState : EventsState = {
    events: [],
};

export const eventReducer = (state = initialState, action: EventsAction) => {

    switch (action.type) {

        case ActionType.ADD:
            return {
                ...state,
                events: [{...action.payload}, ...state.events]
            }
        case ActionType.DEL:
            return {
                ...state,
                events: state.events.filter(e => e.id !== action.payload.id)
            }

        default: return state;

    }

};
