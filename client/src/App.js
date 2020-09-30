import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import { Row, Col } from "antd";
import { Layout } from "antd";

import InputArea from "./components/InputArea";
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
              <Switch>
                <Route path="/" exact component={InputArea} />
                <Route path="/about" component={About} />
                <Route path="/not-found">
                  <span>Sorry, the URL you requested cannot be found! :(</span>
                </Route>
                <Route path="/:random">
                  <Redirect to="/" />
                </Route>
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
