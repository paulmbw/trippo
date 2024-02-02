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

  const cities = JSON.parse(response.choices[0].message.content) as {
    cities: City[];
  };

  return {
    result: cities,
    days,
    budget,
    from,
    details,
  };
};
