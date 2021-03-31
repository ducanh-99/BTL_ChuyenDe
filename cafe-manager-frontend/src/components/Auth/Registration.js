import React, {Component} from "react";
import {Button, Form, Input, notification} from "antd";
import axios from "axios";
import {AUTH_FORM_TYPE_LOGIN, AUTH_FORM_TYPE_REGISTRATION} from "../../constants/constants";
import {BASE_API} from "../../constants";
import LoadingAction from "../../theme/LoadingAction";
import axiosClient from "../../api/axiosClient";
class Registration extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
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
        console.log(values);
        axiosClient.post( "api/auth/register", {
            "name": values.name,
            "email": values.email,
            "password": values.password,
            "address" : values.address,
            "phone" : values.phone,
        })
            .then(res => {
                this.setState({
                    isLoading: false
                })
                this.openNotificationWithIcon("success", "Đăng ký thành công");
                setTimeout(() => {
                    this.props.changeAuthForm(AUTH_FORM_TYPE_LOGIN);
                }, 1000);
            })
            .catch(err => {
                this.setState({
                    isLoading: false
                })
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
            isLoading
        } = this.state;
        return (
            <div className="registration-form">
                {isLoading && <LoadingAction/>}
                <Form
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
                    >
                        <Input placeholder="Địa chỉ email"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Xin hãy nhập mật khẩu!'
                            },
                            // {
                            //     pattern: "/^[a-zA-Z0-9]{6,128}$/",
                            //     message: 'Mật khẩu chưa thỏa mãn yêu cầu!'
                            // }
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu"/>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            Đăng ký
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}


export default Registration;
