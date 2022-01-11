import { useLayoutEffect, useState } from "react";
import { useBottomMessage } from "../../global-state/bottom-message-provider";
import { useBuffering } from "../../global-state/buffering-provider";
import Helpers from "../../helpers/helpers";
import { MiniLoader } from "../misc/loader/loader";
import "./bottom-indicator.scss";

export default function BottomIndicator() {
  const isBuffering = useBuffering();
  const message = useBottomMessage();
  const [isMarquee, setIsMarquee] = useState(false);

  useLayoutEffect(() => {
    async function updateSize() {
      let indicator = Helpers.getById("bottom-indicator");
      let message = Helpers.getById("message");
      setIsMarquee(
        message!.getBoundingClientRect().width >
          indicator!.getBoundingClientRect().width
      );
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [isBuffering]);

  return (
    <span id="bottom-indicator">
      <div className={isMarquee ? "marquee" : ""}>
        <span id="message">{message}</span>
        {isBuffering && <MiniLoader />}
      </div>
    </span>
  );
}
