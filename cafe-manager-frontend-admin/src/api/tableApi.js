import axiosClient from "./axiosClient";
import { notification } from "antd";

const tableApi = {
  getAllTable: async () => {
    try {
      const response = await axiosClient.get(`api/table`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteTableById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/table/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editTableById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/table/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createTable: async (data) => {
    try {
      const response = await axiosClient.post(`api/table`, data);
      notification.success({ message: "Thêm bàn thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  setStatusById: async (id, data) => {
    try {
      const response = await axiosClient.patch(
        `api/table/status/${data}/${id}`
      );
      notification.success({ message: "Thay đổi trạng thái bàn sang rảnh thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default tableApi;
