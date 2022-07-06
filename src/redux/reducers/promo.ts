import {ActionType} from "../types"

const initialState : PromoState = {
    promos: [],
};

export const promoReducer = (state = initialState, action: PromosAction) => {

    switch (action.type) {

        case ActionType.ADD_PROMO:
            return {
                ...state,
                promos: [{...action.payload}, ...state.promos]
            }

        case ActionType.DEL_PROMO:
            return {
                ...state,
                promos: state.promos.filter(e => e.id !== action.payload.id)
            }


        default: return state;

    }

};
