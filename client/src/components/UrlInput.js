import React, { useRef, useState } from "react";
import axios from "axios";
import validateUrl from "../utils/validateUrl";
import Search from "antd/lib/input/Search";
import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";

function UrlInput() {
  const [shortened, setShortened] = useState("");
  const [validError, setValidError] = useState("");

  const urlRef = useRef(null);

  const shortenUrl = (url) => {
    if (validateUrl(url)) {
      setValidError("");
      setShortened("");
      axios
        .post("http://localhost:4000/", { url })
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
    <>
      <Input
        className="url-output"
        onFocus={(e) => e.target.select()}
        onClick={(e) => e.target.select()}
        value={shortened}
        ref={urlRef}
        suffix={
          <Tooltip title="Copy URL">
            <CopyOutlined
              onClick={() => {
                urlRef.current.select();
                document.execCommand("copy");
              }}
            />
          </Tooltip>
        }
      />
      <Button
        shape="round"
        size={25}
        className="new-url"
        onClick={() => {
          setValidError("");
          setShortened("");
        }}
      >
        New URL
      </Button>
    </>
  ) : (
    <>
      <Search
        placeholder="Input URL"
        enterButton="Shorten"
        size="large"
        onSearch={shortenUrl}
      />
      {validError && <span className="error">{validError}</span>}
    </>
  );
}

export default UrlInput;
