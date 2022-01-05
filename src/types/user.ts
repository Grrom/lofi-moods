import Badge from "./badge";

export default class LofiMoodsUser {
  name: string;
  email: string;
  imagesrc: string;
  id: string;
  isVerified: boolean;
  badges?: Array<Badge>;

  constructor(
    name: string,
    email: string,
    imagesrc: string,
    id: string,
    isVerified: boolean,
    badges?: Array<Badge>
  ) {
    this.name = name === null ? email.substr(0, email.indexOf("@")) : name;
    this.email = email;
    this.imagesrc = imagesrc;
    this.id = id;
    this.isVerified = isVerified;
    this.badges = badges;
  }
}
