import React, { useContext, useEffect, useState } from "react";
import { Card, Rate, Switch } from "antd";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import { ButtonDiv, StandardButton } from "./Style";
import { RATING_OPTIONS } from "./utils";
import { format } from "date-fns";
import { useQuery } from "@apollo/client";
import { TRAVELS_QUERY } from "./TravelQuery";
import { LoginContext } from "./UserContext";
import { TRAVEL_PER_PAGE } from "../constants";

const TravelBlocks = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();

  const [details, setDetails] = useState(false);

  const showDetails = (checked: boolean) => {
    setDetails(checked);
  };

  //const [page, setPage] = useState(0)
 
  const location = useLocation();

  const isNewPage = location.pathname.includes("travels");
  const pageIndexParams = location.pathname.split("/");
  const page = parseInt(pageIndexParams[pageIndexParams.length - 1]);
  const pageIndex = page ? (page - 1) * TRAVEL_PER_PAGE : 0;

  const { data } = useQuery(TRAVELS_QUERY, {
    variables: {
      showDetails: details,
      userId: loginContext.userContext.id,
      skip: isNewPage ? (page - 1) * TRAVEL_PER_PAGE : 0,
      take: isNewPage ? TRAVEL_PER_PAGE : 3,
    },
  });

  return (
    <>
      <h4>
        Show details: <Switch onChange={showDetails} />
      </h4>
      <div className="travel-list">
        {data?.travels?.map((travel, index) => (
          <div className="site-card-border-less-wrapper" key={travel.id} {...index + pageIndex}>
            <Card title={travel.title} bordered={false} style={{ width: 300 }}>
              <h4>{travel.country}</h4>
              {travel.location && <h4>Location: {travel.location}</h4>}
              {travel.description && <h4>Description: {travel.description}</h4>}
              {travel.companions && (
                <h4>Travel companions: {travel.travelCompanions}</h4>
              )}
              <h4>
                From: {format(new Date(travel.dateRange?.start), "yyyy-MM-dd")}
              </h4>
              <h4>
                To: {format(new Date(travel.dateRange?.end), "yyyy-MM-dd")}
              </h4>
              <h5>{travel.author}</h5>
              {travel.rating && (
                <span>
                  <Rate
                    tooltips={RATING_OPTIONS}
                    value={travel.rating}
                    disabled
                  />
                  {data ? (
                    <span className="ant-rate-text">
                      {RATING_OPTIONS[travel.rating - 1]}
                    </span>
                  ) : (
                    ""
                  )}
                </span>
              )}

              <Link to={`/travel/${travel.id}`}>
                <ButtonDiv>
                  <StandardButton>More details</StandardButton>
                </ButtonDiv>
              </Link>
            </Card>
          </div>
        ))}
        <Link to={`/create`}>
          <div className="plus-card">
            <Card bordered={false} style={{ width: 300 }}>
              <PlusOutlined style={{ fontSize: "100px", color: "red" }} />
              <h3>Add new journey</h3>
            </Card>
          </div>
        </Link>
      </div>
      <nav className="pagination">
        <StandardButton
          disabled={page === 1}
          onClick={() => {
            navigate(`/travels/${page - 1}`);
          }}
        >
          Previous
        </StandardButton>
        <StandardButton
          onClick={() => {
            if (page <= data?.travels?.length) {
              const nextPage = page + 1;
              navigate(`/travels/${nextPage}`);
            }
          }}
        >
          Next
        </StandardButton>
      </nav>
    </>
  );
};

export default TravelBlocks;
