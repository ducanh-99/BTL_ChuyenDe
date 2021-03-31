import axiosClient from "./axiosClient";
import { notification } from "antd";

const productApi = {
  getAllProduct: async () => {
    try {
      const response = await axiosClient.get(`api/product`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteProductById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/product/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editProductById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/product/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createProduct: async (data) => {
    try {
      const response = await axiosClient.post(`api/product`, data);
      notification.success({ message: "Thêm sản phẩm thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default productApi;
