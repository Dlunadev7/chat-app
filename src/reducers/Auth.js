import { types } from "../types/types";

export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case types.login:
      return {
        ...action.payload
      }

    case types.signUp:
      return {
        ...state,
        redirect: true
      }

    case types.authError:
      return {
        ...state,
        token: {},
        error: true,
        redirect: false
        
      }

    case types.logout:
      return {
        state: []
      }

    default:
      return state;
  }
}