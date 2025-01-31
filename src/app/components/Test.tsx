import { IData } from "../api/generate/route";

export default function Test({ data }: { data: IData[] }) {
  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}
