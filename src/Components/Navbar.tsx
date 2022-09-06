import {
  HomeOutlined,
  PlusOutlined,
  TeamOutlined,
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useContext, useState } from "react";
import styled from "@emotion/styled";
import { FormattedMenu } from "./Style";
import { useGlobalContext } from "./UserContext";

const items: MenuProps["items"] = [
  {
    label: (
      <a href="/" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: "home",
    icon: <HomeOutlined />,
  },
  {
    label: (
      <a href="/create" rel="noopener noreferrer">
        Create new journey
      </a>
    ),
    key: "create",
    icon: <PlusOutlined />,
  },
  {
    label: (
      <a href="/about" rel="noopener noreferrer">
        About
      </a>
    ),
    key: "about",
    icon: <TeamOutlined />,
  },
  {
    label: (
      <a href="/login" rel="noopener noreferrer">
        Login
      </a>
    ),
    key: "login",
    icon: <UserOutlined />,
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
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
