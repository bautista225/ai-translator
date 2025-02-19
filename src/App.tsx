import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useTranslation } from "./hooks/useTranslation";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";
import { AUTO_LANGUAGE, DEBOUNCE_DELAY } from "./constants";
import { InterchangeIcon } from "./components/Icons";
import { LanguageSelector } from "./components/LanguageSelector";
import { SelectorType } from "./types.d";
import { TranslationArea } from "./components/TranslationArea";
import { useEffect } from "react";
import { translate } from "./services/translator";
import { useDebounce } from "./hooks/useDebounce";
import { FooterBar } from "./components/FooterBar";

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
  } = useTranslation();

  const debouncedFromText = useDebounce(fromText, DEBOUNCE_DELAY);

  useEffect(() => {
    console.log("Using translation service");
    console.log(debouncedFromText);

    if (debouncedFromText === "") {
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
      .catch((error) => {
        console.log({ error });
        setResult("Error while translating. Try refreshing the page.");
      });
  }, [debouncedFromText, fromLanguage, toLanguage]);

  return (
    <div className="app">
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
                languageCode={fromLanguage}
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
                languageCode={toLanguage}
              />
            </Stack>
          </Col>
        </Row>
      </Container>
      <FooterBar />
    </div>
  );
}

export default App;
