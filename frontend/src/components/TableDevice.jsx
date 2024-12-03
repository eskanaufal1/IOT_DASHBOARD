import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Tag } from "antd";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const columns = [
  {
    title: "Device",
    dataIndex: "device",
    key: "1",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Color",
    dataIndex: "color",
    key: "2",
    render: (_, { color }) => (
      <>
        <Tag color={color} key={_}>
          {color}
        </Tag>
      </>
    ),
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "3",
  },
  {
    title: "Topic",
    dataIndex: "topic",
    key: "4",
  },
];

// rowSelection object indicates the need for row selection
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(
      `selectedRowKeys: ${selectedRowKeys}`,
      "selectedRows: ",
      selectedRows
    );
  },
  getCheckboxProps: (record) => ({
    disabled: record.name === "Disabled User",
    // Column configuration not to be checked
    name: record.name,
  }),
};

const TableDevice = () => {
  const { user, setUser } = useContext(UserContext);
  const [deviceData, setDeviceData] = useState([]);
  const getData = async () => {
    // console.log(user);
    if (user) {
      await axios
        .post("/devices", { created_by: user.email })
        .then((res) => {
          setDeviceData(res.data);
          console.log("device data = ", deviceData);
        })
        .catch((err) => {
          console.log(err);
          setDeviceData([]);
        });
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      getData();
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={deviceData}
        scroll={{
          x: 100,
        }}
      />
    </div>
  );
};
export default TableDevice;
