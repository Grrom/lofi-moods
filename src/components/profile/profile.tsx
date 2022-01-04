import Modal from "react-modal";
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
        hello world
      </Modal>
    );
  }
}
