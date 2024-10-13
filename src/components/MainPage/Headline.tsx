"use client";
import { TextGenerateEffect } from "../ui/text-generation-effect";
import { hero } from "@/lib/fonts/fonts";
const words = `Create a customable Link-in-Bio for Free! `;
const wordsChild = `Wisp Bio empowers professionals to create a centralized, 
customizable profile that consolidates essential links and information, 
presented through an elegant and responsive interface.`;

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
