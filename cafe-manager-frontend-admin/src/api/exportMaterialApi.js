import axiosClient from "./axiosClient";
import { notification } from "antd";

const exportMaterialProductApi = {
  getAllExportMaterial: async () => {
    try {
      const response = await axiosClient.get(`api/exportMaterial`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteExportMaterialById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/exportMaterial/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editExportMaterialById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/exportMaterial/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createExportMaterial: async (data) => {
    try {
      const response = await axiosClient.post(`api/exportMaterial`, data);
      notification.success({ message: "Xuất nguyên liệu thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default exportMaterialProductApi;
