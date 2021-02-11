export const ACTIONS = {
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  OPENCHATONCLICK: "OPENCHATONCLICK",
  CHECK: "CHECK",
  LASTMESSAGE: "LASTMESSAGE",
  MESSAGEDUSERCLICKED: "MESSAGEDUSERCLICKED",
};
  
export const loginCase = (user) => ({
  type: ACTIONS.LOGIN,
  payload: user,
});
export const logoutCase = (user) => ({
  type: ACTIONS.LOGOUT,
  payload: user,
});
export const OpenChatOnClick = (user) => ({
  type: ACTIONS.OPENCHATONCLICK,
  payload: user,
});
export const setLastMessage = (msg) => ({
  type: ACTIONS.LASTMESSAGE,
  payload: msg,
});
export const setMessagesUserClicked = (msgs) => ({
  type: ACTIONS.MESSAGEDUSERCLICKED,
  payload: msgs,
});
