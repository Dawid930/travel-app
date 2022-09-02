import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Travels, Travel } from "../Interface/Travel";
import useFetch from "./useFetch";
import data from "../Data";
import { ButtonDiv, DayDiv, FormDayDiv, StandardButton, TravelDiv } from "./Style";
import { Form, Input, Rate } from "antd";
import ButtonClassComponent from "./ButtonClassComponent";

const { TextArea } = Input;

type Days = {
  dayNumber: string;
  dayDesc: string;
};

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

const TravelDetails = () => {
  const [value, setValue] = useState<Days>({ dayNumber: "", dayDesc: "" });
  const [list, setList] = useState([{ dayNumber: "", dayDesc: "" }]);

  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  //const {data: travel, error, isPending,} = useFetch('http://localhost:8000/travels/' + id);
  const travel = data.find((travel) => travel.id === Number(id));
  const navigate = useNavigate();

  //Deletes the whole travel
  const handleClick = () => {
    fetch("http://localhost:8000/travels/" + id, {
      method: "DELETE",
    }).then(() => {
      navigate("/");
    });
  };

  /*   //Should be modified to handle new day additions
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const travelDays = {
      dayDescription,
    };
    console.log(travel);
    setIsPending(true);

    fetch("http://localhost:8000/travels/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(travelDays),
    }).then(() => {
      console.log("new added");
      setIsPending(false);
    });
  }; */

  const addToList = () => {
    let arr = list;
    arr.push(value);

    setList(arr);
    console.log(list);

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
            <h4>From: {travel.dateRange.start}</h4>
            <h4>To: {travel.dateRange.end}</h4>
            <h5>{travel.author}</h5>
            <h5>
              <Rate tooltips={desc} value={travel.rating} disabled />
              {value ? (
                <span className="ant-rate-text">{desc[travel.rating - 1]}</span>
              ) : (
                ""
              )}
            </h5>
            <ButtonDiv><StandardButton onClick={handleClick}>Delete</StandardButton></ButtonDiv>
          </div>
        )}
      </TravelDiv>


        <DayDiv>
          {list.length <= 1 && <h1>Add new day below!</h1>}
          <ul>
            {list.length > 0 &&
              list.map((item) => (
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
              //onChange={(e) => console.log((e.target.value))}
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
