import React, { useRef, useEffect, useState } from "react";
import {
  Button,
  Checkbox,
  Form,
  Input,
  Space,
  Layout,
  Flex,
  Typography,
  message,
  Alert,
} from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from "../assets/Smart GPS.svg";
import { useSelector, useDispatch } from "react-redux";
import { signIn, signOut } from "../redux/reducers/isLoggedReducer";

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const LoginPage = () => {
  const dispatch = useDispatch();
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const [messageApi, contextHolder] = message.useMessage();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
  });
  const navigate = useNavigate();

  const success = (message) => {
    messageApi.open({
      type: "success",
      content: "Login Success",
    });
  };
  const error = (err) => {
    messageApi.open({
      type: "error",
      content: err,
    });
  };
  const warning = () => {
    messageApi.open({
      type: "warning",
      content: "This is a warning message",
    });
  };
  const onFinish = (values) => {
    console.log("Success submit:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed submit:", errorInfo);
  };

  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post("/login", loginData);
      if (data.error) {
        error();
      } else {
        await success();
        await setAlertMessage({ message: "Login success", type: "success" });
        setLoginData({ username: "", password: "" });
        console.log("Navigate to Dashboard");
        dispatch(signIn());
        navigate("/main");
      }
    } catch (err) {
      console.log(err);
      error(err.response.data.error);
      setAlertMessage({
        ...alertMessage,
        message: err.response.data.error,
        type: "error",
      });
    }
  };

  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#fff" }}>
      {/* {console.log("isLogged = ", isLogged)} */}
      {contextHolder}
      <Content>
        <Flex align="center" justify="center" style={{ height: "100vh" }}>
          <Form
            style={{
              border: "1px solid #d9d9d9",
              padding: "16px",
              borderRadius: 20,
            }}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="on"
          >
            <Flex
              align="center"
              justify="center"
              style={{ paddingBottom: "30px" }}
            >
              <img style={{ height: "15vh" }} src={Logo} alt="" />
              <Title level={2}>Smart GPS</Title>
            </Flex>

            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
                {
                  pattern: USER_REGEX,
                  message: "Invalid username",
                },
              ]}
            >
              <Input
                value={loginData.username}
                onChange={(e) =>
                  setLoginData({ ...loginData, username: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
                {
                  min: 8,
                  message: "Password must be at least 8 characters",
                },
                {
                  pattern: PWD_REGEX,
                  message:
                    "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character",
                },
              ]}
            >
              <Input.Password
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </Form.Item>

            <Form.Item name="remember" valuePropName="checked" label={null}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>

            <Alert message={alertMessage.message} type={alertMessage.type} />
            <br />
            <Flex align="center" justify="center">
              <Space>
                <Form.Item label={null}>
                  <Button onClick={loginUser} type="primary" htmlType="submit">
                    Login
                  </Button>
                </Form.Item>
                <Form.Item label={null}>
                  <Button
                    onClick={() => navigate("/register")}
                    type="primary"
                    htmlType="submit"
                  >
                    Register
                  </Button>
                </Form.Item>
              </Space>
            </Flex>
          </Form>
        </Flex>
      </Content>
    </Layout>
  );
};

export default LoginPage;
