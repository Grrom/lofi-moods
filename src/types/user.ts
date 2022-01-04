import Badge from "./badge";

export default class LofiMoodsUser {
  name: string;
  imagesrc: string;
  id: string;
  badges?: Array<Badge>;

  constructor(
    name: string,
    imagesrc: string,
    id: string,
    badges?: Array<Badge>
  ) {
    this.name = name;
    this.imagesrc = imagesrc;
    this.badges = badges;
    this.id = id;
  }
}
