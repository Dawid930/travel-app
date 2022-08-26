import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, DatePicker, InputNumber, Upload } from "antd";


const { RangePicker } = DatePicker;
const { TextArea } = Input;

type DateSetter = {
    start: Date | undefined,
    end: Date | undefined
}

const Create = () => {
  const [title, setTitle] = useState("");
  const [country, setCountry] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<DateSetter>({start:new Date(), end:new Date()}); //usestate ut'n egz tipust nativ date type 
  const [description, setDescription] = useState("");
  const [author, setAuthor] = useState("");
  const [travelCompanions, setTravelCompanions] = useState<string | undefined>(
    ""
  );
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const travel = {
      title,
      country,
      location,
      date,
      description,
      author,
      travelCompanions,
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
      navigate("/");
    });
  };

  return (
    <div className="formInput">
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        onSubmitCapture={handleSubmit}
      >
        <Form.Item label="Title" rules={[{ required: true }]}>
          <Input value={title} onChange={(e) => setTitle(e.target.value)} />
        </Form.Item>

        <Form.Item label="Country" required>
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
            setDate({
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

        <Form.Item label="Upload" valuePropName="fileList">
          <Upload action="/upload.do" listType="picture-card">
            <div>
              <PlusOutlined />
              <div style={{ marginTop: 8 }}>Upload</div>
            </div>
          </Upload>
        </Form.Item>

        <Form.Item>
          {!isPending && <Button htmlType="submit">Submit</Button>}
          {isPending && <Button disabled>Adding your new travel...</Button>}
        </Form.Item>
      </Form>
      <h1>{JSON.stringify(date)}</h1>
    </div>
  );
};

export default Create;
