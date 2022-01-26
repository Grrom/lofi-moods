import premium from "../../../assets/premium.svg";
import "./badge.scss";

interface _props {
  badge: string;
}

export default function UserBadge({ badge }: _props) {
  function getIcon() {
    return premium;
  }

  return <img src={getIcon()} alt={badge} title={badge} className="badge" />;
}
