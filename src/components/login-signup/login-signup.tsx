import { useRef, useState } from "react";
import { authenticationHelper } from "../../App";
import { IconButton } from "../misc/icon-button/icon-button";
import InputField from "../misc/input-field/input-field";
import "./login-signup.scss";

import login from "../../assets/login.svg";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef(null as unknown as HTMLInputElement);
  const passwordRef = useRef(null as unknown as HTMLInputElement);

  if (isLogin) {
    return (
      <div id="login-form">
        <h1 className="title">Login</h1>
        <InputField type="email" icon="string" label="Email" />
        <InputField type="password" icon="string" label="Password" />
        {/* <h4>Forgot password?</h4>  todo*/}
        <IconButton
          icon={login}
          isLoading={false}
          text={"Login"}
          className="login-button"
          onClick={(event) => {
            event.preventDefault();
            authenticationHelper.login(
              emailRef.current.value,
              passwordRef.current.value
            );
          }}
        />
        <h3>or</h3>
        <h4 onClick={() => setIsLogin(() => false)} className="clickable">
          Sign up
        </h4>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Sign up</h2>
        <div>
          <span>email</span>
          <input type="text" ref={emailRef} />
        </div>
        <div>
          <span>password</span>
          <input type="password" ref={passwordRef} />
        </div>
        <button
          onClick={(event) => {
            event.preventDefault();
            authenticationHelper.signup(
              emailRef.current.value,
              passwordRef.current.value
            );
          }}
        >
          sign up
        </button>
        <button>Sign up with google</button>
        <h4 onClick={() => setIsLogin(() => true)} className="clickable">
          Already have an account? Login
        </h4>
      </div>
    );
  }
}
