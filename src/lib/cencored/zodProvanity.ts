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
        // Allow both domain-only and full URL formats
        const urlPattern = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(:\d+)?(\/.*)?$/;
        return urlPattern.test(url);
      },
      { message: "Invalid URL or domain format" }
    )
    .refine(
      (url) => {
        // Normalize the URL for checking against blocked domains
        const normalizedUrl = url.startsWith('http') ? url : `https://${url}`;
        const urlObject = new URL(normalizedUrl);
        const domain = urlObject.hostname.toLowerCase();

        return !BlockedUrl.some((blockedDomain) =>
          domain.includes(blockedDomain.toLowerCase())
        );
      },
      {
        message: "URL contains a blocked domain",
        params: { isBlocked: true },
      }
    )
    .transform((url) => {
      // Normalize the URL by adding https:// if it's missing
      return url.startsWith('http') ? url : `https://${url}`;
    });
