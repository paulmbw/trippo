import CitiesCard from "@/components/CitiesCard";
import type { GenerateState } from "@/lib/actions";

type Props = GenerateState;

export default function CitiesPreviewGrid({ cities }: Props) {
  return (
    <div>
      <h2 className="text-3xl">Discover your next destination</h2>
      
      <div>
        <CitiesCard {...cities[0]} />
        <CitiesCard {...cities[1]} />
        <CitiesCard {...cities[2]} />
      </div>
    </div>
  );
}
