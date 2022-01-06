import { useBottomMessage } from "../../global-state/bottom-message-provider";
import { useBuffering } from "../../global-state/buffering-provider";
import { MiniLoader } from "../misc/loader/loader";
import "./bottom-indicator.scss";

export default function BottomIndicator() {
  const isBuffering = useBuffering();
  const message = useBottomMessage();

  return (
    <span id="bottom-indicator">
      {message}
      {isBuffering && <MiniLoader />}
    </span>
  );
}
