import React from "react";

import Search from "antd/lib/input/Search";

function Input({ shortenUrl, validError }) {
  return (
    <>
      <Search
        placeholder="Input long URL"
        enterButton="Shorten"
        size="large"
        onSearch={shortenUrl}
      />
      {validError && <span className="error">{validError}</span>}
    </>
  );
}

export default Input;
