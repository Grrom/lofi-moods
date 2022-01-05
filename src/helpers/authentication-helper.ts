import { FirebaseApp } from "@firebase/app";
import {
  Auth,
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export default class AuthenticationHelper {
  auth: Auth;

  public signup = (email: string, password: string) => {
    return createUserWithEmailAndPassword(this.auth, email, password);
  };

  public login = (email: string, password: string) => {
    return signInWithEmailAndPassword(this.auth, email, password);
  };

  public resetPassword = (email: string) => {
    return sendPasswordResetEmail(this.auth, email);
  };

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
