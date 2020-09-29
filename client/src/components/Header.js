import React from "react";
import { Link, useLocation } from "react-router-dom";

import { Menu } from "antd";
import { Layout } from "antd";

function Header() {
  const location = useLocation();

  return (
    <Layout.Header>
      <span className="logo">
        <Link to="/" alt="omitURL url shortening service">
          omitURL
        </Link>
      </span>
      <Menu theme="dark" mode="horizontal" selectedKeys={[location.pathname]}>
        <Menu.Item key="/about">
          <Link to="/about">About</Link>
        </Menu.Item>
      </Menu>
    </Layout.Header>
  );
}

export default Header;
