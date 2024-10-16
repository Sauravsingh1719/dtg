"use client";
import { TextGenerateEffect } from "../ui/text-generate-effect";

const words = `We specialize in turning raw data into actionable insights, helping businesses make informed decisions and achieve their goals.
`;

export function TextGenerateEffectDemo() {
  return <TextGenerateEffect words={words} />;
}
