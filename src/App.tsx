import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useStore } from "./hooks/useStore";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE } from "./constants";
import { InterchangeIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SelectorType } from "./types.d";
import { TranslationArea } from "./components/TranslationArea";
import { useEffect } from "react";
import { translate } from "./services/translator";
import { useDebounce } from "./hooks/useDebounce";

function App() {
  const {
    fromLanguage,
    fromText,
    toLanguage,
    result,
    loading,
    setToLanguage,
    setFromLanguage,
    setResult,
    setFromText,
    interchangeLanguages,
  } = useStore();

  const debouncedFromText = useDebounce(fromText, 600);

  useEffect(() => {
    console.log("Using translation service");
    if (fromText === "") {
      setResult("");
      return;
    }

    translate({ fromLanguage, toLanguage, text: debouncedFromText })
      .then((result) => {
        console.log(result);
        if (result == null) return;
        if (Array.isArray(result)) result = result.join("");
        setResult(result);
      })
      .catch(() => {
        setResult("Error");
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  return (
    <Container fluid>
      <h1>AI translator</h1>
      <p>
        <em>with cohere technology</em>
      </p>
      <Row>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SelectorType.From}
              value={fromLanguage}
              onChange={setFromLanguage}
            />
            <TranslationArea
              value={fromText}
              onChange={setFromText}
              type={SelectorType.From}
            />
          </Stack>
        </Col>
        <Col xs="auto">
          <Button
            variant="link"
            disabled={fromLanguage === AUTO_LANGUAGE}
            onClick={() => {
              interchangeLanguages();
            }}
          >
            <InterchangeIcon />
          </Button>
        </Col>
        <Col>
          <Stack gap={2}>
            <LanguageSelector
              type={SelectorType.To}
              value={toLanguage}
              onChange={setToLanguage}
            />
            <TranslationArea
              value={result}
              type={SelectorType.To}
              loading={loading}
            />
          </Stack>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
