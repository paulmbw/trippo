export type Itinerary = {
  day: number;
  title: string;
  description: string;
  activities: string[];
};

function ItineraryCard({ day, title, description, activities }: Itinerary) {
  return (
    <div className="flex border rounded-xl py-8 px-6 shadow-lg">
      <div className="flex flex-col space-y-2 w-1/2 pr-4">
        <h2 className="text-2xl">{day}</h2>
        <p className="italic font-bold">{title}</p>
        <p>{description}</p>
      </div>
      <ul className="w-1/2 space-y-2 my-auto">
        {activities.map((activity) => {
          return (
            <li className="text-sm" key={day + activity}>
              • {activity}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

type Props = {
  itinerary: Itinerary[];
};

export default function ItineraryList({ itinerary }: Props) {
  return (
    <div className="flex flex-col space-y-8 px-8">
      {itinerary.map((day) => {
        return <ItineraryCard {...day} />;
      })}
    </div>
  );
}
