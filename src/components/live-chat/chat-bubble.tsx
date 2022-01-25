import defaultProfile from "../../assets/default_profile.png";
import Helpers from "../../helpers/helpers";
import { useEffect, useState } from "react";
import { fireBaseHelper } from "../../App";
import { MiniLoader } from "../misc/loader/loader";
import ChatSender from "../../types/chat_sender";
import { Timestamp } from "@firebase/firestore";

interface _props {
  senderId: string;
  message: string;
  dateSent: Timestamp;
  isVerified: boolean;
  addSenderData: (senderData: ChatSender, id: string) => void;
  checkSenderData: (id: string) => ChatSender | null;
}

export default function ChatBubble({
  senderId,
  message,
  dateSent,
  isVerified,
  addSenderData,
  checkSenderData,
}: _props) {
  const [userImage, setUserImage] = useState<string | null>(null);

  const [chatSender, setChatSender] = useState(new ChatSender(null, []));

  useEffect(() => {
    async function fetchPfp() {
      let imageLink = await fireBaseHelper.getUserImage(senderId);
      setUserImage(() => imageLink ?? defaultProfile);
    }

    async function fetchSender() {
      let senderData = checkSenderData(senderId);
      if (senderData == null) {
        senderData = await fireBaseHelper.getSenderData(senderId);
      }

      if (senderData !== null) {
        addSenderData(senderData, senderId);
        setChatSender((current) => {
          current.name = senderData!.name;
          current.badges = senderData?.badges;
          return current;
        });
      }
    }

    fetchSender();
    fetchPfp();
  }, [senderId, addSenderData, checkSenderData]);

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
      {chatSender.name !== null && chatSender.name !== senderId ? (
        <>
          <img src={userImage ?? defaultProfile} alt="pfp" className="image" />
          <div className="message-block">
            <span className="sender-name">
              <span className="user-name">
                {chatSender.name ?? "anonymous"}
              </span>
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
