import React from "react";
import PropTypes from "prop-types";
import axiosClient from "./../../api/axiosClient";
import jwt from "jsonwebtoken";
import {Button, Form, Input, notification} from "antd";

class AccountManager extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      dataUser: null,
    }
    this.getUser = this.getUser.bind(this);
    this.onFinish = this.onFinish.bind(this);
  }
  componentDidMount() {
    this.getUser();
  }
  onFinish(values) {
    let {
      dataUser
    } = this.props;
    let idUser = jwt.decode(localStorage.getItem("token")).id;
    axiosClient.patch("api/user/" + idUser, {
      "name": values.name,
      "email": values.email,
      "password": values.password,
      "address" : values.address,
      "phone" : values.phone,
    })
      .then(res => {
        this.getUser();
      })
      .catch(err => {

      })
  }


  getUser() {
    let idUser = jwt.decode(localStorage.getItem("token")).id;
    axiosClient.get('api/user/' + idUser)
      .then(res => {
        this.setState({
          dataUser: res
        })
        // this.props.setDataUser(null);
      })
      .catch(err => {

      })
  }
  render() {
    const {
      dataUser
    } = this.state;
    let email = dataUser ? dataUser.email : "";
    let address = dataUser ? dataUser.address : "";
    let name = dataUser ? dataUser.name : "";
    let phone = dataUser ? dataUser.phone : "";
    console.log(dataUser)
    return (
      <div class="wrapper bg-white mt-sm-5">
        <h4 class="pb-4 border-bottom">Quản lý tài khoản</h4>
        {dataUser && <Form
            name="normal_login"
            className="login-form"
            onFinish={this.onFinish}
          >
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Xin hãy nhập tên của bạn!',
                },
              ]}
              initialValue={name}
            >
              <Input placeholder="Tên"/>
            </Form.Item>
            <Form.Item
              name="address"
              rules={[
                {
                  required: true,
                  message: 'Xin hãy nhập địa chỉ của bạn!',
                },
              ]}
              initialValue={address}
            >
              <Input placeholder="Địa chỉ"/>
            </Form.Item>
            <Form.Item
              name="phone"
              rules={[
                {
                  required: true,
                  message: 'Xin hãy nhập số điện thoại của bạn!',
                },
              ]}
              initialValue={phone}
            >
              <Input placeholder="Số điện thoại"/>
            </Form.Item>
            <Form.Item
              name="email"
              rules={[
                {
                  type: 'email',
                  message: 'Bạn nhập không đúng định dạng email!',
                },
                {
                  required: true,
                  message: 'Xin hãy nhập email của bạn!',
                },
              ]}
              initialValue={email}
            >
              <Input placeholder="Địa chỉ email" disabled={true}/>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                Cập nhật thông tin
              </Button>
            </Form.Item>
         </Form>}
      </div>
    );
  }
}



export default AccountManager;
