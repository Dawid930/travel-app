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
  h3: {
    marginBottom: "0em",
  },
}));

export const StandardButton = styled(Button)(() => ({
  padding: "5px 20px",
  color: "red",
  borderRadius: "50px",
  borderColor: "red",
  ":hover": {
    color: "white",
    backgroundColor: "red",
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

export const FormDayDiv = styled("div")(() => ({
  padding: "15px",
}));

/* const HomeIcon = styled(HomeOutlined)(() => ({
  color: "blue",
  ':hover': {
    color: 'red'
}
,
})); */
