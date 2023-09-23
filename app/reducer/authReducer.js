import { ActionTypes } from "../action/actionType";

const intialState = {
    token: {
        access_token : '',
    }


};

export const AuthReducer = (state = intialState,action) => {
    console.log(action)
    switch (action.type) {
            case ActionTypes.TOKEN:
                return {
                    ...state,
                    token: action.payload
                }        
        default:
            return state;
    }
};
