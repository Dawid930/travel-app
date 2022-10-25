import {
  HomeOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { FormattedMenu } from "./Style";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    label: (
      <Link to="/" rel="noopener noreferrer">
        Home
      </Link>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <Link to="/create" rel="noopener noreferrer">
        Create new journey
      </Link>
    ),
    key: "create",
    icon: <PlusOutlined />,
  },
  {
    label: (
      <Link to="/about" rel="noopener noreferrer">
        About
      </Link>
    ),
    key: "about",
    icon: <TeamOutlined />,
  },
  {
    label: (
      <Link to="/login" rel="noopener noreferrer">
        Login
      </Link>
    ),
    key: "login",
    icon: <UserOutlined />,
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    setCurrent(e.key);
  };

  return (
    <FormattedMenu
      onClick={onClick}
      selectedKeys={[current]}
      mode="horizontal"
      items={items}
    />
  );
};

export default Navbar;
