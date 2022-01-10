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
    function updateSize() {
      let element = Helpers.getById("bottom-indicator");
      setIsMarquee(
        element!.scrollHeight > element!.clientHeight ||
          element!.scrollWidth > element!.clientWidth
      );
    }
    window.addEventListener("resize", updateSize);
    if (isBuffering === false) updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, [isBuffering]);

  return (
    <span id="bottom-indicator">
      <div className={isMarquee ? "marquee" : ""}>
        {message}
        {isBuffering && <MiniLoader />}
      </div>
    </span>
  );
}
