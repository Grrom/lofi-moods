import { useRef, useState } from "react";
import { authenticationHelper } from "../../App";
import "./login-signup.scss";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true);

  const emailRef = useRef(null as unknown as HTMLInputElement);
  const passwordRef = useRef(null as unknown as HTMLInputElement);

  if (isLogin) {
    return (
      <div id="login-form">
        <h2>Login</h2>
        <div>
          <span>email</span>
          <input type="email" ref={emailRef} />
        </div>
        <div>
          <span>password</span>
          <input type="password" ref={passwordRef} />
        </div>
        <h4>Forgot password?</h4>
        <button
          onClick={(event) => {
            event.preventDefault();
            authenticationHelper.login(
              emailRef.current.value,
              passwordRef.current.value
            );
            console.log(emailRef.current.value);
            console.log(passwordRef.current.value);
          }}
        >
          login
        </button>
        <button>Login with google</button>
        <h2>or</h2>
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
