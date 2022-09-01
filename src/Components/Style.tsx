import { Button } from "antd";
import styled from "@emotion/styled";
import { Menu } from "antd";

export const FormattedMenu = styled(Menu)(() => ({
  display: "flex",
  justifyContent: "right",
}));

export const UserDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "right",
  marginRight: "15px",
  padding: "10px",
  gap: "10px",
}));

export const StandardButton = styled(Button)(() => ({
  padding: "5px 10px",
  color: "red",
  ":hover": {
    color: "white",
    backgroundColor: "red",
    borderColor: "red",
  },
}));

export const ButtonDiv = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "15px",
}));

export const TravelDiv = styled(`div`)(() => ({
  height: "300px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#ececec",
}));

export const DayDiv = styled(`div`)(() => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  backgroundColor: "#f9f9f9",
  li: {
    listStyle: "none",
  },
}));
