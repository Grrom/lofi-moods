import { createRef, useState } from "react";
import { authenticationHelper } from "../../App";
import { IconButton } from "../misc/icon-button/icon-button";
import InputField from "../misc/input-field/input-field";
import "./login-signup.scss";

import login from "../../assets/login.svg";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();

  if (isLogin) {
    return (
      <div className="form">
        <h1 className="title">Login</h1>
        <InputField type="email" label="Email" ref={emailRef} />
        <InputField type="password" label="Password" ref={passwordRef} />
        <h4
          className="clickable"
          onClick={() => {
            let remember = window.open();
            remember?.document.write(
              "<h1>This part is still under construction, in the meantime, Try to remember it ,C'mon you can do it!</h1>"
            );
          }}
        >
          Forgot password?
        </h4>
        <IconButton
          icon={login}
          isLoading={false}
          text={"Login"}
          className="button"
          onClick={() => {
            authenticationHelper.login(
              emailRef.current!.value,
              passwordRef.current!.value
            );
          }}
        />
        <h4 onClick={() => setIsLogin(() => false)} className="clickable">
          Sign up
        </h4>
      </div>
    );
  } else {
    return (
      <div className="form">
        <h1 className="title">Sign up</h1>
        <InputField type="email" label="Email" ref={emailRef} />
        <InputField type="password" label="Password" ref={passwordRef} />
        <IconButton
          icon={login}
          isLoading={false}
          text="Sign Up"
          className="button"
          onClick={() => {
            authenticationHelper.signup(
              emailRef.current!.value,
              passwordRef.current!.value
            );
          }}
        />
        <h4 onClick={() => setIsLogin(() => true)} className="clickable">
          Already have an account? Login
        </h4>
      </div>
    );
  }
}
