import defaultProfile from "../../assets/default_profile.png";
import Helpers from "../../helpers/helpers";
import { useEffect, useState } from "react";
import { fireBaseHelper } from "../../App";
import { MiniLoader } from "../misc/loader/loader";

export default function ChatBubble({
  senderId,
  message,
  dateSent,
  isVerified,
  addUserName,
  checkUsername,
}: any) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPfp() {
      let imageLink = await fireBaseHelper.getUserImage(senderId);
      setUserImage(() => imageLink ?? defaultProfile);
    }

    async function fetchName() {
      let userName = checkUsername(senderId);
      if (userName == null) {
        addUserName(senderId, senderId);
        userName = await fireBaseHelper.getUserName(senderId);
        addUserName(userName, senderId);
      }
      setUserName(() => userName);
    }

    fetchName();
    fetchPfp();
  }, [senderId, addUserName, checkUsername]);

  function formattedDate() {
    let date = Helpers.toDateTime(dateSent.seconds);
    let yesterday = new Date();
    yesterday.setDate(new Date().getDate() - 1);

    if (date.toDateString() === yesterday.toDateString()) {
      return (
        "yesterday " +
        date.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
    } else if (date.toDateString() === new Date().toDateString()) {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } else {
      return date.toDateString();
    }
  }

  return (
    <div className="chat-bubble">
      {userName !== null && userName !== senderId ? (
        <>
          <img src={userImage ?? defaultProfile} alt="pfp" className="image" />
          <div className="message-block">
            <span className="sender-name">
              <span className="user-name">{userName ?? "anonymous"}</span>
              {isVerified && <span title="Email verified"> &#10004;</span>}:
            </span>
            <span className="message">{message}</span>
            <small className="date-sent">{formattedDate()}</small>
          </div>
        </>
      ) : (
        <span className="loader-container">
          <MiniLoader />
        </span>
      )}
    </div>
  );
}
