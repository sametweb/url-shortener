import React, { useRef } from "react";

import { Button, Input, Tooltip } from "antd";
import { CopyOutlined } from "@ant-design/icons";

function Output({ shortened, resetState }) {
  const urlRef = useRef(null);

  return (
    <>
      <span className="message">Here is your shortened URL:</span>
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
        onClick={() => resetState()}
      >
        New URL
      </Button>
    </>
  );
}

export default Output;
