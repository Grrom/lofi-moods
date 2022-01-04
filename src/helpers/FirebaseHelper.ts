import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import Music from "../types/music";

export default class FireBaseHelper {
  firestore = getFirestore();

  public fetchMusic = async (mood: string): Promise<Array<Music>> => {
    const querySnapshot = await getDocs(collection(this.firestore, mood));
    let datas: Array<Music> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(new Music(data.artist, data.link, data.title, doc.id));
    });
    return datas;
  };

  public fetchMoods = async (): Promise<Array<string>> => {
    const querySnapshot = await getDocs(collection(this.firestore, "moods"));
    let datas: Array<string> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(data.name);
    });
    return datas;
  };
}
