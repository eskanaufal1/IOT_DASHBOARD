import React from "react";
import { Table, Tag } from "antd";
import moment from "moment";
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
          console.log("clicked", text);
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

const TableDashboard = (props) => {
  if (props.data[0] !== undefined) {
    props.data.map((item) => {
      const formattedDate = moment(item.updatedAt)
        .locale("id")
        .format("DD MMMM YYYY HH:mm:ss");
      item.updatedAt = formattedDate;
    });
  }
  return (
    <Table
      rowKey={(record) => record._id}
      // key={props.data.key}
      columns={columns}
      dataSource={props.data}
      scroll={{ x: 200 }}
    ></Table>
  );
};

export default TableDashboard;
