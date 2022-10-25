import TravelBlocks from "../Components/TravelBlocks";
import { LoginContext } from "../Components/UserContext";
import { LogoutOutlined } from "@ant-design/icons";
import { UserDiv } from "../Components/Style";

import { useQuery} from "@apollo/client";
import { TRAVELS_QUERY } from "../Components/TravelQuery";
import { AUTH_TOKEN } from "../constants";

import { useContext } from "react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  return (
    <>
      {loginContext.userContext.name === guestUser ? navigate("/login"): (
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
