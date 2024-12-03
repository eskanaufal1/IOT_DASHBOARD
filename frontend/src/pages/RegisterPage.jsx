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

const { Header, Content, Footer, Sider } = Layout;
const { Title, Text } = Typography;
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const RegisterPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [alertMessage, setAlertMessage] = useState({
    message: "",
    type: "",
  });
  const success = (message) => {
    messageApi.open({
      type: "success",
      content: "Register Success",
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

  const [registerData, setRegisterData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const registerUser = async (e) => {
    e.preventDefault();

    try {
      if (registerData.password !== registerData.confirmPassword) {
        setAlertMessage({ message: "Password didn't match", type: "error" });
        return error("Password didn't match");
      }
      const { data } = await axios.post("/register", registerData);
      if (data.error) {
        error("Error registering user");
        setAlertMessage({ message: "Error registering user", type: "error" });
      } else {
        await success();
        navigate("/login");
      }
    } catch (err) {
      error(err.response.data.error);
      setAlertMessage({ message: err.response.data.error, type: "error" });
    }
  };

  return (
    <Layout style={{ minHeight: "70vh", backgroundColor: "#fff" }}>
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
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your email!",
                },
              ]}
            >
              <Input
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Username"
              name="username"
              rules={[
                {
                  required: true,
                  message: "Please input your username!",
                },
              ]}
            >
              <Input
                value={registerData.username}
                onChange={(e) =>
                  setRegisterData({ ...registerData, username: e.target.value })
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
              ]}
            >
              <Input.Password
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </Form.Item>
            <Form.Item
              label="Confirm"
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: "Please input again your password!",
                },
              ]}
            >
              <Input.Password
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    confirmPassword: e.target.value,
                  })
                }
              />
            </Form.Item>
            <Alert message={alertMessage.message} type={alertMessage.type} />
            <br />
            <Flex style={{ height: "20px" }} align="center" justify="center">
              <Form.Item label={null}>
                <Space>
                  <Form.Item label={null}>
                    <Button
                      onClick={registerUser}
                      type="primary"
                      htmlType="submit"
                    >
                      Register
                    </Button>
                  </Form.Item>
                  <Form.Item label={null}>
                    <Button
                      onClick={() => navigate("/login")}
                      type="primary"
                      htmlType="submit"
                    >
                      Login
                    </Button>
                  </Form.Item>
                </Space>
              </Form.Item>
            </Flex>
          </Form>
        </Flex>
      </Content>
    </Layout>
  );
};

export default RegisterPage;
