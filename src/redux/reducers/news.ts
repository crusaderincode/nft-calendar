import {ActionType} from "../types"

const initialState : NewsState = {
    news: [],
};

export const newsReducer = (state = initialState, action: NewsAction) => {

    switch (action.type) {

        case ActionType.ADD_NEWS:
            return {
                ...state,
                news: [{...action.payload}, ...state.news]
            }

        case ActionType.DEL_NEWS:
            return {
                ...state,
                news: state.news.filter(e => e.id !== action.payload.id)
            }


        default: return state;

    }

};
