import axiosClient from "./axiosClient";
import { notification } from "antd";

const typeProductApi = {
  getAllTypeProduct: async () => {
    try {
      const response = await axiosClient.get(`api/type`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteTypeProductById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/type/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editTypeProductById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/type/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createTypeProduct: async (data) => {
    try {
      const response = await axiosClient.post(`api/type`, data);
      notification.success({ message: "Thêm loại sản phẩm thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default typeProductApi;
