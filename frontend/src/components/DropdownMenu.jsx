import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dropdown, Space, Avatar, Divider, theme } from "antd";
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { signOut } from "../redux/reducers/isLogged";
import axios from "axios";

const { useToken } = theme;
axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const items = [
  {
    key: "/user",
    icon: <UserOutlined />,
    label: <a href="/user">Profile</a>,
  },
  {
    key: "2",
    icon: <SettingOutlined />,
    label: "Settings",
  },
  {
    type: "divider",
  },
  {
    key: "3",
    icon: <LogoutOutlined />,
    label: <a href="/logout">Logout</a>,
  },
];

const DropdownMenu = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useToken();
  const contentStyle = {
    backgroundColor: token.colorBgElevated,
    borderRadius: token.borderRadiusLG,
    boxShadow: token.boxShadowSecondary,
  };
  const menuStyle = {
    boxShadow: "none",
  };
  return (
    <Dropdown
      menu={{
        items,
      }}
      placement="bottomRight"
      dropdownRender={(menu) => (
        <div style={contentStyle}>
          {React.cloneElement(menu, {
            style: menuStyle,
          })}
          <Divider
            style={{
              margin: 0,
            }}
          />
          <Space
            style={{
              padding: 8,
            }}
          >
            <Button
              onClick={async () => {
                const res = await axios.get("/logout");
                console.log(res.data.message);
                dispatch(signOut());
                navigate("/login");
              }}
              style={{ borderRadius: 8, width: "100%" }}
              type="primary"
            >
              Logout
            </Button>
          </Space>
        </div>
      )}
    >
      <Avatar size="large" icon={<UserOutlined />}></Avatar>
    </Dropdown>
  );
};
export default DropdownMenu;
