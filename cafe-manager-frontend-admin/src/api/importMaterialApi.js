import axiosClient from "./axiosClient";
import { notification } from "antd";

const importMaterialProductApi = {
  getAllImportMaterial: async () => {
    try {
      const response = await axiosClient.get(`api/importMaterial`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteImportMaterialById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/importMaterial/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editImportMaterialById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/importMaterial/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createImportMaterial: async (data) => {
    try {
      const response = await axiosClient.post(`api/importMaterial`, data);
      notification.success({ message: "Nhập nguyên liệu thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default importMaterialProductApi;
