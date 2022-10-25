import React, { useContext, useEffect, useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import {
  Form,
  Input,
  DatePicker,
  InputNumber,
  Upload,
  notification,
  Rate,
} from "antd";
import { ButtonDiv, StandardButton } from "../Components/Style";
import { RATING_OPTIONS } from "../Components/utils";
import { useMutation } from "@apollo/client";
import { ADDTRAVEL_MUTATION } from "../Components/TravelMutation";
import { TRAVELS_QUERY } from "../Components/TravelQuery";
import { Travel } from "../Interface/Travel";
import { LoginContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";

const { RangePicker } = DatePicker;
const { TextArea } = Input;

const Create = () => {
  const loginContext = useContext(LoginContext);
  const navigate = useNavigate();
  useEffect(() => {
    loginContext.userContext.id === "" && navigate("/login");
  }, [loginContext]);
  
  const [isPending, setIsPending] = useState(false);

  const [input, setInput] = useState<Travel>({
    title: "",
    country: "",
    location: "",
    dateRange: {
      start: new Date(),
      end: new Date(),
    },
    description: "",
    travelCompanions: 0,
    rating: 3,
  });

  const [addTravel] = useMutation(ADDTRAVEL_MUTATION);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    setIsPending(true);
    addTravel({
      variables: {
        input,
      },
      refetchQueries: [
        { query: TRAVELS_QUERY, variables: { showDetails: true } },
        "TravelQuery",
      ],
    });
    setIsPending(false);
    setInput({
      title: "",
      country: "",
      location: "",
      dateRange: {
        start: new Date(),
        end: new Date(),
      },
      description: "",
      travelCompanions: 0,
      rating: 3,
    });
  };

  const openNotification = () => {
    notification.open({
      message: "Your new journey is submitted!",
      description: "Now you can see the newly added element on the home page.",
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  const minimum = 0;

  return (
    <div className="form-input">
      <div className="form-input-head">
        <h2>Fill the form to add new journey!</h2>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onFinish={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Title"
          rules={[{ required: true, message: "Please add a title!" }]}
        >
          <Input
            value={input.title}
            onChange={(e) => setInput({ ...input, title: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Country">
          <Input
            value={input.country}
            onChange={(e) => setInput({ ...input, country: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Location">
          <Input
            value={input.location}
            onChange={(e) => setInput({ ...input, location: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="RangePicker">
          <RangePicker
            onChange={(e) => {
              setInput({
                ...input,
                dateRange: { start: e?.[0]?.toDate(), end: e?.[1]?.toDate() },
              });
            }}
          />
        </Form.Item>

        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={input.description}
            onChange={(e) =>
              setInput({ ...input, description: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Travel companions">
          <InputNumber
            min={minimum}
            value={input.travelCompanions}
            onChange={(e) => setInput({ ...input, travelCompanions: e })}
          />
        </Form.Item>

        <Form.Item label="Rating">
          <span>
            <Rate
              tooltips={RATING_OPTIONS}
              onChange={(e) => setInput({ ...input, rating: e })}
              value={input.rating}
            />
            {input.rating ? (
              <span className="ant-rate-text">
                {RATING_OPTIONS[input.rating - 1]}
              </span>
            ) : (
              ""
            )}
          </span>
        </Form.Item>

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>
        <Form.Item>
          {isPending ? (
            <ButtonDiv>
              <StandardButton disabled>
                Adding your new travel...
              </StandardButton>
            </ButtonDiv>
          ) : (
            <ButtonDiv>
              <StandardButton htmlType="submit" onClick={openNotification}>
                Submit
              </StandardButton>
            </ButtonDiv>
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default Create;
