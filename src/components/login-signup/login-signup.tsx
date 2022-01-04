import { useState } from "react";
import "./login-signup.scss";

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(false);

  if (isLogin) {
    return (
      <div id="login-form">
        <h2>Login</h2>
        <div>
          <span>email</span>
          <input type="text" />
        </div>
        <div>
          <span>password</span>
          <input type="password" />
        </div>
        <h4>Forgot password?</h4>
        <button>login</button>
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
          <input type="text" />
        </div>
        <div>
          <span>password</span>
          <input type="password" />
        </div>
        <button>sign up</button>
        <button>Sign up with google</button>
        <h4 onClick={() => setIsLogin(() => true)} className="clickable">
          Already have an account? Login
        </h4>
      </div>
    );
  }
}
