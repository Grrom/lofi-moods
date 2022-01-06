import { sendEmailVerification, signOut } from "@firebase/auth";
import Modal from "react-modal";
import { authenticationHelper, fireBaseHelper } from "../../App";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useUser, useUserUpdate } from "../../global-state/user-provider";
import Helpers from "../../helpers/helpers";
import LoginSignup from "../login-signup/login-signup";

import "./profile.scss";
import { IconButton } from "../misc/icon-button/icon-button";
import Badge from "../../types/badge";
import { useEffect, useState } from "react";

import verified from "../../assets/verified.svg";
import logout from "../../assets/logout.svg";
import editImage from "../../assets/edit_image.svg";
import defaultProfile from "../../assets/default_profile.png";
import edit from "../../assets/edit.svg";

export default function Profile() {
  const [hasSentVerification, setHasSentVerification] = useState(false);

  const [userImage, setUserImage] = useState<string | null>(null);

  const isOpen = useModalProfile();

  const user = useUser();
  const userUpdate = useUserUpdate();

  useEffect(() => {
    async function getImage() {
      let image = await fireBaseHelper.getUserImage(user!.id);
      setUserImage(image);
    }
    if ((userImage === null || userImage === "refetch") && user !== null)
      getImage();
  }, [user, userImage]);

  if (user === null) {
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
          <div className="user-image">
            <img
              src={userImage ?? defaultProfile}
              alt="user_image"
              className="image"
            />
            <IconButton
              icon={editImage}
              isLoading={false}
              className="edit"
              onClick={() =>
                Helpers.fileInputAlert(
                  "Upload an image",
                  "image/*",
                  async (image) => {
                    //TO-DO: shrink image first before uploading
                    Helpers.showLoading("Uploading Image");
                    if (await fireBaseHelper.uploadImage(user.id, image)) {
                      Helpers.successToast("Image Successfully uploaded!");
                      setUserImage("refetch");
                    } else {
                      Helpers.errorToast("Failed to upload image");
                    }
                  }
                )
              }
            />
          </div>
          <div className="user-details">
            <div className="user-status">
              <h3 className="user-name">
                <span>{user.name}</span>
                <img
                  src={edit}
                  alt="edit"
                  className="icon"
                  onClick={() => {
                    Helpers.textInputAlert(
                      "Enter New Display name",
                      async (newName) => {
                        if (newName.length > 0) {
                          Helpers.showLoading("Updating Display name");
                          try {
                            await authenticationHelper.updateName(newName);
                            Helpers.successToast("Display name updated!");
                            const unsubscribe =
                              authenticationHelper.auth.onAuthStateChanged(
                                (user) => userUpdate(user)
                              );
                            authenticationHelper.triggerUpdate();
                            unsubscribe();
                          } catch (e) {
                            Helpers.errorToast(Helpers.getFirebaseError(e));
                          }
                        }
                      }
                    );
                  }}
                />
              </h3>
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
