import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { DayDiv, FormDayDiv, StandardButton } from "../Components/Style";
import { Form, Input, InputNumber, Modal } from "antd";
import ButtonClassComponent from "../Components/ButtonClassComponent";
import {
  TRAVELDAY_QUERY,
  TRAVELDETAILS_QUERY,
} from "../Components/TravelQuery";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import {
  ADDTRAVELDAY_MUTATION,
  DELETETRAVELDAY_MUTATION,
  UPDATETRAVELDAY_MUTATION,
} from "../Components/TravelMutation";
const { TextArea } = Input;

type Days = {
  daynumber: number;
  description: string;
  travelId: string;
  id: string;
};

const JourneyDay = () => {
  const [value, setValue] = useState<Days>({
    daynumber: null,
    description: "",
    travelId: "",
    id: "",
  });

  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);

  const [travelDayModal, setTravelDayModal] = useState(false);

  const { data } = useQuery(TRAVELDETAILS_QUERY, {
    variables: {
      id: id,
    },
  });

  const [travelDayId, setTravelDayId] = useState("");
  const [travelDay, setTravelDay] = useState<Days>({
    daynumber: null,
    description: "",
    id: "",
    travelId: "",
  });

  const getIdOfTravelDay = (idOfTravelDay: string) => {
    setTravelDayId(idOfTravelDay);
  };

  const [getDay, { data: day }] = useLazyQuery(TRAVELDAY_QUERY);

  useEffect(() => {
    setTravelDay({
      daynumber: day?.travelDay?.daynumber,
      description: day?.travelDay?.description,
      id: day?.travelDay?.id,
      travelId: day?.travelDay?.travelId,
    });
  }, [day]);

  const updateJourneyDayModal = (dayId: string) => {
    getDay({
      variables: {
        id: dayId,
      },
    });

    setTravelDayModal(true);
  };

  const [addTravelDay] = useMutation(ADDTRAVELDAY_MUTATION);
  const [updateTravelDay] = useMutation(UPDATETRAVELDAY_MUTATION);
  const [deleteTravelDay] = useMutation(DELETETRAVELDAY_MUTATION);

  const updateJourneyDay = () => {
    updateTravelDay({
      variables: {
        input: travelDay,
        id: travelDayId,
      },
      refetchQueries: [{ query: TRAVELDETAILS_QUERY }, "TravelDetailsQuery"],
    });
    setTravelDayModal(false);
  };

  const deleteDay = (travelDayId: string) => {
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
    setValue({ daynumber: null, description: "", travelId: id, id: "" });
    setIsPending(false);
  };
  const defautSetting = 0;
  const minimum = 0;

  return (
    <>
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
                {item.daynumber && (
                  <StandardButton
                    onClick={() => {
                      getIdOfTravelDay(item.id);
                      updateJourneyDayModal(item.id);
                    }}
                  >
                    Update
                  </StandardButton>
                )}
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
              min={minimum}
              value={value.daynumber}
              onChange={(e) =>
                setValue({
                  daynumber: e,
                  description: value.description,
                  travelId: id,
                  id: travelDayId,
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
                  id: travelDayId,
                })
              }
            />
          </Form.Item>
          {!isPending && <ButtonClassComponent />}
        </Form>
      </FormDayDiv>

      <Modal
        title="Update your travel day"
        centered
        visible={travelDayModal}
        onOk={() => updateJourneyDay()}
        onCancel={() => setTravelDayModal(false)}
      >
        <Form.Item label="Add day number">
          <InputNumber
            defaultValue={defautSetting}
            min={minimum}
            value={travelDay?.daynumber}
            onChange={(e) =>
              setTravelDay({
                ...travelDay,
                daynumber: e,
              })
            }
          />
        </Form.Item>
        <Form.Item label="Add day description">
          <TextArea
            rows={4}
            value={travelDay?.description}
            onChange={(e) =>
              setTravelDay({
                ...travelDay,
                description: e.target.value,
              })
            }
          />
        </Form.Item>
      </Modal>
    </>
  );
};

export default JourneyDay;
