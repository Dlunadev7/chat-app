import { types } from "../types/types";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case types.user:
      return {
        ...state,
        ...action.payload,
        isOnline: true
      }

    case types.getConversation:
      return {
        ...state,
        conversations: [...action.payload],
      }

    case types.unreadMessages:
      return {
        ...state,
        unread: action.payload
      }

    case types.contactList:
      return {
        ...state,
        contacts: [...action.payload]
      }

    case types.newChat:
      return {
        ...state,
        newChat: !state.newChat
      }

    case types.messages:
      return {
        ...state,
        messages: action.payload
      }

    case types.imageUrl:
      return {
        ...state, 
        imageUrl: action.payload
      }

    default:
      return state;
  }
}