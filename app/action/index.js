// export const setToken = (token) => ({
//     type: 'SET_TOKEN',
//     payload: token,
//   });

import { ActionTypes } from "./actionType";

export const SetToken = (token) => {
    return {
        type: ActionTypes.TOKEN,
        payload: token,
    };
};

