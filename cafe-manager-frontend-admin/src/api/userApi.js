import axiosClient from "./axiosClient";
import { notification } from "antd";

const userApi = {
  login: async (data) => {
    try {
      const response = await axiosClient.post(`api/auth/login`, data);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getAllUser: async () => {
    try {
      const response = await axiosClient.get(`api/user`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  deleteUserById: async (id) => {
    try {
      const response = await axiosClient.delete(`api/user/${id}`);
      notification.success({ message: "Xóa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  editUserById: async (id, data) => {
    try {
      const response = await axiosClient.patch(`api/user/${id}`, data);
      notification.success({ message: "Sửa thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
  createUser: async (data) => {
    try {
      const response = await axiosClient.post(`api/auth/register`, data);
      notification.success({ message: "Thêm tài khoản thành công!" });
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default userApi;
