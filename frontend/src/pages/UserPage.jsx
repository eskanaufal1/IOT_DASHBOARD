import React from "react";
import { Layout, Flex, Space, Typography, Input, theme } from "antd";
import { UserOutlined } from "@ant-design/icons";
import UploadButton from "../components/UploadButton";
import { useSelector } from "react-redux";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const widthText = { width: "60px" };
const { useToken } = theme;

const UserPage = ({ data }) => {
  const { token } = useToken();
  const { user, setUser } = useContext(UserContext);
  if (!user) {
    return (
      <Layout>
        <Content
          style={{
            padding: 20,
            borderRadius: token.borderRadius,
            backgroundColor: data.backgroundColor,
          }}
        >
          <Spin></Spin>
        </Content>
      </Layout>
    );
  }
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
        <Flex vertical gap={10} className="profile">
          {/* <Flex>
            <Space size={25}>
              <Text>Profile Picture</Text>

              <UploadButton />
            </Space>
          </Flex> */}
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Email</Text>
              </div>
              <Input
                placeholder={user.email || "Please enter your email"}
                style={{ width: "100%" }}
              />
            </Space>
          </Flex>
          <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Full Name</Text>
              </div>
              <Input placeholder={user.username || "Please enter your name"} />
            </Space>
          </Flex>
          {/* <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>URL</Text>
              </div>
              <Input placeholder="Please enter your URL" />
            </Space>
          </Flex> */}
          {/* <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Company</Text>
              </div>
              <Input placeholder="Please enter your company" />
            </Space>
          </Flex> */}
          {/* <Flex>
            <Space size={50}>
              <div style={widthText}>
                <Text>Address</Text>
              </div>
              <Input placeholder="Please enter your address" />
            </Space>
          </Flex> */}
        </Flex>
      </Content>
    </Layout>
  );
};

export default UserPage;
