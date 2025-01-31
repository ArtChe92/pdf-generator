import { IData } from "../api/generate/route";

export const dynamic = "force-dynamic";

export default function Test({ data }: { data: IData[] }) {
  return (
    <ul>
      {data.map(({ id, name }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
}
