import { IconButton } from "../misc/icon-button/icon-button";
import ChatBubble from "./chat-bubble";
import "./live-chat.scss";

import send from "../../assets/send.svg";

export default function LiveChat() {
  return (
    <div id="live-chat-container">
      <div id="live-chat">
        <div className="chat-list-view">
          {Array.from(Array(20).keys()).map((index) => (
            <ChatBubble
              key={index}
              senderId="asdfdf"
              message="the five boxing wizards jumped quickly, the five boxing wizards jumped quickly"
              dateSent={new Date()}
              isVerified={true}
            />
          ))}
        </div>
        <div className="chat-box-container">
          <textarea className="chat-box" rows={1} />
          <IconButton
            icon={send}
            isLoading={false}
            onClick={() => console.log("send")}
          />
        </div>
      </div>
    </div>
  );
}
