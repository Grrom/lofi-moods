import mute from "../../assets/mute.svg";
import unMute from "../../assets/unMute.svg";
import profile from "../../assets/profile.svg";

import { useMuted, useMutedUpdate } from "../../global-state/muted-provider";
import { IconButton } from "../misc/icon-button/icon-button";

import "./controls.scss";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";

export default function Controls() {
  const toggleMuted = useMutedUpdate();
  const isMuted = useMuted();

  const toggleProfile = useModalProfileUpdate();
  const profileToggled = useModalProfile();
  return (
    <div id="controls" className={profileToggled ? "box-shadow" : ""}>
      <IconButton
        onClick={() => toggleMuted()}
        isLoading={false}
        icon={isMuted ? mute : unMute}
        className="mute-button"
      />
      <IconButton
        onClick={() => toggleProfile()}
        isLoading={false}
        icon={profile}
        className="mute-button"
      />
    </div>
  );
}
