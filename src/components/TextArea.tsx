import { Form } from "react-bootstrap";
import { SelectorType } from "../types.d";

interface Props {
  type: SelectorType;
  loading?: boolean;
  onChange?: (value: string) => void;
  value: string;
}

const commonStyles = { border: 0, height: "200px", resize: "none" };

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

export const TextArea = ({ loading, type, value, onChange }: Props) => {
  const styles =
    type === SelectorType.From
      ? commonStyles
      : { ...commonStyles, backgroundColor: "#f5f5f5" };

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value);
  };

  return (
    <Form.Control
      as="textarea"
      placeholder={getPlaceholder({ type, loading })}
      autoFocus={type === SelectorType.From}
      style={styles}
      value={value}
      onChange={handleChange}
      disabled={type === SelectorType.To}
    />
  );
};
