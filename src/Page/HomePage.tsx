import TravelBlocks from "../Components/TravelBlocks";
import { LoginContext, } from "../Components/UserContext";
import { LogoutOutlined } from "@ant-design/icons";
import { UserDiv } from "../Components/Style";

import { useQuery, gql } from "@apollo/client";
import {TRAVELS_QUERY} from "../Components/TravelQuery";
import { AUTH_TOKEN } from '../constants';

import { useContext } from "react";


const Homepage = () => {
 
  const { data: travels, error } = useQuery(TRAVELS_QUERY);
  //const { userContext, setUserContext } = useGlobalContext();
  const loginContext = useContext(LoginContext)
  const guestUser = "Guest";
  const authToken = localStorage.getItem(AUTH_TOKEN,);
  
  const logOut = () => {
    loginContext.setUserContext({name: 'Guest'})
    localStorage.removeItem(AUTH_TOKEN)
  }

  return (
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
  );
};

export default Homepage;
