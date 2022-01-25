import Badge from "../../../types/badge";

interface _props {
  badge: Badge;
}

export default function UserBadge({ badge }: _props) {
  return <div className="user-badge">{badge.name}</div>;
}
