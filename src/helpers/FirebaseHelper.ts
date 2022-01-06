import { collection, getDocs, getFirestore } from "firebase/firestore";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import Music from "../types/music";

export default class FireBaseHelper {
  firestore = getFirestore();
  storage = getStorage();

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

  public getUserImage = async (userId: string): Promise<string | null> => {
    console.log("getting image");
    try {
      return await getDownloadURL(
        ref(this.storage, `user_images/${userId}.png`)
      );
    } catch {
      return null;
    }
  };
}
