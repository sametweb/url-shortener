import React from "react";
import { Link } from "react-router-dom";

import { Layout } from "antd";

function Footer() {
  return (
    <Layout.Footer style={{ textAlign: "center" }}>
      <Link to="/" alt="url shortening service">
        omiturl.com
      </Link>{" "}
      &copy; 2020 Created by{" "}
      <a href="https://github.com/sametweb" alt="Samet Mutevelli">
        Samet Mutevelli
      </a>
    </Layout.Footer>
  );
}

export default Footer;
