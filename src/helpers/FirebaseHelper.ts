import {
  collection,
  getDocs,
  query,
  where,
  DocumentData,
} from "firebase/firestore";
import { getFirestore } from "firebase/firestore";
import { Music } from "../types/music";

export default class FireBaseHelper {
  firestore = getFirestore();

  fetchMusic = async (mood: string) => {
    console.log("fetching" + mood);
    const querySnapshot = await getDocs(
      query(
        collection(this.firestore, "music"),
        where("mood", "==", mood.toLowerCase())
      )
    );
    let datas: Array<DocumentData> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(new Music(data.artist, data.link, data.title, doc.id));
    });
    return datas;
  };
}
