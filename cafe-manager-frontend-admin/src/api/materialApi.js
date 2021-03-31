import axiosClient from "./axiosClient";
import { notification } from "antd";

const materialApi = {
  getAllMaterial: async () => {
    try {
      const response = await axiosClient.get(`api/material`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getMaterialInput: async () => {
    try {
      const response = await axiosClient.get(`api/materialInput`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getMaterialOutput: async () => {
    try {
      const response = await axiosClient.get(`api/materialOutput`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteMaterialById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/material/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editMaterialById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/updateImportMaterial/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createMaterialInput: async (data) => {
    try {
      const response = await axiosClient.post(`api/importMaterial`, data);
      notification.success({ message: "Thêm nguyên liệu thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createMaterialOutput: async (data) => {
    try {
      const response = await axiosClient.post(`api/exportMaterial`, data);
      notification.success({ message: "Xóa nguyên liệu thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default materialApi;
