import {ActionType} from "../types"

const initialState : TicketState = {
    tickets: [],
};

export const contactReducer = (state = initialState, action: TicketsAction) => {

    switch (action.type) {

        case ActionType.ADD_TICKET:
            return {
                ...state,
                tickets: [{...action.payload}, ...state.tickets]
            }

        case ActionType.DEL_TICKET:
            return {
                ...state,
                tickets: state.tickets.filter(e => e.id !== action.payload.id)
            }


        default: return state;

    }

};
