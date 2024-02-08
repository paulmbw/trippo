import Container from "@/components/Container";
import { db } from "@/lib/db";
import { trips } from "@/lib/schema";
import Image from "next/image";

/**
 * React Server Component (RCS) - runs exclusively on the server. Javascript code
 * is not returned to the client - once the function completes, HTML is returned to the client.
 * @returns
 */

type Props = {
  id: string;
  city: string;
  country: string;
  description: string;
  imageUrl: string;
};

function TripPreviewCard({ city, country, description, imageUrl }: Props) {
  return (
    <div className="max-w-sm border border-gray-300 rounded-lg shadow-sm flex flex-col hover:scale-[102%] transition-transform duration-700">
      {imageUrl ? (
        <div className="aspect-video relative overflow-hidden">
          <Image
            className="object-cover rounded-t-lg"
            src={imageUrl}
            alt={`Image of ${city}`}
            fill
          />
        </div>
      ) : null}
      <div className="flex flex-col flex-grow p-6 pt-2">
        <div className="flex justify-between items-center py-3">
          <p className="text-xl font-bold">{city}</p>
          <p className="text-gray-600">{country}</p>
        </div>
        <p>{description}</p>
        <button className="mt-8 bg-blue-950 text-white rounded-lg p-2 w-full text-center font-medium">
          View your Trip
        </button>
      </div>
    </div>
  );
}

export default async function Home() {
  const allTrips = await db.select().from(trips);

  return (
    <Container>
      <h1 className="text-4xl my-8">Dashboard</h1>
      <div className="grid grid-cols-3 gap-16 pb-16">
        {allTrips.map((trip) => {
          return (
            <TripPreviewCard
              key={trip.id}
              {...trip}
              description={trip.descriptionShort}
            />
          );
        })}
      </div>
    </Container>
  );
}
