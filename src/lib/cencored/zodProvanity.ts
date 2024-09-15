import { z } from "zod";
import { matcher, BlockedWords } from "./BlockedText";
import { BlockedUrl } from "./BlockedUrl";

export const censoredString = <T extends z.ZodTypeAny>(
  schema: T,
  errorMessage: string = "Contains inappropriate language"
): T extends z.ZodOptional<z.ZodString>
  ? z.ZodOptional<z.ZodString>
  : z.ZodString => {
  const refinement = (value: string) =>
    !matcher.hasMatch(value) &&
    !BlockedWords.some((word: string) =>
      value.toLowerCase().includes(word.toLowerCase())
    );

  if (schema instanceof z.ZodOptional) {
    return schema.refine((value) => value === undefined || refinement(value), {
      message: errorMessage,
    }) as any;
  } else {
    return (schema as unknown as z.ZodString).refine(refinement, {
      message: errorMessage,
    }) as any;
  }
};

export const censoredUrl = (schema: z.ZodString) =>
  schema
    .refine(
      (url) => {
        const urlPattern =
          /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
        return urlPattern.test(url);
      },
      { message: "Invalid URL format" }
    )
    .refine(
      (url) => {
        return !BlockedUrl.some((domain) =>
          url.toLowerCase().includes(domain.toLowerCase())
        );
      },
      {
        message: "URL contains a blocked domain",
        params: { isBlocked: true },
      }
    );
