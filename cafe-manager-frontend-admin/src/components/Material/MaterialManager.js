import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  Button,
  Input,
  InputNumber,
  Popconfirm,
  Space,
  Table,
  Tag,
  Modal,
  Form,
  Column,
  Select,
  Switch,
} from "antd";
import materialApi from "../../api/materialApi";
import { FiEdit } from "react-icons/fi";
import { RiDeleteBin6Line } from "react-icons/ri";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
import TextArea from "antd/lib/input/TextArea";
const { Option } = Select;

function MaterialManager(props) {
  const [pagination, setPagination] = useState({ pageSize: 5, current: 1 });
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [action, setAction] = useState("Sửa thông tin");
  const [editId, setEditId] = useState("");

  const [form] = Form.useForm();

  const onFill = (data) => {
    form.setFieldsValue(data[0]);
    setEditId(data[0]._id);
  };

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  };

  const validateMessages = {
    required: "${label} is required!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const onFinishModal = async (values) => {
    console.log(values);
    if (action == "Sửa thông tin") {
      await materialApi.editMaterialById(editId, values);
    } else {
      await materialApi.createMaterial({ ...values });
    }
    await getData();
    setIsModalVisible(false);
  }
    ;

  const showModal = (type) => {
    setAction(type);
    setIsModalVisible(true);
  };

  const handleOkModal = () => {
    setIsModalVisible(false);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  let searchInput;

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => {
            searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: "block" }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
            </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
            </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
    ),
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase())
        : "",
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
          text
        ),
  });

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  useEffect(async () => {
    // setData(fakeData);
    await getData();
  }, []);

  const getData = async () => {
    let res = await materialApi.getAllMaterial();
    let resData = res.map((item, index) => {
      let color;
      switch (item.status) {
        case "admin":
          color = "red";
          break;
        case "cashier":
          color = "green";
          break;
        // case "customer": "blue"; break;
        case "inventoryManager":
          color = "blue";
          break;
      }
      return {
        ...item,
        status: (
          <Tag color={color} key={item.status}>
            {item.status}
          </Tag>
        ),
      };
    });
    console.log(res);
    setData(res);
  };

  const handleDelete = async (id) => {
    console.log(id);
    const res = await materialApi.deleteMaterialById(id);
    console.log(res);
    await getData();
  };

  const columns = [
    {
      title: "Tên",
      dataIndex: "name",
      sorter: (a, b) => a.name?.length - b.name?.length,
      ...getColumnSearchProps("name"),
    },
    {
      title: "Loại",
      dataIndex: "name_type",
      sorter: (a, b) => a.name_type?.length - b.name_type?.length,
    },
    {
      title: "Mô tả",
      dataIndex: "description",
      sorter: (a, b) => a.description?.length - b.description?.length,
    },
    // {
    //   title: "Số lượng nhập",
    //   dataIndex: "amountInput",
    //   sorter: (a, b) => a.amount - b.amount,
    // },
    {
      title: "Số lượng còn lại",
      dataIndex: "amount",
      sorter: (a, b) => a.amount - b.amount,
    },
    {
      title: "Đơn vị",
      dataIndex: "unit",
      sorter: (a, b) => a.unit?.length - b.unit?.length,
    },
    // {
    //   title: "Số lượng xuất",
    //   dataIndex: "amountOutput",
    //   sorter: (a, b) => a.description.length - b.description.length,
    // },
    // {
    //   title: "Trạng thái",
    //   dataIndex: "status",
    //   filters: [
    //     {
    //       text: "Đang bán",
    //       value: true,
    //     },
    //     {
    //       text: "Không bán",
    //       value: false,
    //     },
    //   ],
    //   onFilter: (value, record) => record.status === value,
    //   sorter: (a, b) => a.status?.length - b.status?.length,
    //   render: (status) => {
    //     let color;
    //     let valueVN;
    //     switch (status) {
    //       case false:
    //         color = "red";
    //         valueVN = "Không bán";
    //         break;
    //       case true:
    //         color = "green";
    //         valueVN = "Đang bán";
    //         break;
    //     }
    //     return (
    //       <Tag color={color} key={status}>
    //         {valueVN}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "Hành động",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              onFill(data.filter((item) => item._id == record._id));
              showModal("Sửa thông tin");
            }}
          >
            <FiEdit color={"green"} size={"18px"} />
          </a>

          <Popconfirm
            title="Bạn có muốn xóa?"
            onConfirm={() => handleDelete(record._id)}
          >
            <a>
              <RiDeleteBin6Line color={"red"} size={"18px"} />
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  function onChange(pagination, filters, sorter, extra) {
    console.log("params", pagination, filters, sorter, extra);
    setPagination(pagination);
  }

  return (
    <>
      <div>
        <Button
          type="primary"
          onClick={() => {
            showModal("Thêm loại sản phẩm");
          }}
          style={{ marginBottom: "16px" }}
        >
          Thêm loại nguyên liệu
          </Button>
        <Modal
          footer={null}
          title={action}
          visible={isModalVisible}
          onOk={handleOkModal}
          onCancel={handleCancelModal}
        >
          <Form
            {...layout}
            name="nest-messages"
            onFinish={onFinishModal}
            validateMessages={validateMessages}
            form={form}
          >
            <Form.Item name={"name"} label="Tên" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"name_type"} label="Loại" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"unit"} label="Đơn vị" rules={[{ required: true }]}>
              <Input />
            </Form.Item>
            <Form.Item name={"description"} label="Mô tả">
              <TextArea rows="5" />
            </Form.Item>
            <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
              <Button type="primary" htmlType="submit">
                Lưu
                </Button>
            </Form.Item>
          </Form>
        </Modal>
        <Table
          columns={columns}
          dataSource={data}
          onChange={onChange}
          pagination={pagination}
          loading={loading}
        />
      </div>
    </>
  );
}

MaterialManager.propTypes = {};

export default MaterialManager;
