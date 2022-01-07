import { useLayoutEffect, useState } from "react";
import { useBottomMessage } from "../../global-state/bottom-message-provider";
import { useBuffering } from "../../global-state/buffering-provider";
import Helpers from "../../helpers/helpers";
import { MiniLoader } from "../misc/loader/loader";
import "./bottom-indicator.scss";

export default function BottomIndicator() {
  const isBuffering = useBuffering();
  const message = useBottomMessage();
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setHeight(
        Helpers.getById("bottom-indicator")?.getBoundingClientRect().height ?? 0
      );
    }
    window.addEventListener("resize", updateSize);
    if (isBuffering === false) updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [isBuffering]);

  return (
    <span id="bottom-indicator">
      <span className={height > 36 ? "marquee" : ""}>
        {message}
        {isBuffering && <MiniLoader />}
      </span>
    </span>
  );
}
