import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Travels, Travel } from "../Interface/Travel";

import useFetch from "./useFetch";

const TravelDetails = () => {
  const { id } = useParams();
  const {data: [travel], error, isPending,} = useFetch("http://localhost:8000/travels/" + id);
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:8000/travels/" + travel.id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  //console.log(travels);
  

  return (
    <div className="travel-page">
      {error && <div>{error}</div>}
      {isPending && <div>Loading... </div>}
      {travel && (
        <div className="travel-page-item">
          <h4>{travel.title}</h4>
          <h4>{travel.location}</h4>
          <h4>{travel.description}</h4>
          <h4>{travel.date}</h4>
          <h5>{travel.author}</h5>
          <button onClick={handleClick}></button>
        </div>
      )}
    </div>
  );
};

export default TravelDetails;
