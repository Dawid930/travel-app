import { HomeOutlined, PlusOutlined, TeamOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Menu } from "antd";
import React, { useState } from "react";
import styled from "@emotion/styled";

const FormattedMenu = styled(Menu)(() => ({
  display: "flex",
  justifyContent: "right",
  color: "red",
}));


const items: MenuProps["items"] = [
  {
    label: (
      <a href="/" rel="noopener noreferrer">
        Home
      </a>
    ),
    key: 'home',
    icon: <HomeOutlined />
  },
  {
    label: (
      <a href="/create" rel="noopener noreferrer">
        Create new journey
      </a>
    ),
    key: 'create',
    icon: <PlusOutlined />
  },
  {
    label: (
      <a href="/about" rel="noopener noreferrer">
        About
      </a>
    ),
    key: 'about',
    icon: <TeamOutlined />
  },
];

const Navbar: React.FC = () => {
  const [current, setCurrent] = useState("mail");

  const onClick: MenuProps["onClick"] = (e) => {
    console.log("click ", e);
    setCurrent(e.key);
  };

  return (
    <>
      <FormattedMenu
        onClick={onClick}
        selectedKeys={[current]}
        mode="horizontal"
        items={items}
      />
    </>
  );
};

export default Navbar;
