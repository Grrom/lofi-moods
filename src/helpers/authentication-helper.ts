import { FirebaseApp } from "@firebase/app";
import { Auth, getAuth } from "firebase/auth";

export default class AuthenticationHelper {
  auth: Auth;

  constructor(firebaseInstance: FirebaseApp) {
    this.auth = getAuth(firebaseInstance);
  }
}
