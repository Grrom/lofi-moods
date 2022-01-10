import { IconButton } from "../misc/icon-button/icon-button";
import ChatBubble from "./chat-bubble";
import "./live-chat.scss";

import { useEffect, useState } from "react";
import Helpers from "../../helpers/helpers";
import { useChatShown } from "../../global-state/chat-provider";
import { useMood } from "../../global-state/mood-provider";
import { useUser } from "../../global-state/user-provider";

import send from "../../assets/send.svg";
import login from "../../assets/login.svg";
import { useModalProfileUpdate } from "../../global-state/profile-modal-provider";
import { fireBaseHelper } from "../../App";
import Chat from "../../types/chat";
import { Loader } from "../misc/loader/loader";

export default function LiveChat() {
  const chatShown = useChatShown();
  const mood = useMood();

  const user = useUser();
  const toggleProfileModal = useModalProfileUpdate();

  const [chatIsFetching, setChatIsFetching] = useState(false);
  const [chats, setChats] = useState<Array<Chat>>([]);

  useEffect(() => {
    if (chatShown && mood) {
      Helpers.getById("live-chat-container")!.style.maxHeight = "100vh";
    } else {
      Helpers.getById("live-chat-container")!.style.maxHeight = "0px";
    }
  }, [chatShown, mood]);

  useEffect(() => {
    async function getChats() {
      setChatIsFetching(true);
      let chats = await fireBaseHelper.getChats(mood ?? "");
      setChats(chats);
      setChatIsFetching(false);
    }
    getChats();
  }, [mood]);

  // TODO: add data to the users collection

  return (
    <div id="live-chat-container">
      {chatShown && mood && (
        <div id="live-chat">
          <div className="chat-list-view">
            {chatIsFetching ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : (
              chats.map((chat, index) => {
                return (
                  <ChatBubble
                    key={index}
                    senderId={chat.senderId}
                    message={chat.message}
                    dateSent={chat.dateSent}
                    isVerified={chat.isVerified}
                  />
                );
              })
            )}
          </div>
          {user !== null ? (
            <div className="chat-box-container">
              <textarea
                className="chat-box"
                placeholder="Type something..."
                rows={1}
              />
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
