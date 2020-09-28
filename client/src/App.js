import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Row, Col } from "antd";
import InputArea from "./components/InputArea";
import RedirectUrl from "./components/RedirectUrl";

function App(props) {
  return (
    <Row style={{ height: "100%" }}>
      <Col span={4}></Col>
      <Router>
        <Route path="/" exact component={InputArea} />
        <Route path="/:id" component={RedirectUrl} />
      </Router>
      <Col span={4}></Col>
    </Row>
  );
}

export default App;
