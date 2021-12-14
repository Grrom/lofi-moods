import { collection, getDocs } from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Music } from "../types/music";

export default class FireBaseHelper {
  firestore = getFirestore();

  fetchMusic = async (mood: string) => {
    console.log("fetching" + mood);
    const querySnapshot = await getDocs(collection(this.firestore, mood));
    let datas: Array<Music> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(new Music(data.artist, data.link, data.title, doc.id));
    });
    return datas;
  };
}
