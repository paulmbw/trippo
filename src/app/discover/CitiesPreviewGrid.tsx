import CitiesCard from "@/components/CitiesCard";
import type { GenerateState } from "@/lib/actions";

type Props = GenerateState;

export default function CitiesPreviewGrid({ cities }: Props) {
  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-16">
        Discover your next destination
      </h2>

      <div className="grid grid-cols-3 gap-16">
        {cities.map((city, index) => {
          return <CitiesCard key={index} {...city} />;
        })}
      </div>
    </div>
  );
}
