import Modal from "react-modal";
import { useModalProfile } from "../../global-state/profile-modal-provider";

export default function LoginSignup() {
  const isOpen = useModalProfile();

  return <Modal isOpen={isOpen}>hello world</Modal>;
}
