"use client";

import { Trip } from "@/lib/schema";
import { Hotel, Lightbulb, Plane } from "lucide-react";
import Image from "next/image";
import { deleteTrip } from "@/lib/actions";
import { useTransition } from "react";

type Props = Trip;

export default function TripDetail({
  id,
  imageUrl,
  city,
  country,
  descriptionLong,
  flightTime,
  flightMin,
  flightMax,
  hotel3,
  hotel4,
  hotel5,
  tip,
}: Props) {
  const [pending, startTransition] = useTransition();

  return (
    <>
      <div className="text-center space-y-6">
        <div className="relative aspect-video">
          <Image
            src={imageUrl}
            alt={`A picture of ${city}`}
            fill
            className="object-cover rounded-3xl"
          />
        </div>
        <div>
          <h1 className="text-3xl font-bold pt-4">{city}</h1>
          <p className="pt-1 text-sm uppercase tracking-wide"> {country} </p>
        </div>
        <p className="text-xl leading-7">{descriptionLong}</p>
        <div className="flex justify-center items-center space-x-3">
          <Plane /> <p>{flightTime}</p> <p>•</p>
          <p>
            ${flightMin} - ${flightMax}
          </p>
        </div>
        <div className="flex justify-center items-center space-x-4">
          <Hotel /> <p>3 ★ ${hotel3}</p> <p>•</p> <p>4 ★ ${hotel4}</p> <p>•</p>
          <p>5 ★ ${hotel5}</p>
        </div>
      </div>
      <div className="mt-16 p-8 border rounded-xl shadow space-y-3 flex flex-col items-center">
        <Lightbulb />
        <p className="uppercase text-sm font-bold">Traveler&apos;s Tip:</p>
        <p className="text-center">{tip}</p>
      </div>

      <div className="flex justify-end mt-8">
        <button
          disabled={pending}
          onClick={() => startTransition(() => deleteTrip(id))}
          className="border px-3 py-2 rounded-xl text-sm text-white bg-red-500 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Delete Trip
        </button>
      </div>
    </>
  );
}
