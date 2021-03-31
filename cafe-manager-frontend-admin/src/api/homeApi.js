import axiosClient from "./axiosClient";
import { notification } from "antd";

const homeApi = {
  getStatistic: async (begin, end) => {
    try {
      const response = await axiosClient.get(
        `api/statistic?begin=${begin}&end=${end}`
      );
      return response;
    } catch (error) {
      throw error;
    }
  },
  getStatisticProduct: async (begin, end) => {
    try {
      const response = await axiosClient.get(`api/statistic/product`);
      return response;
    } catch (error) {
      throw error;
    }
  },
};

export default homeApi;
