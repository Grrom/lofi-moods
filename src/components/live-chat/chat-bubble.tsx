import Chat from "../../types/chat";
import defaultProfile from "../../assets/default_profile.png";
import Helpers from "../../helpers/helpers";
import { useEffect, useState } from "react";
import { fireBaseHelper } from "../../App";

export default function ChatBubble({
  senderId,
  message,
  dateSent,
  isVerified,
}: Chat) {
  const [userImage, setUserImage] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPfp() {
      let imageLink = await fireBaseHelper.getUserImage(senderId);
      let userName = await fireBaseHelper.getUserName(senderId);
      setUserImage(() => imageLink);
      setUserName(() => userName);
    }

    fetchPfp();
  }, [senderId]);

  return (
    <div className="chat-bubble">
      <img src={userImage ?? defaultProfile} alt="pfp" className="image" />
      <div className="message-block">
        <span className="sender-name">
          {userName ?? "anonymous"}
          {isVerified && <span title="Email verified"> &#10004;</span>}:
        </span>
        <span className="message">{message}</span>
        <small className="date-sent">
          {Helpers.toDateTime(dateSent.seconds).toDateString()}
        </small>
      </div>
    </div>
  );
}
