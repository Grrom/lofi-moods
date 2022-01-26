import Badge from "./badge";
import { nullableString } from "./types";

export default class ChatSender {
  name: nullableString;
  badges?: Array<Badge>;

  constructor(name: nullableString, badges?: Array<Badge>) {
    this.name = name;
    this.badges = badges;
  }
}
