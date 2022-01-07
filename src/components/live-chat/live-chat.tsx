import ChatBubble from "./chat-bubble";
import "./live-chat.scss";

export default function LiveChat() {
  return (
    <div id="live-chat-container">
      <div id="live-chat">
        <ChatBubble
          senderId="asdfdf"
          message="the five boxing wizards jumped quickly, the five boxing wizards jumped quickly"
          dateSent={new Date()}
          isVerified={true}
        />
      </div>
    </div>
  );
}
