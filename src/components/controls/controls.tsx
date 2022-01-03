import mute from "../../assets/mute.svg";
import unMute from "../../assets/unMute.svg";
import profile from "../../assets/profile.svg";

import { useMuted, useMutedUpdate } from "../../global-state/muted-provider";
import { ActionButton } from "../misc/action-button/action-button";

import "./controls.scss";
import { useModalProfileUpdate } from "../../global-state/profile-modal-provider";

export default function Controls() {
  const toggleMuted = useMutedUpdate();
  const isMuted = useMuted();

  const toggleProfile = useModalProfileUpdate();
  return (
    <div id="controls">
      <ActionButton
        onClick={() => toggleMuted()}
        isLoading={false}
        text={""}
        icon={isMuted ? mute : unMute}
        className="mute-button"
      />
      <ActionButton
        onClick={() => toggleProfile()}
        isLoading={false}
        text={""}
        icon={profile}
        className="mute-button"
      />
    </div>
  );
}
