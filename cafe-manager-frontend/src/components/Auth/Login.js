import React, {Component} from "react";
import {Button, Form, Input, notification} from "antd";
import axios from "axios";
import {AUTH_FORM_TYPE_LOGIN} from "../../constants/constants";
import {connect} from 'react-redux';
import * as demoAction from "./../../redux/actions/demoAction";
import axiosClient from "../../api/axiosClient";
class Login extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
        this.onFinish = this.onFinish.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
    }
    openNotificationWithIcon(type, text) {
        notification[type]({
            message: "Thông báo",
            description: text
        });
    }
    onFinish(values) {
        axiosClient.post("api/auth/login", {
            "email": values.email,
            "password": values.password,
        })
            .then(res => {
                console.log(res)
                if (res.status === 200 && res.data && res.data.dataUser && res.data.dataUser.role === 'customer') {
                    this.props.setDataUser(res.data);
                    this.openNotificationWithIcon("success", "Đăng nhập thành công");
                    this.props.closeDialog();
                } else {
                    this.props.setDataUser(null);
                    this.openNotificationWithIcon("error", "Có lỗi xảy ra");
                }
            })
            .catch(err => {
                this.props.setDataUser(null);
                if (err.response && err.response.data && err.response.data.message) {
                    this.openNotificationWithIcon("error", err.response.data.message);
                } else {
                    this.openNotificationWithIcon("error", "Có lỗi xảy ra");
                }
            })
    }
    render(){
        const {classes} = this.props;
        const {
            success
        } = this.state;

        return (
            <div className="login-form">
                <Form
                    name="normal_login"
                    className="login-form"
                    onFinish={this.onFinish}
                >
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
                    >
                        <Input placeholder="Địa chỉ email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Xin hãy nhập mật khẩu!'
                            }
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        dataUser: state.demo.dataUser
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        setDataUser: (dataUser) => dispatch(demoAction.setDataUser(dataUser))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);