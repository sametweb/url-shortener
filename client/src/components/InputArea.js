import { Col } from "antd";
import React from "react";
import UrlInput from "./UrlInput";

function InputArea(props) {
  return (
    <Col span={16} className="input-area">
      <UrlInput />
    </Col>
  );
}

export default InputArea;
