import { ACTIONS } from "./actions";

const initialState = {
  isUserLogin: false,
  user: {}, 
  ClickedOnChat: false,
  userClicked: {},
  msgsUserClicked: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case ACTIONS.LOGIN:
      return { ...state, user: { ...payload }, isUserLogin: true };
    case ACTIONS.LOGOUT:
      return { ...state, user: {}, isUserLogin: false };
    case ACTIONS.OPENCHATONCLICK:
      return { ...state, userClicked: payload};
    case ACTIONS.LASTMESSAGE:
      return { ...state, lastMsg: payload };
    case ACTIONS.MESSAGEDUSERCLICKED:
      return { ...state, msgsUserClicked: [...payload] };
    default:
      return state;
  }
};
