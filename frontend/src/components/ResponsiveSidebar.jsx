import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  RocketOutlined,
  BarChartOutlined,
  LayoutOutlined,
} from "@ant-design/icons";
import { Layout, Menu, theme } from "antd";
// import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;
const label = ["Dashboard", "Statistic", "Device", "User"];
const items = [
  LayoutOutlined,
  BarChartOutlined,
  RocketOutlined,
  UserOutlined,
].map((icon, index) => ({
  key: String(index + 1),
  icon: React.createElement(icon),
  label: label[index],
}));
const ResponsiveSidebar = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <Layout>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={items}
          onSelect={(menu) => {
            console.log(menu);
          }}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
        <Content
          style={{
            margin: "24px 16px 0",
          }}
        >
          <div
            style={{
              padding: 24,
              minHeight: 360,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            This Is Content Section
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          {" "}
          This Is Footer Section
        </Footer>
      </Layout>
    </Layout>
  );
};
export default ResponsiveSidebar;
