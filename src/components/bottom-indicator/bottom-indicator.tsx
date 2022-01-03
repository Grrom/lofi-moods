import { useContext } from "react";
import { BufferingContext } from "../../App";
import { MiniLoader } from "../misc/loader/loader";
import "./bottom-indicator.scss";

interface _props {
  message: string;
}
export default function BottomIndicator({ message }: _props) {
  const isBuffering = useContext(BufferingContext);
  return (
    <span id="bottom-indicator">
      {message}
      {isBuffering ? <MiniLoader /> : ""}
    </span>
  );
}
