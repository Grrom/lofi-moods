import { signOut } from "@firebase/auth";
import Modal from "react-modal";
import { authenticationHelper } from "../../App";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useUser } from "../../global-state/user-provider";
import Helpers from "../../helpers/helpers";
import LoginSignup from "../login-signup/login-signup";

import verified from "../../assets/verified.svg";
import logout from "../../assets/logout.svg";
import sampleBadge from "../../assets/sample_badge.png";

import "./profile.scss";
import { IconButton } from "../misc/icon-button/icon-button";
import Badge from "../../types/badge";

export default function Profile() {
  const isOpen = useModalProfile();

  const user = useUser();

  if (user.name === undefined) {
    return <LoginModal />;
  }

  const myBadge = new Badge(sampleBadge, "Gold badge", "sample_badge");

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="profile-modal"
      overlayClassName="overlay"
    >
      <div className="profile-card">
        <div className="user-card">
          <img
            src={
              user.imagesrc ??
              "https://camo.githubusercontent.com/4da3943d17cbd884c4da4c39a9d5e11ad2fa9dac39f7cbf5867c24ff05411f61/68747470733a2f2f6d656469612e67697068792e636f6d2f6d656469612f567577396d35775876694649512f67697068792e676966"
            }
            alt="user_image"
            className="user-image"
          />
          <div className="user-details">
            <div className="user-status">
              <h1 className="user-name">{user.name}jerome</h1>
              <div className="verified">
                <span> verified</span>
                <img src={verified} alt="" className="verified-icon" />
              </div>
            </div>
            <div className="user-badges">
              {[myBadge, myBadge, myBadge].map(
                (badge: Badge, index: number) => {
                  return (
                    <img
                      className="badge"
                      src={badge.iconsrc}
                      alt={badge.name}
                      title={badge.name}
                      key={badge.id + index}
                    />
                  );
                }
              )}
            </div>
          </div>
        </div>
        <IconButton
          icon={logout}
          isLoading={false}
          text="Logout"
          className="logout"
          onClick={(e) => {
            e.preventDefault();
            try {
              signOut(authenticationHelper.auth);
              Helpers.successToast("Logged out successfully");
            } catch (e) {
              let errorMessage = (e as any).code;
              Helpers.errorToast(
                errorMessage.substring(
                  errorMessage.indexOf("/") + 1,
                  errorMessage.length
                )
              );
            }
          }}
        />
      </div>
    </Modal>
  );
}

function LoginModal() {
  const isOpen = useModalProfile();
  const toggleModal = useModalProfileUpdate();

  return (
    <Modal
      isOpen={isOpen}
      ariaHideApp={false}
      className="login-modal"
      overlayClassName="overlay"
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      onRequestClose={() => toggleModal()}
    >
      <LoginSignup />
    </Modal>
  );
}
