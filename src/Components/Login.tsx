import { Button, Checkbox, Form, Input } from "antd";
import React, { useContext } from "react";
import { StandardButton, TravelDiv } from "./Style";
import { useGlobalContext } from './UserContext'
import { useNavigate } from "react-router-dom";



const Login: React.FC = () => {
  const { user, setUser } = useGlobalContext()
  const navigate = useNavigate();


  const onFinish = (e: { username: string; }) => {
    console.log(e.username);
    setUser(e.username);
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };



  return (
    <TravelDiv>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      
        autoComplete="off"
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[{ required: true, message: "Please input your username!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
        <StandardButton htmlType="submit">Submit</StandardButton>
        </Form.Item>
      </Form>
    </TravelDiv>
  );
};

export default Login;
