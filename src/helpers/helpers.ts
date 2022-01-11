export default class Helpers {
  static getById = (id: string) => {
    return document.getElementById(id);
  };
  static inputGetter = (id: string) => {
    return (document.getElementById(id) as HTMLInputElement)!.value;
  };

  static getFirebaseError = (error: any) => {
    let errorMessage = (error as any).code;
    return errorMessage.substring(
      errorMessage.indexOf("/") + 1,
      errorMessage.length
    );
  };

  static toDateTime = (secs: number) => {
    var t = new Date(1970, 0, 1);
    t.setSeconds(secs);
    return t;
  };
}
