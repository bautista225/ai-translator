import { test, expect } from "vitest";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

test("E2E test - Translation works as expected", async () => {
  const user = userEvent.setup();

  const app = render(<App />);
  const translationAreaFrom = app.getByPlaceholderText("Write text");

  await user.type(translationAreaFrom, "Hola mundo");

  const result = await app.findByDisplayValue(
    /Hello world/i,
    {},
    { timeout: 4000 }
  );

  expect(result).toBeTruthy();
});
