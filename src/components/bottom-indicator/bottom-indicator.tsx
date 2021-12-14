import { MiniLoader } from "../misc/loader/loader";
import "./bottom-indicator.scss";

interface _props {
  message: string;
  isBuffering: boolean;
}
export default function BottomIndicator({ message, isBuffering }: _props) {
  console.log(isBuffering);
  return (
    <span id="bottom-indicator">
      {message}
      {isBuffering ? <MiniLoader /> : ""}
    </span>
  );
}
