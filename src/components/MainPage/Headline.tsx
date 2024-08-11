"use client";
import { TextGenerateEffect } from "../ui/text-generation-effect";

const words = `Membuat Link hanya dalam satu menit`;
const wordsChild = `Layanan seperti Link.id memungkinkan pengguna membuat halaman
profil yang mengumpulkan semua tautan penting dalam satu tempat
dengan tampilan yang sederhana dan responsif.`;

export function TextGenerateHeadline() {
  return (
    <TextGenerateEffect
      className={`text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter`}
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
