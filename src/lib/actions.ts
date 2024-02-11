"use server";

import OpenAI from "openai";
import { getSaveDestinationUserMessage, getUserMessage } from "./prompts";
import { db } from "./db";
import { trips } from "./schema";
import { nanoid } from "nanoid";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";

const openai = new OpenAI();

// Server actions allow clients to call the server. This code will not be available on the client.

export type City = {
  name: string;
  country: string;
  description: string;
  reasons: string[];
  image?: string;
};

export type GenerateState = {
  cities: City[];
  days: number;
  budget: number;
  from: string;
  details: string;
};

export const generateDestinations = async (
  _: GenerateState | null,
  formData: FormData
) => {
  const days = Number(formData.get("days"));
  const budget = Number(formData.get("budget"));
  const from = String(formData.get("from"));
  const details = String(formData.get("details"));

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a travel assistant helping clients find the best holidays",
      },
      {
        role: "user",
        content: getUserMessage({ days, budget, from, details }),
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  if (!response.choices[0].message.content) {
    return null;
  }

  const { cities } = JSON.parse(response.choices[0].message.content) as {
    cities: City[];
  };

  for (const city of cities) {
    const imageUrl = await fetchImage(city.name);
    city.image = imageUrl;
  }

  return {
    cities,
    days,
    budget,
    from,
    details,
  };
};

async function fetchImage(query: string) {
  const url = `${process.env.PEXELS_API_URL}/search?query=${query}&per_page=1`;

  const result = await fetch(url, {
    headers: {
      Authorization: process.env.PEXELS_API_KEY!!,
    },
  });

  const json = (await result.json()) as {
    photos: {
      src: {
        large: string;
      };
    }[];
  };

  return json.photos[0].src.large as string;
}

type OpenAIResponse = {
  trip_description: string;
  flight_price_min: number;
  flight_price_max: number;
  flight_time: string;
  hotel_price: {
    "3": number;
    "4": number;
    "5": number;
  };
  tip: string;
  itinerary: {
    day: number;
    title: string;
    description: string;
    activities: string[];
  }[];
};

export const saveDesitnation = async (
  city: string,
  country: string,
  descriptionShort: string,
  imageUrl: string,
  budget: number,
  from: string,
  days: number
) => {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    messages: [
      {
        role: "system",
        content:
          "You are a travel assistant helping clients find the best holidays",
      },
      {
        role: "user",
        content: getSaveDestinationUserMessage({
          city,
          country,
          details: descriptionShort,
          days,
          budget,
          from,
        }),
      },
    ],
    response_format: {
      type: "json_object",
    },
  });

  const content = response.choices[0].message.content;

  if (!content) {
    return null;
  }

  const tripDetails = JSON.parse(content) as OpenAIResponse;

  const id = nanoid(14);

  await db.insert(trips).values({
    id,
    city,
    country,
    descriptionShort,
    imageUrl,
    descriptionLong: tripDetails.trip_description,
    flightMin: tripDetails.flight_price_min,
    flightMax: tripDetails.flight_price_max,
    flightTime: tripDetails.flight_time,
    hotel3: tripDetails.hotel_price["3"],
    hotel4: tripDetails.hotel_price["4"],
    hotel5: tripDetails.hotel_price["5"],
    tip: tripDetails.tip,
    itinerary: tripDetails.itinerary,
  });

  revalidatePath("/dashboard");
  redirect(`/trips/${id}`);
};

export const deleteTrip = async (tripId: string) => {
  await db.delete(trips).where(eq(trips.id, tripId));

  revalidatePath("/dashboard");
  redirect("/dashboard");
};
