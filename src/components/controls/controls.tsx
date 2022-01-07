import mute from "../../assets/mute.svg";
import unMute from "../../assets/unMute.svg";
import profile from "../../assets/profile.svg";
import chat from "../../assets/chat.svg";

import { useMuted, useMutedUpdate } from "../../global-state/muted-provider";
import { IconButton } from "../misc/icon-button/icon-button";

import "./controls.scss";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useChatShownUpdate } from "../../global-state/chat-provider";

export default function Controls() {
  const toggleMuted = useMutedUpdate();
  const isMuted = useMuted();

  const toggleProfile = useModalProfileUpdate();
  const profileToggled = useModalProfile();

  const toggleChat = useChatShownUpdate();
  return (
    <div id="controls" className={profileToggled ? "box-shadow" : ""}>
      <IconButton
        onClick={() => toggleMuted()}
        isLoading={false}
        icon={isMuted ? mute : unMute}
      />
      <IconButton
        onClick={() => toggleProfile()}
        isLoading={false}
        icon={profile}
      />
      <IconButton onClick={() => toggleChat()} isLoading={false} icon={chat} />
    </div>
  );
}
