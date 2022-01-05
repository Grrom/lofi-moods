import Badge from "./badge";

export default class LofiMoodsUser {
  name: string;
  imagesrc: string;
  id: string;
  isVerified: boolean;
  badges?: Array<Badge>;

  constructor(
    name: string,
    imagesrc: string,
    id: string,
    isVerified: boolean,
    badges?: Array<Badge>
  ) {
    this.name = name;
    this.imagesrc = imagesrc;
    this.id = id;
    this.isVerified = isVerified;
    this.badges = badges;
  }
}
