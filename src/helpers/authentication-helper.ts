import { FirebaseApp } from "@firebase/app";
import { Auth, getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default class AuthenticationHelper {
  auth: Auth;

  public signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
