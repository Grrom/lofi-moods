import { IconButton } from "../misc/icon-button/icon-button";
import ChatBubble from "./chat-bubble";
import "./live-chat.scss";

import { useEffect } from "react";
import Helpers from "../../helpers/helpers";
import { useChatShown } from "../../global-state/chat-provider";
import { useMood } from "../../global-state/mood-provider";
import { useUser } from "../../global-state/user-provider";

import send from "../../assets/send.svg";
import login from "../../assets/login.svg";
import { useModalProfileUpdate } from "../../global-state/profile-modal-provider";

export default function LiveChat() {
  const chatShown = useChatShown();
  const playing = useMood();

  const user = useUser();
  const toggleProfileModal = useModalProfileUpdate();

  useEffect(() => {
    if (chatShown && playing) {
      Helpers.getById("live-chat-container")!.style.maxHeight = "100vh";
    } else {
      Helpers.getById("live-chat-container")!.style.maxHeight = "0px";
    }
  }, [chatShown, playing]);

  return (
    <div id="live-chat-container">
      {chatShown && playing && (
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
          {user !== null ? (
            <div className="chat-box-container">
              <textarea className="chat-box" rows={1} />
              <IconButton
                icon={send}
                isLoading={false}
                className="send-button"
                onClick={() => console.log("send")}
              />
            </div>
          ) : (
            <IconButton
              icon={login}
              isLoading={false}
              onClick={() => toggleProfileModal()}
              className="prompt-login"
              text="Login to Join the chat"
            />
          )}
        </div>
      )}
    </div>
  );
}
