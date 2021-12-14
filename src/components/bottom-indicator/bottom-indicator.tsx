import "./bottom-indicator.scss";

interface _props {
  message: string;
}
export default function BottomIndicator({ message }: _props) {
  return <div id="bottom-indicator">{message}</div>;
}
