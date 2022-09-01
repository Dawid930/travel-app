import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, InputNumber, Upload, notification, Rate } from "antd";
import { StandardButton } from "./Style";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

type DateSetter = {
    start: Date | undefined,
    end: Date | undefined
}

const desc = ['terrible', 'bad', 'normal', 'good', 'wonderful'];

const Create = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [dateRange, setDateRange] = useState<DateSetter>({start:new Date(), end:new Date()}); //usestate utan egz tipust nativ date type 
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [travelCompanions, setTravelCompanions] = useState<string | undefined>(
    ""
  );
  const [isPending, setIsPending] = useState(false);
  const [rating, setRating] = useState(3);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const travel = {
      title,
      country,
      location,
      dateRange,
      description,
      author,
      travelCompanions,
      rating
    };
    console.log(travel);

    setIsPending(true);

    fetch("http://localhost:8000/travels/", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(travel),
    }).then(() => {
      console.log("new added");
      setIsPending(false);
      
    });
  };

  const openNotification = () => {
    notification.open({
      message: 'Your new journey is submitted!',
      description:
        'Now you can see the newly added element on the home page.',
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (

    <div className="formInput">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onSubmitCapture={handleSubmit}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item label="Title" rules={[{ required: true, message: 'Please add a title!' }]}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Country">
          <Input value={country} onChange={(e) => setCountry(e.target.value)} />
        </Form.Item>

        <Form.Item label="Location">
          <Input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Item>

  {/*       <Form.Item label="Date">
          <Input
            type="number"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Item> */}
          <Form.Item label="RangePicker">
          <RangePicker  onChange={(e) => {console.log(e?.[0]?.toDate())
            setDateRange({
                start: e?.[0]?.toDate(),
                end: e?.[1]?.toDate()
            })}
        }/>

       
        </Form.Item> 

        <Form.Item label="Description">
          <TextArea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Author">
          <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
        </Form.Item>

        <Form.Item label="Travel companions">
          <InputNumber
            value={travelCompanions}
            onChange={(e) => setTravelCompanions(e)}
          />
        </Form.Item>

        <Form.Item label="Rating">
          <span>
            <Rate tooltips={desc} onChange={setRating} value={rating} />
            {rating ? <span className="ant-rate-text">{desc[rating - 1]}</span> : ''}
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

        
          {!isPending && <StandardButton htmlType="submit" onClick={openNotification}>Submit</StandardButton>}
          {isPending && <StandardButton disabled>Adding your new travel...</StandardButton>}
       
      </Form>
      {/* <h1>{JSON.stringify(dateRange)}</h1> */}
    </div>
  );
};

export default Create;
