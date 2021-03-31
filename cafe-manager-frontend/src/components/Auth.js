import React, {Component} from "react";
import {AUTH_FORM_TYPE_LOGIN, AUTH_FORM_TYPE_REGISTRATION} from "../constants/constants";
import {Button, Form} from "antd";
import Login from "./Auth/Login";
import Registration from "./Auth/Registration";
import "./../assets/css/auth.css";

class Auth extends Component{
    constructor(props) {
        super(props);
        this.state = {
            authFormType: AUTH_FORM_TYPE_LOGIN,
        }
        this.changeAuthForm = this.changeAuthForm.bind(this);
    }

    changeAuthForm(authFormType) {
        this.setState({
            authFormType: authFormType
        })
    }


    render(){
        const {classes} = this.props;
        const {
            authFormType
        } = this.state;
        return (
            <div className="authFormType">
                <div className="header">
                    {
                        authFormType === AUTH_FORM_TYPE_LOGIN
                            ?
                            <span className="title">Đăng nhập</span>
                            :
                            authFormType === AUTH_FORM_TYPE_REGISTRATION
                                ?
                                <span className="title">Đăng ký</span>
                                :
                                ""
                    }
                </div>
                <div className="body">
                    {
                        authFormType === AUTH_FORM_TYPE_LOGIN
                            ?
                            <Login closeDialog={() => {
                                this.props.closeDialog();
                            }}/>
                            :
                            authFormType === AUTH_FORM_TYPE_REGISTRATION
                                ?
                                <Registration changeAuthForm={this.changeAuthForm}/>
                                :
                                ""
                    }
                </div>
                <div className="footer">
                    {
                        authFormType === AUTH_FORM_TYPE_LOGIN
                            ?
                            <div>Bạn chưa có tài khoản ?  <Button onClick={() => {
                                this.setState({
                                    authFormType: AUTH_FORM_TYPE_REGISTRATION
                                })
                            }}>
                                Đăng ký
                            </Button></div>
                            :
                            authFormType === AUTH_FORM_TYPE_REGISTRATION
                                ?
                                <div>Bạn có tài khoản ?  <Button onClick={() => {
                                    this.setState({
                                        authFormType: AUTH_FORM_TYPE_LOGIN
                                    })
                                }}>
                                    Đăng nhập
                                </Button></div>
                                :
                                ""
                    }
                </div>
            </div>
        );
    }
}


export default Auth;
