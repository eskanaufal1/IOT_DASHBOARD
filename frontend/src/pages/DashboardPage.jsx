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
  Table,
} from "antd";
import axios from "axios";

import Maps from "../components/Maps";
import TableDashboard from "../components/TableDashboard";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import TableDashboardState from "../components/TableDashboardState";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;

// const { token } = useToken();
const DashboardPage = ({ data }) => {
  const { user, setUser } = useContext(UserContext);
  const [uniqueDevices, setUniqueDevices] = useState(0);
  const [deviceData, setDeviceData] = useState([]);

  const { token } = useToken();
  const [latestData, setLatestData] = useState([]);

  const getLatestData = async () => {
    if (user && user.email) {
      await axios
        .post("/getlatestdata", { created_by: user.email })
        .then((response) => {
          setLatestData(response.data);
          console.log("get new latest data");
          if (latestData) {
            // ======================================================

            // Extract unique IDs using Set
            const uniqueIds = new Set(latestData.map((item) => item.device));

            // Count the unique IDs
            setUniqueDevices(uniqueIds.size);
            setDeviceData(uniqueIds);
            // console.log("Unique IDs:", uniqueIds);

            // console.log("Unique ID count:", uniqueIds.size); // Output: 4
            // ======================================================
          }
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
  // console.log("latest Data =", latestData);

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
              label: (
                <Button type="primary">
                  Connected Devices : {uniqueDevices}
                </Button>
              ),
              children: <TableDashboard data={latestData} />,
            },
          ]}
        />
      </Content>
      {/* <br />
      <Content
        style={{
          padding: "10px 24px",
          borderRadius: token.borderRadius,
          backgroundColor: data.backgroundColor,
        }}
      >
        <TableDashboardState data={deviceData} />
      </Content> */}
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
