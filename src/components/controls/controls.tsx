import mute from "../../assets/mute.svg";
import unMute from "../../assets/unMute.svg";

import { useMuted, useMutedUpdate } from "../../global-state/muted-provider";
import { ActionButton } from "../misc/action-button/action-button";
import "./controls.scss";

export default function Controls() {
  const setIsMuted = useMutedUpdate();
  const isMuted = useMuted();

  return (
    <div id="controls">
      <ActionButton
        onClick={() => setIsMuted()}
        isLoading={false}
        text={""}
        icon={isMuted ? mute : unMute}
        className="mute-button"
      />
      controls
    </div>
  );
}
