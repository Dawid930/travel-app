import React from "react";
import TravelBlocks from "../Components/TravelBlocks";
import useFetch from "../Components/useFetch";
import { useGlobalContext } from "../Components/UserContext";
import { LogoutOutlined } from "@ant-design/icons";
import { UserDiv } from "../Components/Style";

const Homepage = () => {
  const { data: travels, error } = useFetch("http://localhost:8000/travels");
  const { user, setUser } = useGlobalContext();
  const guestUser = "Guest";

  return (
    <>
      <UserDiv>
        <h3>Welcome {user}!</h3>
        {user === guestUser || (
          <button onClick={() => setUser("Guest")}>
            <LogoutOutlined />
          </button>
        )}
      </UserDiv>
      <div className="homePage">
        {error && <div>{error}</div>}
        {travels && <TravelBlocks />}
      </div>
    </>
  );
};

export default Homepage;
