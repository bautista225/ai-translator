import { Button, Form } from "react-bootstrap";
import { SelectorType } from "../types.d";
import { CopyToClipboardIcon, TextToSpeechIcon } from "./Icons";
import { CSSProperties } from "react";

interface Props {
  type: SelectorType;
  loading?: boolean;
  onChange?: (value: string) => void;
  value: string;
  languageCode: string;
}

const commonStyles: CSSProperties = {
  border: 0,
  height: "200px",
  resize: "none",
};

const getPlaceholder = ({
  type,
  loading,
}: {
  type: SelectorType;
  loading?: boolean;
}) => {
  if (type === SelectorType.From) return "Write text";
  if (loading === true) return "Translating...";
  if (type === SelectorType.To) return "Translation";
};

export const TranslationArea = ({
  loading,
  type,
  value,
  onChange,
  languageCode,
}: Props) => {
  const styles =
    type === SelectorType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: .ChangeEvent<HTMLTextAreaElement>) => {
    if (onChange) onChange(event.target.value);
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(value);
  };

  const handleTextToSpeech = () => {
    const utterance = new SpeechSynthesisUtterance(value);
    utterance.lang = languageCode;
    speechSynthesis.speak(utterance);
  };

  return (
    <div style={{ position: "relative" }}>
      <Form.Control
        as="textarea"
        placeholder={getPlaceholder({ type, loading })}
        autoFocus={type === SelectorType.From}
        style={styles}
        value={value}
        onChange={handleChange}
        disabled={type === SelectorType.To}
      />
      <div
        style={{ position: "absolute", left: 0, bottom: 0, display: "flex" }}
      >
        <Button variant="link" onClick={handleCopyToClipboard}>
          <CopyToClipboardIcon />
        </Button>
        <Button variant="link" onClick={handleTextToSpeech}>
          <TextToSpeechIcon />
        </Button>
      </div>
    </div>
  );
};
