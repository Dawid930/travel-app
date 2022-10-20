import TravelBlocks from "../Components/TravelBlocks";
import { LoginContext } from "../Components/UserContext";
import { LogoutOutlined } from "@ant-design/icons";
import { StandardButton, UserDiv } from "../Components/Style";

import { useQuery, gql } from "@apollo/client";
import { TRAVELS_QUERY } from "../Components/TravelQuery";
import { AUTH_TOKEN } from "../constants";

import { useContext } from "react";

const Homepage = () => {
  const loginContext = useContext(LoginContext);
  const guestUser = "Guest";
  const authToken = localStorage.getItem(AUTH_TOKEN);
  
  const { data: travels, error } = useQuery(TRAVELS_QUERY, {
    variables: {
      showDetails: true,
      userId:loginContext.userContext.id
    },
  });
  

  const logOut = () => {
    loginContext.setUserContext({ name: "Guest", email: "", id: "" });
    localStorage.removeItem(AUTH_TOKEN);
  };

  return (
    <>
      {loginContext.userContext.name === guestUser ? (
        <div>
          <h1>Please log in</h1>
          <a href="/login">
            {" "}
            <StandardButton>Log In</StandardButton>
          </a>
        </div>
      ) : (
        <>
          <UserDiv>
            <h3>Welcome {loginContext.userContext.name}!</h3>
            {loginContext.userContext.name === guestUser || (
              <button onClick={() => logOut()}>
                <LogoutOutlined />
              </button>
            )}
          </UserDiv>
          <div className="homePage">
            {error && <div>{error.message}</div>}
            {travels && <TravelBlocks />}
          </div>
        </>
      )}
    </>
  );
};

export default Homepage;
