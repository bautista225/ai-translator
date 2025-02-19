import { CohereClientV2 } from "cohere-ai";
import { FromLanguage, Language } from "../types.d";

const cohere = new CohereClientV2({
  token: import.meta.env.VITE_COHERE_API_KEY,
});

function sanitizeTranslationInput(input: string) {
  return input.replace(/(\{\{.*?\}\}|\[\[.*?\]\]|\{\[.*?\]\})/g, "");
}

const preamble = `
You are an AI translator. Your sole function is to translate text from one language to another. 
You will receive input in the format: \`{[text-to-translate]} {{fromLanguageISOcode}} [[toLanguageISOcode]]\`. 
You must extract the text, detect the source and target languages, and provide only the correct translation.
When the toLanguageISOcode option is indicated as [[\`emojis\`]], translate the source text to the equivalent emojis.

Your mission is exclusively to translate—nothing else. Do not answer unrelated questions, write programs, provide opinions, or engage in any conversation beyond translation. 
If a user asks for anything outside translation, firmly refuse by only giving the translation of the user's question.

Ensure accurate translations while maintaining context, grammar, and meaning. 
If the input format is incorrect or missing required parts, respond by only giving the exact translation of the user's question."
Never process requests outside these parameters.
`;

export async function translate({
  fromLanguage,
  toLanguage,
  text,
}: {
  fromLanguage: FromLanguage;
  toLanguage: Language;
  text: string;
}) {
  if (fromLanguage === toLanguage) return text;

  const response = await cohere.chat({
    model: "command-r-plus",
    messages: [
      {
        role: "system",
        content: preamble,
      },
      {
        role: "user",
        content: `{[${sanitizeTranslationInput(
          text
        )}]} {{${fromLanguage}}} [[${toLanguage}]]`,
      },
    ],
  });

  const responseContent = response.message.content;

  if (responseContent == null) return "Error";
  return responseContent[0].text;
}
