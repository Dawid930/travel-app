import { useMutation, useQuery } from "@apollo/client";
import { DatePicker, Form, Input, InputNumber, Modal, Rate } from "antd";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Travel } from "../Interface/Travel";
import { ButtonDiv, StandardButton, TravelDiv } from "./Style";
import { DELETETRAVEL_MUTATION, UPDATETRAVEL_MUTATION } from "./TravelMutation";
import { TRAVELDETAILS_QUERY, TRAVELS_QUERY } from "./TravelQuery";
import { RATING_OPTIONS } from "./utils";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

const Journey = () => {
  const { id } = useParams();
  const { data } = useQuery(TRAVELDETAILS_QUERY, {
    variables: {
      id: id,
    },
  });

  const [updateTravel] = useMutation(UPDATETRAVEL_MUTATION);
  const [deleteTravel] = useMutation(DELETETRAVEL_MUTATION);

  const [travelDetailsModal, setTravelDetailsModal] = useState(false);

  const [travelDetails, setTravelDetails] = useState<Travel>({
    title: "",
    country: "",
    location: "",
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
    description: "",
    travelCompanions: null,
    rating: null,
  });

  useEffect(() => {
    setTravelDetails({
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
    });
  }, [data]);

  const navigate = useNavigate();

  const updateJourneyModal = () => {
    setTravelDetailsModal(true);
  };

  const updateJourney = () => {
    updateTravel({
      variables: {
        input: travelDetails,
        id: id,
      },
      refetchQueries: [{ query: TRAVELDETAILS_QUERY }, "TravelDetailsQuery"],
    });
    setTravelDetailsModal(false);
  };

  const deleteJourney = () => {
    deleteTravel({
      variables: {
        id: id,
      },
      refetchQueries: [{ query: TRAVELS_QUERY }, "TravelQuery"],
    });
    navigate("/");
  };

  const defautSetting = 0;
  const minimum = 0;

  return (
    <>
      <TravelDiv>
        {data && (
          <div className="travel-page-item">
            <h2>{data.travel.title}</h2>
            <h3>{data.travel.location}</h3>
            <h4>{data.travel.description}</h4>
            <h4>
              From:{" "}
              {format(new Date(data.travel.dateRange?.start), "yyyy-MM-dd")}
            </h4>
            <h4>
              To: {format(new Date(data.travel.dateRange?.end), "yyyy-MM-dd")}
            </h4>
            <h5>Travel companions: {data.travel.travelCompanions}</h5>
            <h5>{data.travel.author}</h5>
            <h5>
              <Rate
                tooltips={RATING_OPTIONS}
                value={data.travel.rating}
                disabled
              />
              {data ? (
                <span className="ant-rate-text">
                  {RATING_OPTIONS[data.travel.rating - 1]}
                </span>
              ) : (
                ""
              )}
            </h5>
            <ButtonDiv>
              <StandardButton onClick={updateJourneyModal}>
                Update
              </StandardButton>
              <StandardButton onClick={deleteJourney}>Delete</StandardButton>
            </ButtonDiv>
          </div>
        )}
      </TravelDiv>
      <Modal
        title="Update your travel"
        centered
        visible={travelDetailsModal}
        onOk={() => updateJourney()}
        onCancel={() => setTravelDetailsModal(false)}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <Form.Item
            label="Title"
            rules={[{ required: true, message: "Please add a title!" }]}
          >
            <Input
              value={travelDetails.title}
              onChange={(e) =>
                setTravelDetails({ ...travelDetails, title: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Country">
            <Input
              value={travelDetails.country}
              onChange={(e) =>
                setTravelDetails({ ...travelDetails, country: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Location">
            <Input
              value={travelDetails.location}
              onChange={(e) =>
                setTravelDetails({ ...travelDetails, location: e.target.value })
              }
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
                setTravelDetails({
                  ...travelDetails,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label="Travel companions">
            <InputNumber
              defaultValue={defautSetting}
              min={minimum}
              value={travelDetails.travelCompanions}
              onChange={(e) =>
                setTravelDetails({ ...travelDetails, travelCompanions: e })
              }
            />
          </Form.Item>
          <Form.Item label="Rating">
            <span>
              <Rate
                tooltips={RATING_OPTIONS}
                onChange={(e) =>
                  setTravelDetails({ ...travelDetails, rating: e })
                }
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

export default Journey;
