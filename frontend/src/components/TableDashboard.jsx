import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";
import { useSelector } from "react-redux";

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const columns = [
  {
    title: "Time",
    dataIndex: "updatedAt",
    key: "updatedAt",
    width: 150,
  },
  {
    title: "Device",
    dataIndex: "device",
    key: "device",
    width: 120,
    render: (text) => (
      <a
        onClick={async (e) => {
          e.preventDefault();
          await axios.post("/help", { device: text });
          console.log("Helping = ", text);
        }}
      >
        {text}
      </a>
    ),
  },
  {
    title: "Emergency State",
    dataIndex: "state",
    key: "state",
    width: 100,
    render: (_, { state }) => (
      <>
        <Tag color={state === "true" ? "red" : "green"} key={_}>
          {state === "true" ? "BAHAYA" : "AMAN"}
        </Tag>
      </>
    ),
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "color",
    width: 100,
    render: (_, { color }) => (
      <>
        <Tag color={color} key={_}>
          {color}
        </Tag>
      </>
    ),
  },
  {
    title: "Longitude",
    dataIndex: "longitude",
    key: "longitude",
    width: 80,
  },
  {
    title: "Latitude",
    dataIndex: "latitude",
    key: "latitude",
    width: 80,
  },
  {
    title: "Speed",
    dataIndex: "speed",
    key: "speed",
    width: 100,
  },
  {
    title: "Altitude",
    dataIndex: "altitude",
    key: "altitude",
    width: 100,
  },
];

const TableDashboard = () => {
  let realtimeDatas = useSelector((state) => state.realtimeData.realtimeData);
  // console.log("length = ", realtimeDatas.length);
  let updatedData = Array.apply(null, Array(realtimeDatas.length)).map(
    function () {}
  );

  try {
    if (realtimeDatas[0] !== undefined) {
      realtimeDatas.map((item, index) => {
        const formattedDate = moment(item.updatedAt)
          .locale("id")
          .format("DD MMMM YYYY HH:mm:ss");
        updatedData[index] = {
          ...item,
          updatedAt: formattedDate,
        };
      });
    }
  } catch (err) {
    console.log(err);
  }
  // console.log("updatedData = ", updatedData);
  // console.log("realtimeDatas = ", realtimeDatas);

  return (
    <Table
      rowKey={(record) => record._id}
      columns={columns}
      dataSource={updatedData}
      scroll={{ x: 200 }}
    ></Table>
  );
};

export default TableDashboard;
