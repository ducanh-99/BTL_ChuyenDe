import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Row, Col, ConfigProvider, DatePicker, Space } from "antd";
import { useState } from "react";
import homeApi from "../../api/homeApi";

import moment from "moment";
import "moment/locale/vi";
import locale from "antd/lib/locale/vi_VN";
import { Bar, Line } from "react-chartjs-2";

const { RangePicker } = DatePicker;

function Home(props) {
  const [value, setValue] = useState([]);
  const [valueProduct, setValueProduct] = useState([]);

  useEffect(async () => {
    let resProduct = await homeApi.getStatisticProduct();
    setValueProduct(resProduct);
  }, []);

  const handleSuccess = (res) => {
    console.log(res);
  };

  async function onChange(value, dateString) {
    console.log("Selected Time: ", value);
    console.log("Formatted Selected Time: ", dateString);
    let res = await homeApi.getStatistic(
      value[0].valueOf(),
      value[1].valueOf()
    );
    console.log(res);
    setValue(res);
  }

  function onOk(value) {
    console.log("onOk: ", value);
  }

  const dataBar = {
    labels: valueProduct.map((item, index) => item.name),
    datasets: [
      {
        label: "Tổng số sản phẩm bán từng đơn hàng",
        fill: false,
        // lineTension: 0.1,
        backgroundColor: "green",
        borderColor: "green",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "green",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "green",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: valueProduct.map((item) => item.total),
      },
    ],
  };

  const data = {
    labels: value.map((item, index) =>
      moment(item.time).format("DD-MM-YYYY HH:mm:ss")
    ),
    datasets: [
      {
        label: "Giá tiền theo từng đơn hàng",
        fill: false,
        // lineTension: 0.1,
        backgroundColor: "blue",
        borderColor: "blue",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "blue",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "blue",
        pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: value.map((item) => item.totalPrice),
      },
    ],
  };

  return (
    <div>
      <Row>
        <Col span={12}>
          <div
            style={{
              backgroundColor: "green",
              // height: "40px",
              borderRadius: "3px",
              padding: "16px",
              marginBottom: "16px",
              fontSize: "16px",
              color: "white",
            }}
          >
            Thống kê tổng giá tiền theo từng đơn hàng
          </div>
        </Col>
      </Row>
      <Row style={{ marginBottom: "16px" }}>
        <Col span={24}>
          <ConfigProvider locale={locale}>
            <RangePicker
              showTime={{ format: "HH:mm:ss" }}
              format="DD-MM-YYYY HH:mm:ss"
              onChange={onChange}
              onOk={onOk}
              ranges={{
                "Hôm nay": [moment().startOf("day"), moment().endOf("day")],
                "Hôm qua": [
                  moment().startOf("day").subtract(1, "day"),
                  moment().endOf("day").subtract(1, "day"),
                ],
                "Tháng này": [
                  moment().startOf("month"),
                  moment().endOf("month"),
                ],
                "Tháng trước": [
                  moment().startOf("month").subtract(1, "month"),
                  moment().endOf("month").subtract(1, "month"),
                ],
              }}
            />
          </ConfigProvider>
        </Col>
      </Row>
      <Row>
        <Col
          span={20}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Line
            data={data}
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: false,
            // }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={12}>
          <div
            style={{
              backgroundColor: "blue",
              // height: "40px",
              borderRadius: "3px",
              padding: "16px",
              margin: "16px",
              fontSize: "16px",
              color: "white",
            }}
          >
            Thống kê tổng số sản phẩm của từng đơn hàng
          </div>
        </Col>
      </Row>
      <Row>
        <Col
          span={20}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Bar
            data={dataBar}
            // options={{
            //   responsive: true,
            //   maintainAspectRatio: false,
            // }}
          />
        </Col>
      </Row>
    </div>
  );
}

Home.propTypes = {};

export default Home;
