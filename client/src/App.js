import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { Row, Col } from "antd";
import { Layout } from "antd";

import InputArea from "./components/InputArea";
import RedirectUrl from "./components/RedirectUrl";
import Header from "./components/Header";
import About from "./components/About";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Layout className="wrapper">
        <Route path="/" component={Header} />
        <Layout.Content>
          <Row>
            <Col span={4}></Col>
            <Col span={16} className="input-area">
              <Route path="/" exact component={InputArea} />
              <Switch>
                <Route path="/about" component={About} />
                <Route path="/:id" component={RedirectUrl} />
              </Switch>
            </Col>
            <Col span={4}></Col>
          </Row>
        </Layout.Content>
        <Route path="/" component={Footer} />
      </Layout>
    </Router>
  );
}

export default App;
