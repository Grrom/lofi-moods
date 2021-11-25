export class Music {
  artist: string;
  link: string;
  title: string;
  id: string;

  constructor(artist: string, link: string, title: string, id: string) {
    this.artist = artist;
    this.link = link;
    this.title = title;
    this.id = id;
  }
}
