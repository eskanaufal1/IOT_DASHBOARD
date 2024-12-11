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
  Skeleton,
  Spin,
} from "antd";
import axios from "axios";
import Maps from "../components/Maps";
import TableDashboard from "../components/TableDashboard";
import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useQuery } from "@tanstack/react-query";
import { setData } from "../redux/reducers/realtimeDataReducer";
import { useDispatch } from "react-redux";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const { Title, Text } = Typography;
const { Header, Content, Footer, Sider } = Layout;
const { useToken } = theme;

// const { token } = useToken();
const DashboardPage = ({ data }) => {
  const { user, setUser } = useContext(UserContext);
  const [uniqueDevices, setUniqueDevices] = useState(0);
  const { token } = useToken();
  const [latestData, setLatestData] = useState([]);
  const dispatch = useDispatch();

  const {
    isError,
    isLoading,
    error,
    data: dataQuery,
    isFetching,
  } = useQuery({
    queryKey: ["realtimeData"],
    queryFn: async () => {
      const response = await axios
        .post("/getlatestdata", { created_by: user.email })
        .then((res) => {
          // dispatch(setData(res.data));
          return res;
        });
      return response;
    },
    refetchInterval: 5000,
  });
  // console.log(
  //   "data ",
  //   dataQuery,
  //   "isFetching ",
  //   isFetching,
  //   "isLoading ",
  //   isLoading
  // );
  useEffect(() => {
    if (dataQuery) {
      const uniqueIds = new Set(dataQuery.data.map((item) => item.device));
      setUniqueDevices(uniqueIds.size);
      setLatestData(dataQuery.data);
      dispatch(setData(dataQuery.data));
    }
  }, [dataQuery]);

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
