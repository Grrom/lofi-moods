import { MiniLoader } from "../loader/loader";

import "./action-button.scss";

interface _props {
  onClick: () => any;
  isLoading: boolean;
  text: string;
  icon: string;
  className?: string;
}
export function ActionButton({
  onClick,
  isLoading,
  text,
  icon,
  className,
}: _props) {
  return (
    <span
      className={`action-button ${className}`}
      title={text}
      onClick={() => {
        onClick();
      }}
    >
      {isLoading ? (
        <MiniLoader />
      ) : (
        <img src={icon} alt={text} className="icon" />
      )}
      <h4>{text} </h4>
    </span>
  );
}
