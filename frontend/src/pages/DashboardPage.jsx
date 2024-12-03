import React, { useState, useEffect } from "react";
import {
  Collapse,
  Layout,
  Divider,
  Button,
  Flex,
  Typography,
  Space,
  theme,
} from "antd";
import axios from "axios";

import Maps from "../components/Maps";
import TableDashboard from "../components/TableDashboard";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import socket from "../socket";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;

// const { token } = useToken();
const DashboardPage = ({ data }) => {
  const { user, setUser } = useContext(UserContext);

  const { token } = useToken();
  const [latestData, setLatestData] = useState([]);
  const getLatestData = async () => {
    if (user) {
      await axios
        .post("/getlatestdata", { created_by: user.email })
        .then((response) => {
          setLatestData(response.data);
          console.log("get new latest data");
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getLatestData();
    }, 3000);

    return () => clearInterval(interval);
  });

  // socket.on("time", (data) => {
  //   console.log(data);
  // });
  // socket.on("connect_error", (err) => {
  //   // the reason of the error, for example "xhr poll error"
  //   console.log(err.message);

  //   // some additional description, for example the status code of the initial HTTP response
  //   console.log(err.description);

  //   // some additional context, for example the XMLHttpRequest object
  //   console.log(err.context);
  // });
  return (
    <Layout>
      <Content
        style={{
          padding: 0,
          borderRadius: token.borderRadius,
          backgroundColor: data.backgroundColor,
        }}
      >
        <Collapse
          bordered={false}
          items={[
            {
              key: "1",
              label: <Button type="primary">Connected Devices : {0}</Button>,
              children: <TableDashboard data={latestData} />,
            },
          ]}
        />
      </Content>
      <br />
      <Content
        style={{
          padding: "10px 24px",
          borderRadius: token.borderRadius,
          backgroundColor: data.backgroundColor,
        }}
      >
        <Title
          level={5}
          style={{
            padding: 0,
            margin: 0,
          }}
        >
          Connected Devices Locations
        </Title>
        <Divider style={{ margin: "10px 0" }} />
        <Maps data={latestData} />
      </Content>
    </Layout>
  );
};

export default DashboardPage;
