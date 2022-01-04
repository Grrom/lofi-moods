import { signOut } from "@firebase/auth";
import Modal from "react-modal";
import { authenticationHelper } from "../../App";
import {
  useModalProfile,
  useModalProfileUpdate,
} from "../../global-state/profile-modal-provider";
import { useUser } from "../../global-state/user-provider";
import LoginSignup from "../login-signup/login-signup";

import "./profile.scss";

export default function Profile() {
  const isOpen = useModalProfile();
  const toggleModal = useModalProfileUpdate();

  const user = useUser();

  if (user.name === undefined) {
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
  } else {
    return (
      <Modal
        isOpen={isOpen}
        ariaHideApp={false}
        className="profile-modal"
        overlayClassName="overlay"
      >
        <button
          onClick={(e) => {
            e.preventDefault();
            signOut(authenticationHelper.auth);
          }}
        >
          logout
        </button>
        {JSON.stringify(user)}
        hello world
      </Modal>
    );
  }
}
