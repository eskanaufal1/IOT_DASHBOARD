import React, { useEffect, useState } from "react";
import { Table, Tag, Popconfirm } from "antd";
import axios from "axios";
import { UserContext } from "../../context/userContext";
import { useContext } from "react";
import { useQuery } from "@tanstack/react-query";

axios.defaults.baseURL = import.meta.env.VITE_AXIOS_BASE_URL;
axios.defaults.withCredentials = true;

let columns = [
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
  {
    title: "Action",
    dataIndex: "action",
    key: "5",
    render: (_, record) => {
      return (
        <Popconfirm
          title="Are you sure to delete this device?"
          okText="Yes"
          cancelText="No"
          onConfirm={async () => {
            console.log("confirm delete ", record.device, record._id);
            await axios.delete("/devices", {
              data: {
                device: record.device,
                _id: record._id,
              },
            });
          }}
        >
          <a>Delete</a>
        </Popconfirm>
      );
    },
  },
];

const TableDevice = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const { user, setUser } = useContext(UserContext);
  const {
    isError,
    isLoading,
    error,
    data: dataQuery,
    isFetching,
  } = useQuery({
    queryKey: ["devices"],
    queryFn: async () => {
      const response = await axios
        .post("/devices", { created_by: user.email })
        .then((res) => {
          setDeviceData(res.data);
          return res;
        });
      return response;
    },
    refetchInterval: 2000,
  });

  const [deviceData, setDeviceData] = useState([]);

  useEffect(() => {
    if (dataQuery) {
      setDeviceData(dataQuery.data);
      console.log("Device data = ", dataQuery.data);
    }
  }, [dataQuery]);

  return (
    <div>
      <Table
        rowSelection={rowSelection}
        onChange={(e) => console.log("onChange = ", e)}
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={deviceData}
        scroll={{
          x: 100,
        }}
      ></Table>
    </div>
  );
};
export default TableDevice;
