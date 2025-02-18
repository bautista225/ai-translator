import { Form } from "react-bootstrap";
import { AUTO_LANGUAGE, SUPPORTED_LANGUAGES } from "../constants";
import { FromLanguage, Language, SelectorType } from "../types.d";

type Props =
  | {
      type: SelectorType.From;
      value: FromLanguage;
      onChange: (language: FromLanguage) => void;
    }
  | {
      type: SelectorType.To;
      value: Language;
      onChange: (language: Language) => void;
    };

export const LanguageSelector = ({ type, value, onChange }: Props) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value as Language);
  };

  return (
    <Form.Select
      aria-label="Select the language"
      onChange={handleChange}
      value={value}
    >
      {type === SelectorType.From && (
        <option value={AUTO_LANGUAGE}>Detect language</option>
      )}
      {Object.entries(SUPPORTED_LANGUAGES).map(([key, language]) => (
        <option key={key} value={key}>
          {language}
        </option>
      ))}
    </Form.Select>
  );
};
