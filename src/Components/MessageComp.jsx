import React, { forwardRef, useEffect } from "react";
import { auth } from "../firebase/config";
import FlipMove from "react-flip-move";

const MessageComp = forwardRef(({ msg }, ref) => {
  useEffect(() => {
    if (document.getElementsByClassName("me").length > 0) {
      document
        .getElementsByClassName("me")
        [document.getElementsByClassName("me").length - 1].scrollIntoView();
      window.scroll(0, 0);
    }
  }, []);
  return (
    <div className="message-comp" id="message-comp" ref={ref}>
      <div className={msg?.by === auth.currentUser.uid ? "me" : "you"}>
        <FlipMove>
          <h3>{msg?.msg}</h3>
        </FlipMove>
      </div>
    </div>
  );
});

export default MessageComp;
