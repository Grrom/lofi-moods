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
}: any) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPfp() {
      let imageLink = await fireBaseHelper.getUserImage(senderId);
      let userName = await fireBaseHelper.getUserName(senderId);
      setUserName(() => userName);
      setUserImage(() => imageLink ?? defaultProfile);
    }

    fetchPfp();
  }, [senderId]);

  return (
    <div className="chat-bubble">
      {userName !== null && userImage !== null ? (
        <>
          <img src={userImage ?? defaultProfile} alt="pfp" className="image" />
          <div className="message-block">
            <span className="sender-name">
              {userName ?? "anonymous"}
              {isVerified && <span title="Email verified"> &#10004;</span>}:
            </span>
            <span className="message">{message}</span>
            <small className="date-sent">
              {Helpers.toDateTime(dateSent.seconds).toDateString()}
              {/* TODO: change the display when message was sent the same day */}
            </small>
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
