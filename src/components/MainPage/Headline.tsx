"use client";
import { TextGenerateEffect } from "../ui/text-generation-effect";
import { hero } from "@/lib/fonts/fonts";
const words = `Create a customable Link-in-Bio for Free! `;
const wordsChild = `Services like Link.id allow users to create a profile page
that gathers all important links in one place
with a simple and responsive design.`;

export function TextGenerateHeadline() {
  return (
    <TextGenerateEffect
      className={`${hero.className} text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter`}
      duration={2}
      filter={false}
      words={words}
    />
  );
}
export function TextGenerateChild() {
  return (
    <TextGenerateEffect
      className={`text-sm md:text-base max-w-[600px`}
      duration={4}
      filter={true}
      words={wordsChild}
    />
  );
}
