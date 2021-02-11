import { auth, database } from "../../firebase/config";



export const func = async (user,setAllMessages,setLastMsg) => {
    const by = auth.currentUser.uid + user.uid;
    const to = user.uid + auth.currentUser.uid;
    const res = await database.ref(`messages/`);
    try {
      const arr = [];
      res.on("value", (snap) => {
        snap.forEach((snap) => {
          if (snap.key == by || snap.key == to) {
            res.child(snap.key == by ? by : to).on("child_added", (snap) => {
              arr.push(snap.val());
              setAllMessages([...arr]);
            });
          }
        });
        setLastMsg(arr[arr.length - 1]);
      });
    } catch (error) {
      alert(error.message);
    }
}