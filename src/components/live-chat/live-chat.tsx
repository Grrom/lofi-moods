import { IconButton } from "../misc/icon-button/icon-button";
import ChatBubble from "./chat-bubble";
import "./live-chat.scss";

import { useEffect, useRef, useState } from "react";
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
import { Timestamp } from "@firebase/firestore";
import AlertHelper from "../../helpers/alert-helper";

export default function LiveChat() {
  const chatShown = useChatShown();
  const mood = useMood();

  const user = useUser();
  const toggleProfileModal = useModalProfileUpdate();

  const [chatIsFetching, setChatIsFetching] = useState(false);
  const [sendingChat, setSendingChat] = useState(false);
  const [chats, setChats] = useState<Array<Chat>>([]);

  const chatBox = useRef<HTMLTextAreaElement>(null);

  const chatBottom = useRef<HTMLDivElement>(null);

  function scrollToBottom() {
    chatBottom.current?.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    if (chatShown && mood) {
      Helpers.getById("live-chat-container")!.style.maxHeight = "100vh";
    } else {
      Helpers.getById("live-chat-container")!.style.maxHeight = "0px";
    }
  }, [chatShown, mood]);

  useEffect(() => {
    if (mood !== undefined) {
      setChatIsFetching(true);
      let unsubscribe = fireBaseHelper.listenLivechat(mood!, (newChats) => {
        newChats.sort((a, b) => a.dateSent.seconds - b.dateSent.seconds);
        setChats(() => newChats);
        setChatIsFetching(false);
      });
      return unsubscribe;
    }
  }, [mood]);

  async function sendChat() {
    if (chatBox.current!.value.length > 0) {
      setSendingChat(true);
      let chat = new Chat(
        user!.id,
        chatBox.current!.value,
        Timestamp.now(),
        user!.isVerified
      );
      if (await fireBaseHelper.sendChat(chat, mood!)) {
        chatBox.current!.value = "";
      } else {
        AlertHelper.errorToast("Failed to send the Message, please try again");
      }
      setSendingChat(false);
    }
  }

  // TODO: reduce the need to re-fetch these every time the messages tab is toggled, on second thought, this seems good as it is

  return (
    <div id="live-chat-container">
      {chatShown && mood && (
        <div id="live-chat">
          <div className="chat-list-view">
            {chatIsFetching ? (
              <div className="loader-container">
                <Loader />
              </div>
            ) : chats.length === 0 ? (
              <div className="no-messages">No messages yet</div>
            ) : (
              chats.map((chat, index) => {
                if (index === chats.length - 1) {
                  new Promise((resolve) => setTimeout(resolve, 700)).then(() =>
                    scrollToBottom()
                  ); //TODO: IMPROVE THIS, this seems to perform quite well, I'll keep it like this as long as it doesn't cause problems
                }
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
            <div ref={chatBottom}></div>
          </div>
          {user !== null ? (
            <div className="chat-box-container">
              <textarea
                className="chat-box"
                placeholder="Type something..."
                rows={1}
                ref={chatBox}
                disabled={sendingChat}
                onKeyDown={(event) =>
                  !event.shiftKey &&
                  event.key === "Enter" &&
                  event.preventDefault()
                }
                onKeyUp={(event) =>
                  !event.shiftKey && event.key === "Enter" && sendChat()
                }
              />
              <IconButton
                icon={send}
                isLoading={sendingChat}
                className="send-button"
                onClick={async () => sendChat()}
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
