import Badge from "./badge";
import { nullableString } from "./types";

export default class ChatSender {
  name: nullableString;
  imageSrc: nullableString;
  isVerified: boolean;
  badges?: Array<Badge>;

  constructor(
    name: nullableString,
    imageSrc: nullableString,
    isVerified: boolean,
    badges?: Array<Badge>
  ) {
    this.name = name;
    this.imageSrc = imageSrc;
    this.isVerified = isVerified;
    this.badges = badges;
  }
}
