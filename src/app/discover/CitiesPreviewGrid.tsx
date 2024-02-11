import CitiesCard from "@/components/CitiesCard";
import { saveDesitnation, type GenerateState } from "@/lib/actions";
import { useTransition } from "react";

type Props = GenerateState;

export default function CitiesPreviewGrid({
  cities,
  budget,
  from,
  days,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <div>
      <h2 className="text-3xl text-center font-bold mb-16">
        Discover your next destination
      </h2>

      <div className="grid grid-cols-3 gap-16">
        {cities.map((city, index) => {
          return (
            <CitiesCard
              onClick={() => {
                /**
                 * startTransition allows you to decide the priority of components (show higher priority components first while lower priority componends
                 * take time to render).
                 *
                 * In this example, we're using the pending state from useTransition to control the disabled state of the buttons. We want to provide some feedback
                 * to the user that something is happenning while clicking the discover button.
                 */
                startTransition(() => {
                  saveDesitnation(
                    city.name,
                    city.country,
                    city.description,
                    city.image || "",
                    budget,
                    from,
                    days
                  );
                });
              }}
              pending={pending}
              key={index}
              {...city}
            />
          );
        })}
      </div>
    </div>
  );
}
