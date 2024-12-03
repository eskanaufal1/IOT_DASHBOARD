import React, { useEffect, useState } from "react";
import { Divider, Radio, Table, Tag, Button } from "antd";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";

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
    key: "description",
  },
  {
    title: "Action",
    dataIndex: "",
    key: "x",
    render: () => (
      <Button onClick={(e) => console.log("event", e)}>
        <a>Delete</a>
      </Button>
    ),
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

const TableDeviceState = (props) => {
  const [deviceData, setDeviceData] = useState([]);
  const [multipleDeviceData, setMultipleDeviceData] = useState([]);
  const getData = async () => {
    try {
      if (props.data) {
        // setDeviceData([]);
        Array.from(props.data).map((item) => {
          //   console.log("item = ", item);
          axios
            .post("/devices_dashboard", { device: item })
            .then((res) => {
              setDeviceData((prevDevice) => [
                ...prevDevice,
                {
                  device: res.data[0].device,
                  description: res.data[0].description,
                  topic: res.data[0].topic,
                  color: res.data[0].color,
                  created_by: res.data[0].created_by,
                },
              ]);
              //   console.log("Device data = ", res.data);
            })
            .catch((err) => {
              console.log(err);
              setDeviceData([]);
            });
          //   setMultipleDeviceData(deviceData);
          //   console.log("Multiple data = ", multipleDeviceData);
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("interval");
      getData();
    }, 2100);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <Table
        rowKey={"_id"}
        key={"_id"}
        columns={columns}
        dataSource={multipleDeviceData}
        scroll={{
          x: 100,
        }}
        onRow={(record, rowIndex) => {
          return {
            onClick: (event) => {
              console.log("click row", event);
            }, // click row
            onDoubleClick: (event) => {}, // double click row
            onContextMenu: (event) => {}, // right button click row
            onMouseEnter: (event) => {}, // mouse enter row
            onMouseLeave: (event) => {}, // mouse leave row
          };
        }}
      />
    </div>
  );
};
export default TableDeviceState;
