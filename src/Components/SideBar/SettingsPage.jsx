import {
    Avatar,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@material-ui/core";
import { Close, Telegram } from "@material-ui/icons";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import "./SettingsPage.css";

function SettingsPage() {
  const user = useCookies('user')[0].user
  const [open, setOpen] = useState(false);
  const settingsComp = (
    <div className="settings">
      <Dialog className="dialog" open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="dialog-title">
          <div className="settings-title">
            <Close onClick={() => setOpen(false)} />
            <Telegram />
          </div>
        </DialogTitle>
        <DialogContent className="dialog-content">
          <div className="settings-content">
              <div className="avatar">
                <Avatar src={user.photoURL}/>
              </div>
              <div className="user-info">
                  <h3>{user.displayName}</h3>
                  <span>{user.email}</span>
              </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
  return { setOpen, settingsComp };
}

export default SettingsPage;
