import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Travels, Travel } from "../Interface/Travel";
import {
  ButtonDiv,
  DayDiv,
  FormDayDiv,
  StandardButton,
  TravelDiv,
} from "../Components/Style";
import { Form, Input, Rate } from "antd";
import ButtonClassComponent from "../Components/ButtonClassComponent";
import format from "date-fns/format";
import { RATING_OPTIONS } from "../Components/utils";
import {TRAVELDETAILS_QUERY} from "../Components/TravelQuery";
import { useQuery } from "@apollo/client";

const { TextArea } = Input;

type Days = {
  dayNumber: string;
  dayDesc: string;
};

const TravelDetails = () => {
  const [value, setValue] = useState<Days>({ dayNumber: "", dayDesc: "" });
  const [travelList, setTravelList] = useState([
    { dayNumber: "", dayDesc: "" },
  ]);

  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  //const {data: travel, error, isPending,} = useFetch('http://localhost:8000/travels/' + id);
  const {data} = useQuery(TRAVELDETAILS_QUERY)
  const travel = data.find((travel) => travel.id === Number(id));
  const navigate = useNavigate();


  const handleClick = () => {
    fetch("http://localhost:8000/travels/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };


  const addToList = () => {
    setTravelList([...travelList, value]);
    setValue({ dayNumber: "", dayDesc: "" });
  };

  return (
    <>
      <TravelDiv>
        {travel && (
          <div className="travel-page-item">
            <h2>{travel.title}</h2>
            <h3>{travel.location}</h3>
            <h4>{travel.description}</h4>
            <h4>
              From: {format(new Date(travel.dateRange?.start), "yyyy-MM-dd")}
            </h4>
            <h4>To: {format(new Date(travel.dateRange?.end), "yyyy-MM-dd")}</h4>
            <h5>Travel companions: {travel.travelCompanions}</h5>
            <h5>{travel.author}</h5>
            <h5>
              <Rate tooltips={RATING_OPTIONS} value={travel.rating} disabled />
              {value ? (
                <span className="ant-rate-text">
                  {RATING_OPTIONS[travel.rating - 1]}
                </span>
              ) : (
                ""
              )}
            </h5>
            <ButtonDiv>
              <StandardButton onClick={handleClick}>Delete</StandardButton>
            </ButtonDiv>
          </div>
        )}
      </TravelDiv>

      <DayDiv>
        {travelList.length <= 1 && <h1>Add new day below!</h1>}
        <ul>
          {travelList.length > 0 &&
            travelList.map((item) => (
              <li key={item.dayNumber}>
                <h1>
                  {item.dayNumber && "Day: "}
                  {item.dayNumber}
                </h1>
                <p>{item.dayDesc}</p>
                {item.dayNumber && <StandardButton>Modify</StandardButton>}
              </li>
            ))}
        </ul>
      </DayDiv>

      <FormDayDiv>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onSubmitCapture={addToList}
        >
          <Form.Item label="Add day number">
            <TextArea
              rows={1}
              value={value.dayNumber}
              onChange={(e) =>
                setValue({ dayNumber: e.target.value, dayDesc: value.dayDesc })
              }
            />
          </Form.Item>
          <Form.Item label="Add day description">
            <TextArea
              rows={4}
              value={value.dayDesc}
              onChange={(e) =>
                setValue({
                  dayDesc: e.target.value,
                  dayNumber: value.dayNumber,
                })
              }
            />
          </Form.Item>
          {!isPending && <ButtonClassComponent />}
        </Form>
      </FormDayDiv>
    </>
  );
};

export default TravelDetails;
