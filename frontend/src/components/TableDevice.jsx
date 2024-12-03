import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Tag } from "antd";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

const columns = [
  {
    title: "Device",
    dataIndex: "device",
    render: (text) => <a>{text}</a>,
  },
  {
    title: "Color",
    dataIndex: "color",
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
  },
  {
    title: "Topic",
    dataIndex: "topic",
  },

  // {
  //   title: "Status",
  //   dataIndex: "status",
  // },
  // {
  //   title: "Last Connection",
  //   dataIndex: "last_connection",
  // },
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
  const [deviceData, setDeviceData] = useState([
    {
      device: "aa",
      description: "aa",
      topic: "aa",
      color: "aa",
      created_by: "ss",
    },
  ]);

  useEffect(() => {
    const getData = async () => {
      await axios
        .post("/devices", { created_by: "jellymakers1997@gmail.com" })
        .then((res) => {
          setDeviceData(res.data);
        })
        .catch((err) => {
          console.log(err);
          setDeviceData([]);
        });
    };
    getData();
  }, []);
  // console.log("Device Data = ", deviceData);
  return (
    <div>
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
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
