"use client";

import Container from "@/components/Container";
import { generateDestinations } from "@/lib/actions";
import { useFormState } from "react-dom";
import CitiesPreviewGrid from "./CitiesPreviewGrid";

export default function Discover() {
  const [state, formAction] = useFormState(generateDestinations, null);
  console.log('state: ', state);

  return (
    <Container>
      <p className="text-4xl py-8">Discover your new trip here!</p>

      <form action={formAction} className="border p-8 rounded-xl">
        <div className="grid grid-cols-3 gap-8">
          <div>
            <label
              htmlFor="days"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              How many days are you travelling?
            </label>

            <div className="mt-2">
              <input
                id="days"
                name="days"
                type="number"
                placeholder="Between 3 and 10"
                required
                className="ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="budget"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              What is your max budget (in £)?
            </label>

            <div className="mt-2">
              <input
                id="budget"
                name="budget"
                type="number"
                placeholder="£5000"
                required
                className="appearance-none ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="from"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Where are you travelling from?
            </label>

            <div className="mt-2">
              <input
                id="from"
                name="from"
                type="text"
                placeholder="E.g. London"
                required
                className="ring-1 ring-inset ring-gray-300 block w-full rounded-md border-0 py-1.5 px-2 text-gray-900 shadow-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-2 max-w-lg mt-8">
          <label
            htmlFor="details"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Trip details
          </label>
          <small>
            In a sentence or two, describe what kind of trip you are looking
            for.
          </small>

          <textarea
            id="details"
            name="details"
            rows={4}
            className="block mt-2 w-full ring-1 ring-inset ring-gray-300 border-0 px-2 py-1.5"
            placeholder="I want to go on an adeventure trip. I like mountains, hiking and nature."
          />
        </div>

        <button className="bg-blue-600 text-white hover:bg-blue-500 rounded-xl px-4 py-2 mt-8">
          Submit
        </button>
      </form>

      {state ? (
        <div className="pt-8">
          <CitiesPreviewGrid {...state} />
        </div>
      ) : null}
    </Container>
  );
}
