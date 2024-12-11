import React, { Component, useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  RocketOutlined,
  BarChartOutlined,
  LayoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import {
  Button,
  Layout,
  Menu,
  Space,
  theme,
  Switch,
  Divider,
  Flex,
  Avatar,
  ConfigProvider,
  Typography,
} from "antd";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { toggleTheme } from "../redux/reducers/themeSetReducer";
import DashboardPage from "./DashboardPage";
import UserPage from "./UserPage";
import DevicePage from "./DevicePage";
import Logo from "../assets/Smart GPS.svg";
import DropdownMenu from "../components/DropdownMenu";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

var data = {
  backgroundColor: "#fff",
};

const CustomTrigger = () => {
  const isLogged = useSelector((state) => state.isLogged.isLogged);
  const themeStat = useSelector((state) => state.themeSet);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Title, Text } = Typography;
  const { Header, Sider, Content } = Layout;
  const [themeSet, setTheme] = useState("dark");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  data = {
    backgroundColor: isDarkMode ? "#000" : "#fff",
  };

  const themeToken = {
    token: {
      colorBgLayout: isDarkMode ? "#111827" : "#EFF6FF",
      colorText: isDarkMode ? "#fff" : "#000",
      colorTextBase: "#fff",
      borderRadius: 20,
      colorTextPlaceholder: isDarkMode ? "#D1D5DB" : "#4B5563",
    },
    components: {
      Layout: {
        siderBg: isDarkMode ? "#000" : "#001529",
        headerBg: isDarkMode ? "#000" : "#001529",
      },
      Menu: {
        itemBg: isDarkMode ? "#000" : "#001529",
      },
    },
    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
  };
  const changeTheme = (value) => {
    setTheme(value ? "light" : "dark");
    setIsDarkMode(value ? true : false);
    dispatch(toggleTheme(value ? true : false));
    console.log("isDarkMode : ", isDarkMode);
  };
  useEffect(() => {
    if (isLogged === false) {
      // navigate("/login");
    }
  }, []);
  return (
    <ConfigProvider theme={themeToken}>
      {console.log("isLogged : ", isLogged)}
      <Layout
        hasSider
        className={`${
          isDarkMode
            ? "prefers-color-scheme: dark"
            : "prefers-color-scheme: light"
        }`}
      >
        <Sider
          // theme={themeSet}
          trigger={null}
          collapsible
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div
            className="demo-logo-vertical"
            style={{
              width: "100%",
              textAlign: "center",
              padding: "16px 0",
            }}
          >
            <img
              style={{
                width: "150px",
                height: "60px",
                margin: "0px 0px 0px 0px",
                color: "black",
              }}
              src={Logo}
              alt="logo"
            />
          </div>
          <ConfigProvider
            theme={{
              token: {
                colorText: "#fff",
              },
            }}
          >
            <Menu
              // theme={themeSet}
              mode="inline"
              defaultSelectedKeys={["1"]}
              onClick={({ key }) => {
                navigate(key);
                console.log(key);
              }}
              items={[
                {
                  icon: <LayoutOutlined />,
                  key: "/main/dashboard",
                  label: "Dashboard",
                },
                {
                  icon: <RocketOutlined />,
                  key: "/main/device",
                  label: "Device",
                },
                {
                  icon: <UserOutlined />,
                  key: "/main/user",
                  label: "User",
                },
              ]}
            />
          </ConfigProvider>
        </Sider>
        <Layout>
          <Header
            style={{
              padding: 0,
            }}
          >
            <Flex justify="space-between">
              <Space>
                <Button
                  type="text"
                  icon={
                    collapsed ? (
                      <MenuUnfoldOutlined style={{ color: "white" }} />
                    ) : (
                      <MenuFoldOutlined style={{ color: "white" }} />
                    )
                  }
                  onClick={() => setCollapsed(!collapsed)}
                  style={{
                    fontSize: "16px",
                    width: 64,
                    height: 64,
                  }}
                />
                <div style={{ color: "white" }}>
                  <HeaderRouter style={{ color: "white" }} />
                </div>
              </Space>

              <Flex
                justify="space-between"
                align="center"
                style={{ paddingRight: 24 }}
              >
                <Space>
                  <Switch
                    checked={isDarkMode}
                    onChange={changeTheme}
                    // onChange={()}
                    defaultChecked="Dark"
                    checkedChildren="Dark"
                    unCheckedChildren="Light"
                    style={{ marginRight: 16 }}
                  />
                  <DropdownMenu />
                </Space>
              </Flex>
            </Flex>
          </Header>
          <Content
            style={{
              margin: "24px 16px",
              padding: "0 25px",
              minHeight: 280,
            }}
          >
            <ContentRouter theme={themeSet} />
          </Content>
        </Layout>
      </Layout>
    </ConfigProvider>
  );
};

function ContentRouter() {
  return (
    <Routes>
      <Route path="/" element={<DashboardPage data={data} />} />
      <Route path="/dashboard" element={<DashboardPage data={data} />} />
      <Route path="/device" element={<DevicePage data={data} />} />
      <Route path="/user" element={<UserPage data={data} />} />
    </Routes>
  );
}

function HeaderRouter() {
  return (
    <Routes>
      <Route path="/main/dashboard" element={<div>Dashboard</div>} />
      <Route path="/main/device" element={<div>Device</div>} />
      <Route path="/main/user" element={<div>User</div>} />
    </Routes>
  );
}

export default CustomTrigger;
