import TravelBlocks from "../Components/TravelBlocks";
import { LoginContext } from "../Components/UserContext";
import { LogoutOutlined } from "@ant-design/icons";
import { UserDiv } from "../Components/Style";

import { useQuery } from "@apollo/client";
import { TRAVELS_QUERY } from "../Components/TravelQuery";
import { AUTH_EMAIL, AUTH_ID, AUTH_NAME, AUTH_TOKEN } from "../constants";

import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const { data: travels, error } = useQuery(TRAVELS_QUERY, {
    variables: {
      showDetails: true,
      userId: loginContext.userContext.id,
    },
  });

  const logOut = () => {
    loginContext.setUserContext({ name: "", email: "", id: "" });
    localStorage.removeItem(AUTH_TOKEN);
    localStorage.removeItem(AUTH_NAME);
    localStorage.removeItem(AUTH_EMAIL);
    localStorage.removeItem(AUTH_ID);
  };

  useEffect(() => {
    loginContext.userContext.id === "" && navigate("/login");
  }, [loginContext]);

  return (
    <>
      <UserDiv>
        <h3>Welcome {loginContext.userContext.name}!</h3>
        <button onClick={() => logOut()}>
          <LogoutOutlined />
        </button>
      </UserDiv>
      <div className="homePage">
        {error && <div>{error.message}</div>}
        {travels && <TravelBlocks />}
      </div>
    </>
  );
};

export default Homepage;
