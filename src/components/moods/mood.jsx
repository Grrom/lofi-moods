import { fireBaseHelper } from "../../App";

export default function Mood({ name }) {
  return (
    <div
      className="mood"
      onClick={async () => console.log(await fireBaseHelper.fetchMusic(name))}
    >
      {name}
    </div>
  );
}
