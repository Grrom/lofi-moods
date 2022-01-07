import Chat from "../../types/chat";
import defaultProfile from "../../assets/default_profile.png";

export default function ChatBubble({
  senderId,
  message,
  dateSent,
  isVerified,
}: Chat) {
  return (
    <div className="chat-bubble">
      <img src={defaultProfile} alt="pfp" className="image" />
      <div className="message-block">
        <span className="sender-name">
          {senderId}
          {isVerified && <span title="Email verified"> &#10004;</span>}:
        </span>
        <span className="message">{message}</span>
        <small className="date-sent">{dateSent.toDateString()}</small>
      </div>
    </div>
  );
}
