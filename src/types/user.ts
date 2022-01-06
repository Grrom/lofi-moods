import Badge from "./badge";

export default class LofiMoodsUser {
  name: string;
  email: string;
  id: string;
  isVerified: boolean;
  badges?: Array<Badge>;

  constructor(
    name: string,
    email: string,
    id: string,
    isVerified: boolean,
    badges?: Array<Badge>
  ) {
    this.name = name !== null ? name : email.substr(0, email.indexOf("@"));
    this.email = email;
    this.id = id;
    this.isVerified = isVerified;
    this.badges = badges;
  }
}
