import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Chat from "../types/chat";
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
    try {
      return await getDownloadURL(
        ref(this.storage, `user_images/${userId}.png`)
      );
    } catch {
      return null;
    }
  };

  public getUserName = async (userId: string): Promise<string | null> => {
    try {
      let user = await getDoc(doc(collection(this.firestore, "users"), userId));
      return user.data()?.name;
    } catch (e) {
      return "";
    }
  };

  public uploadImage = async (id: string, file: any): Promise<boolean> => {
    return await this.uploadFile(id, file, "user_images", "png");
  };

  public async getChats(mood: string) {
    const querySnapshot = await getDocs(
      collection(this.firestore, `${mood}_chatroom`)
    );
    let datas: Array<Chat> = [];
    querySnapshot.forEach((doc) => {
      let data = doc.data();
      datas.push(
        new Chat(
          data.senderId,
          data.message,
          data.dateSent,
          data.senderVerified
        )
      );
    });
    return datas;
  }

  private uploadFile = async (
    id: string,
    file: any,
    directory: string,
    type: string
  ) => {
    try {
      await uploadBytes(ref(this.storage, `${directory}/${id}.${type}`), file);
      return true;
    } catch {
      return false;
    }
  };
}
