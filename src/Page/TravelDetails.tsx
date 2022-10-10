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
import { Form, Input, InputNumber, Rate } from "antd";
import ButtonClassComponent from "../Components/ButtonClassComponent";
import format from "date-fns/format";
import { RATING_OPTIONS } from "../Components/utils";
import { TRAVELDETAILS_QUERY } from "../Components/TravelQuery";
import { useMutation, useQuery } from "@apollo/client";
import { ADDTRAVELDAY_MUTATION } from "../Components/TravelMutation";

const { TextArea } = Input;

type Days = {
  daynumber: number;
  description: string;
  travelId: string;
};

const TravelDetails = () => {
  const [value, setValue] = useState<Days>({
    daynumber: null,
    description: "",
    travelId: "",
  });
  const [travelList, setTravelList] = useState([
    { daynumber: null, description: "" },
  ]);

  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  const { data } = useQuery(TRAVELDETAILS_QUERY, {
    variables: {
      id: id,
    },
  });

  const [addTravelDay] = useMutation(ADDTRAVELDAY_MUTATION);

  const navigate = useNavigate();

  const handleClick = () => {};

  const addToList = () => {
    addTravelDay({
      variables: {
        input: value,
      },
    });
    setTravelList([...travelList, value]);
    setValue({ daynumber: null, description: "", travelId: id });
  };
  const defautSetting = 0;

  return (
    <>
      <TravelDiv>
        {data && (
          <div className="travel-page-item">
            <h2>{data.travel.title}</h2>
            <h3>{data.travel.location}</h3>
            <h4>{data.travel.description}</h4>
            {/* <h4>
              From: {format(new Date(data.dateRange?.start), "yyyy-MM-dd")}
            </h4>
            <h4>To: {format(new Date(data.dateRange?.end), "yyyy-MM-dd")}</h4> */}
            <h5>Travel companions: {data.travel.travelCompanions}</h5>
            <h5>{data.travel.author}</h5>
            <h5>
              <Rate
                tooltips={RATING_OPTIONS}
                value={data.travel.rating}
                disabled
              />
              {value ? (
                <span className="ant-rate-text">
                  {RATING_OPTIONS[data.travel.rating - 1]}
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
              <li key={item.daynumber}>
                <h1>
                  {item.daynumber && "Day: "}
                  {item.daynumber}
                </h1>
                <p>{item.description}</p>
                {item.daynumber && <StandardButton>Modify</StandardButton>}
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
            <InputNumber
              defaultValue={defautSetting}
              value={value.daynumber}
              onChange={(e) =>
                setValue({
                  daynumber: e,
                  description: value.description,
                  travelId: id,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Add day description">
            <TextArea
              rows={4}
              value={value.description}
              onChange={(e) =>
                setValue({
                  description: e.target.value,
                  daynumber: value.daynumber,
                  travelId: id,
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
