import Container from "@/components/Container";
import { db } from "@/lib/db";
import { trips } from "@/lib/schema";
import { Palmtree, Plus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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

function TripPreviewCard({ id, city, country, description, imageUrl }: Props) {
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
        <p className="mb-auto">{description}</p>
        <Link
          href={`/trips/${id}`}
          className="mt-8 bg-blue-950 text-white rounded-lg p-2 w-full text-center font-medium"
        >
          View your Trip
        </Link>
      </div>
    </div>
  );
}

function NoTrips() {
  return (
    <Container>
      <div className="text-center border-2 p-16 mt-16 border-dashed">
        <Palmtree className="mx-auto h-12 w-12 text-gray-400" strokeWidth={1} />
        <h3 className="mt-2 text-sm font-semibold text-gray-900">No Trips</h3>
        <p className="mt-1 text-sm text-gray-500">
          Get started by discovering a new destination.
        </p>
        <Link
          href="/discover"
          className="mt-6 inline-flex items-center rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500"
        >
          <Plus className="-ml-0.5 mr-1.5 h-5 w-5" />
          Discover a new trip
        </Link>
      </div>
    </Container>
  );
}

export default async function Home() {
  const allTrips = await db.select().from(trips);

  if (allTrips.length < 1) return <NoTrips />;

  return (
    <Container>
      <h1 className="text-4xl my-8">Dashboard</h1>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 content-center gap-16 pb-16">
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
