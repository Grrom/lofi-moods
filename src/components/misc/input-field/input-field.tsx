import { useState } from "react";
import "./input-field.scss";

interface _props {
  type: string;
  label: string;
  icon: string;
}

export default function InputField({ type, label, icon }: _props) {
  const [passwordShown, setPasswordShown] = useState(false);

  return (
    <div className="input-field">
      <label className="label" htmlFor={label}>
        {label}
      </label>
      {type === "password" ? (
        <>
          <input
            className="input"
            type={passwordShown ? "text" : "password"}
            title={label}
            name={label}
          />
          <div className="checkbox">
            <label className="label">Show Password</label>
            <input
              type="checkbox"
              onChange={(value) => {
                setPasswordShown(() => value.target.checked);
              }}
            />
          </div>
        </>
      ) : (
        <input className="input" type={type} title={label} name={label} />
      )}
    </div>
  );
}
