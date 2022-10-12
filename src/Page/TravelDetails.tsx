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
import { TRAVELDETAILS_QUERY, TRAVELS_QUERY } from "../Components/TravelQuery";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADDTRAVELDAY_MUTATION,
  DELETETRAVELDAY_MUTATION,
  DELETETRAVEL_MUTATION,
} from "../Components/TravelMutation";

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

  const [isPending, setIsPending] = useState(false);
  const { id } = useParams();
  const { data, error } = useQuery(TRAVELDETAILS_QUERY, {
    variables: {
      id: id,
    },
  });

  const [addTravelDay] = useMutation(ADDTRAVELDAY_MUTATION);
  const [deleteTravel] = useMutation(DELETETRAVEL_MUTATION);
  const [deleteTravelDay] = useMutation(DELETETRAVELDAY_MUTATION);

  const navigate = useNavigate();

  const handleClick = () => {};

  const deleteJourney = () => {
    
    deleteTravel({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: TRAVELS_QUERY }]
    });
    navigate("/")
  };

  const deleteDay = (travelDayId) => {
    deleteTravelDay({
      variables: {
        id: travelDayId,
      },
      refetchQueries: [{ query: TRAVELDETAILS_QUERY }, "TravelDetailsQuery"],
    });
  };

  const addToList = () => {
    setIsPending(true);
    addTravelDay({
      variables: {
        input: value,
      },
      refetchQueries: [{ query: TRAVELDETAILS_QUERY }, "TravelDetailsQuery"],
    });
    setValue({ daynumber: null, description: "", travelId: id });
    setIsPending(false);
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
              <StandardButton onClick={handleClick}>Update</StandardButton>
              <StandardButton onClick={deleteJourney}>Delete</StandardButton>
            </ButtonDiv>
          </div>
        )}
      </TravelDiv>

      <DayDiv>
        {data?.travel?.travelDays.length > 0 || <h1>Add new day below!</h1>}
        <ul>
          {data?.travel?.travelDays &&
            data?.travel?.travelDays?.map((item, index) => (
              <li key={index}>
                <h1>
                  {item.daynumber && "Day: "}
                  {item.daynumber}
                </h1>
                <p>{item.description}</p>
                {item.daynumber && <StandardButton>Modify</StandardButton>}
                {item.daynumber && (
                  <StandardButton onClick={() => deleteDay(item.id)}>
                    Delete
                  </StandardButton>
                )}
              </li>
            ))}
        </ul>
      </DayDiv>

      <FormDayDiv>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={addToList}
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
