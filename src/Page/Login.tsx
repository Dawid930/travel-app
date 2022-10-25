import { Checkbox, Form, Input } from "antd";
import React, { useContext, useState } from "react";
import { StandardButton, TravelDiv } from "../Components/Style";
import { LoginContext } from "../Components/UserContext";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { AUTH_EMAIL, AUTH_ID, AUTH_NAME, AUTH_TOKEN } from "../constants";

const SIGNUP_MUTATION = gql`
  mutation SignupMutation($email: String!, $password: String!, $name: String!) {
    signup(email: $email, password: $password, name: $name) {
      token
    }
  }
`;

const LOGIN_MUTATION = gql`
  mutation LoginMutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        name
        email
      }
    }
  }
`;

const Login: React.FC = () => {
  const loginContext = useContext(LoginContext);
  const [user, setUser] = useState({
    login: true,
    email: "",
    password: "",
    name: "",
    id: "",
  });
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const [login] = useMutation(LOGIN_MUTATION, {
    variables: {
      email: user.email,
      password: user.password,
    },
    onCompleted: ({ login }) => {
      localStorage.setItem(AUTH_TOKEN, login.token);
      localStorage.setItem(AUTH_NAME, login.user.name);
      localStorage.setItem(AUTH_EMAIL, login.user.email);
      localStorage.setItem(AUTH_ID, login.user.id);
      loginContext.setUserContext({
        name: login.user.name,
        email: login.user.email,
        id: login.user.id,
      });
      navigate("/");
    },
  });

  const [signup] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name: user.name,
      email: user.email,
      password: user.password,
    },
    onCompleted: ({ signup }) => {
      localStorage.setItem(AUTH_TOKEN, signup.token);
      navigate("/");
    },
  });

  const onFinish = () => {
    user.login ? login() : signup();
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
    setError(errorInfo.message);
  };

  return (
    <TravelDiv>
      {user.login ? "Login" : "Sign Up"}
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        {!user.login && (
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please input your name!" }]}
          >
            <Input
              value={user.name}
              onChange={(e) =>
                setUser({
                  ...user,
                  name: e.target.value,
                })
              }
            />
          </Form.Item>
        )}

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please input your email adress!" },
          ]}
        >
          <Input
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
          />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: "Please input your password!" }]}
        >
          <Input.Password
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
          />
        </Form.Item>

        <div>
          <button
            onClick={() => {
              setUser({
                ...user,
                login: !user.login,
              });
            }}
          >
            {user.login
              ? "Need to create an account?"
              : "Already have an account?"}
          </button>
        </div>

        <Form.Item
          name="remember"
          valuePropName="checked"
          wrapperCol={{ offset: 8, span: 16 }}
        >
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <StandardButton htmlType="submit">
            {user.login ? "Login" : "Create account"}
          </StandardButton>
        </Form.Item>
      </Form>
      {error && <h2>Something went wrong. Error message: {error}</h2>}
    </TravelDiv>
  );
};

export default Login;
