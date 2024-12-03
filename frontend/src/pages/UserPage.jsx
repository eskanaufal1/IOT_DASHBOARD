import React from "react";
import { Layout, Flex, Space, Typography, Input, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UploadButton from "../components/UploadButton";

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const widthText = { width: "60px" };
const { useToken } = theme;

const UserPage = ({ data }) => {
  const { token } = useToken();
  return (
    <Layout>
      <Content
        style={{
          borderRadius: token.borderRadius,
          paddingLeft: 16,
          paddingRight: 16,
          paddingBottom: "50px",
          backgroundColor: data.backgroundColor,
        }}
      >
        <Flex
          wrap
          align="flex-start"
          justify="flex-start"
          style={{ padding: "16px" }}
        >
          <Space size={10}>
            <UserOutlined style={{ fontSize: "20px" }} />
            <Title level={3} style={{ margin: 0 }}>
              User Profile
            </Title>
          </Space>
        </Flex>
        <div
          className="profile"
          // style={{ paddingLeft: "100px", paddingTop: "50px" }}
        >
          <Flex>
            <Space size={25}>
              <Text>Profile Picture</Text>
              {/* <Flex vertical justify="flex-start" align="flex-start">
                <UserOutlined style={{ fontSize: "100px" }} />
                <Text>Upload your profile picture</Text>
              </Flex> */}
              <UploadButton />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Email</Text>
              </div>
              <Input
                placeholder="Please enter your email"
                style={{ width: "100%" }}
              />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Full Name</Text>
              </div>
              <Input placeholder="Please enter your full name" />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>URL</Text>
              </div>
              <Input placeholder="Please enter your URL" />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Company</Text>
              </div>
              <Input placeholder="Please enter your company" />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Address</Text>
              </div>
              <Input placeholder="Please enter your address" />
            </Space>
          </Flex>
        </div>
      </Content>
    </Layout>
  );
};

export default UserPage;
