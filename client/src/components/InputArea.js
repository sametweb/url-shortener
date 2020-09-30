import React, { useState } from "react";
import axios from "axios";

import validateUrl from "../utils/validateUrl";
import Output from "./Output";
import Input from "./Input";

function InputArea() {
  const [shortened, setShortened] = useState("");
  const [validError, setValidError] = useState("");

  const resetState = () => {
    setValidError("");
    setShortened("");
  };

  const shortenUrl = (url) => {
    const isValid = validateUrl(url);

    if (isValid) {
      resetState();
      axios
        .post(process.env.BACK_END, { url })
        .then((res) => {
          setShortened(`${window.location.href}${res.data.id}`);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setShortened("");
      setValidError("Invalid URL");
    }
  };

  return shortened ? (
    <Output resetState={resetState} shortened={shortened} />
  ) : (
    <Input shortenUrl={shortenUrl} validError={validError} />
  );
}

export default InputArea;
