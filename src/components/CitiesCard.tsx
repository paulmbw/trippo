import type { City } from "@/lib/actions";

type Props = City;

export default function CitiesCard({ name, country, description }: Props) {
  console.log("name: ", name);
  return (
    <div>
      <p>{name}</p>
      <p>{country}</p>
      <p>{description}</p>
    </div>
  );
}
