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
import { Button, Form, Input, InputNumber, Modal, Rate, DatePicker } from "antd";
import ButtonClassComponent from "../Components/ButtonClassComponent";
import format from "date-fns/format";
import { RATING_OPTIONS } from "../Components/utils";
import { TRAVELDETAILS_QUERY, TRAVELS_QUERY } from "../Components/TravelQuery";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADDTRAVELDAY_MUTATION,
  DELETETRAVELDAY_MUTATION,
  DELETETRAVEL_MUTATION,
  UPDATETRAVEL_MUTATION,
} from "../Components/TravelMutation";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

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
  const [modal2Open, setModal2Open] = useState(false);


  const { id } = useParams();
  const { data, error } = useQuery(TRAVELDETAILS_QUERY, {
    variables: {
      id: id,
    },
  });

  const [travelDetails, setTravelDetails] = useState({
    title: data?.travel?.title,
    country: data?.travel?.country,
    location: data?.travel?.location,
    dateRange: {
      start: data?.travel?.dateRange.start,
      end: data?.travel?.dateRange.end,
    },
    description: data?.travel?.description,
    travelCompanions: data?.travel?.travelCompanions,
    rating: data?.travel?.rating,
  })
  

  const [addTravelDay] = useMutation(ADDTRAVELDAY_MUTATION);
  const [updateTravel] = useMutation(UPDATETRAVEL_MUTATION);
  const [deleteTravel] = useMutation(DELETETRAVEL_MUTATION);
  const [deleteTravelDay] = useMutation(DELETETRAVELDAY_MUTATION);

  const navigate = useNavigate();

  const updateJourneyModal = () => {
    setModal2Open(true)
  };

  const updateJourney = () =>{
    updateTravel({
      variables: {
        input: travelDetails,
        id: id
      },
      refetchQueries: [{ query: TRAVELDETAILS_QUERY}, "TravelDetailsQuery"]
    });
    setModal2Open(false)
  }

  const deleteJourney = () => {
    deleteTravel({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: TRAVELS_QUERY }],
    });
    navigate("/");
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
              <StandardButton onClick={updateJourneyModal}>Update</StandardButton>
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
                {item.daynumber && <StandardButton>Update</StandardButton>}
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

      <Modal
        title="Update your travel"
        centered
        visible={modal2Open}
        onOk={() => updateJourney()}
        onCancel={() => setModal2Open(false)}
      >
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        //onFinish={handleSubmit}
        //onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please add a title!" }]}
        >
          <Input
            value={travelDetails.title}
            onChange={(e) => setTravelDetails({ ...travelDetails, title: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Country">
          <Input
            value={travelDetails.country}
            onChange={(e) => setTravelDetails({ ...travelDetails, country: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Location">
          <Input
            value={travelDetails.location}
            onChange={(e) => setTravelDetails({ ...travelDetails, location: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="RangePicker">
          <RangePicker
            onChange={(e) => {
              setTravelDetails({
                ...travelDetails,
                dateRange: { start: e?.[0]?.toDate(), end: e?.[1]?.toDate() },
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={travelDetails.description}
            onChange={(e) =>
              setTravelDetails({ ...travelDetails, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Travel companions">
          <InputNumber
            defaultValue={defautSetting}
            value={travelDetails.travelCompanions}
            onChange={(e) => setTravelDetails({ ...travelDetails, travelCompanions: e })}
          />
        </Form.Item>

        <Form.Item label="Rating">
          <span>
            <Rate
              tooltips={RATING_OPTIONS}
              onChange={(e) => setTravelDetails({ ...travelDetails, rating: e })}
              value={travelDetails.rating}
            />
            {travelDetails.rating ? (
              <span className="ant-rate-text">
                {RATING_OPTIONS[travelDetails.rating - 1]}
              </span>
            ) : (
              ""
            )}
          </span>
        </Form.Item>
      </Form>
      </Modal>
    </>
  );
};

export default TravelDetails;
