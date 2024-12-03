import React, { useState } from "react";
import {
  Layout,
  Space,
  Flex,
  Typography,
  Button,
  Input,
  Divider,
  Table,
  theme,
  Modal,
  Form,
  Checkbox,
} from "antd";
import { PlusOutlined, ReloadOutlined } from "@ant-design/icons";
import TableDevice from "../components/TableDevice";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;
const { useToken } = theme;
const { Search } = Input;
const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const onSearch = (value, _e, info) => console.log(info?.source, value);

const UserPage = ({ data }) => {
  const { token } = useToken();
  const [deviceData, setDeviceData] = useState({
    device: "",
    description: "",
    topic: "",
    color: "",
    created_by: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const showModal = () => {
    setOpen(true);
  };
  const submitDevice = () => {
    axios
      .post("/adddevice", deviceData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setOpen(false);
    }, 3000);
  };
  const handleCancel = () => {
    setOpen(false);
  };
  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
      <Content
        style={{
          padding: "10px 24px",
          minHeight: 280,
          // borderStyle: "solid",
          borderRadius: token.borderRadius,
          backgroundColor: data.backgroundColor,
        }}
      >
        <Flex
          wrap
          justify="space-between"
          align="center"
          style={{ padding: "6px 6px" }}
        >
          <Space size={1}>
            <Button onClick={showModal} type="text" icon={<PlusOutlined />}>
              Add Device
            </Button>
            <Modal
              open={open}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Return
                </Button>,
                <Button
                  key="submit"
                  type="primary"
                  loading={loading}
                  onClick={submitDevice}
                >
                  Submit
                </Button>,
              ]}
            >
              <Form
                name="basic"
                labelCol={{
                  span: 8,
                }}
                wrapperCol={{
                  span: 16,
                }}
                style={{
                  maxWidth: 600,
                }}
                initialValues={{
                  remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
              >
                <Form.Item
                  label="Device Name"
                  name="device"
                  rules={[
                    {
                      required: true,
                      message: "Please input your device name!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDeviceData({ ...deviceData, device: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item label="Description" name="description" rules={[]}>
                  <Input
                    onChange={(e) =>
                      setDeviceData({
                        ...deviceData,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="Color"
                  name="color"
                  rules={[
                    {
                      required: true,
                      message: "Please input your color!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDeviceData({ ...deviceData, color: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="MQTT Topic"
                  name="topic"
                  rules={[
                    {
                      required: true,
                      message: "Please input your mqtt topic!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDeviceData({ ...deviceData, topic: e.target.value })
                    }
                  />
                </Form.Item>
                <Form.Item
                  label="created by"
                  name="created_by"
                  rules={[
                    {
                      required: true,
                      message: "Please input your email!",
                    },
                  ]}
                >
                  <Input
                    onChange={(e) =>
                      setDeviceData({
                        ...deviceData,
                        created_by: e.target.value,
                      })
                    }
                  />
                </Form.Item>
              </Form>
            </Modal>
            <Button type="text" icon={<ReloadOutlined />}>
              Reload
            </Button>
          </Space>
          <Search
            placeholder="Search Device Name"
            onSearch={onSearch}
            style={{
              width: 200,
            }}
          />
        </Flex>
        <Divider style={{ margin: "10px 0", borderColor: "#B0B0B0" }} />

        <TableDevice style={{ margin: "16px 16px" }} />
      </Content>
    </Layout>
  );
};

export default UserPage;
