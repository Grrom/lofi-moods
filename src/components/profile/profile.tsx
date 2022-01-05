import { sendEmailVerification, signOut } from "@firebase/auth";
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

import "./profile.scss";
import { IconButton } from "../misc/icon-button/icon-button";
import Badge from "../../types/badge";
import profile from "../../assets/profile.svg";
import { useState } from "react";

export default function Profile() {
  const [hasSentVerification, setHasSentVerification] = useState(false);

  const isOpen = useModalProfile();

  const user = useUser();

  if (user.name === undefined) {
    return <LoginModal />;
  }

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
            src={user.imagesrc ?? profile}
            alt="user_image"
            className="user-image"
          />
          <div className="user-details">
            <div className="user-status">
              <h1 className="user-name">{user.name ?? "anonymous"}</h1>
              <div
                className={`verified ${!user.isVerified && "unverified"}`}
                onClick={() => {
                  if (!user.isVerified) {
                    Helpers.confirmDialog({
                      question: "Send verification link to your email?",
                      onConfirm: async () => {
                        if (hasSentVerification) {
                          return window.location.reload();
                        }
                        Helpers.showLoading("Sending Verification email");
                        try {
                          await sendEmailVerification(
                            authenticationHelper.auth.currentUser!,
                            { url: "https://jeromelalunio.tech/lofi-moods" }
                          );
                          setHasSentVerification(true);

                          Helpers.successToast(
                            "Email Sent! Please check your inbox"
                          );
                        } catch (e) {
                          Helpers.errorToast(Helpers.getFirebaseError(e));
                        }
                      },
                      confirmButtonColor: "green",
                    });
                  }
                }}
              >
                <span>{user.isVerified ? "verified" : "unverified"}</span>
                <img
                  src={verified}
                  alt="verified-icon"
                  className="verified-icon"
                />
              </div>
            </div>
            <div className="user-badges">
              {user.badges !== undefined ? (
                user.badges!.map((badge: Badge, index: number) => {
                  return (
                    <img
                      className="badge"
                      src={badge.iconsrc}
                      alt={badge.name}
                      title={badge.name}
                      key={badge.id + index}
                    />
                  );
                })
              ) : (
                <span>no badges yet</span>
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
              Helpers.errorToast(Helpers.getFirebaseError(e));
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
