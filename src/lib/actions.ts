"use server";

import OpenAI from "openai";
import { getUserMessage } from "./prompts";

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

  const json = await result.json();

  return json.photos[0].src.large as string;
}
