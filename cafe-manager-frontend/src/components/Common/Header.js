import React, {Component} from "react";

import {NavLink} from "react-router-dom";
import { withRouter } from "react-router";
import {Anchor, Drawer, Menu, Dropdown, Button, Modal } from 'antd';
import {
    LoginOutlined
} from '@ant-design/icons';
import Auth from "../Auth";
import * as demoAction from "../../redux/actions/demoAction";
import {connect} from "react-redux";
import {compose} from "redux";
import logoFull from "./../../assets/images/logoFull.png";
import * as links from "./../../links";
import { UserOutlined } from '@ant-design/icons';
import EditUser from "../EditUser";
import axios from "axios";
import axiosClient from "../../api/axiosClient";

const { Link } = Anchor;

class Header extends Component{
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            openProfileModal: false,
            openAuthModal: false
        }
        this.showDrawer = this.showDrawer.bind(this);
        this.onClose = this.onClose.bind(this);
        this.showProfileModal = this.showProfileModal.bind(this);
        this.closeProfileModalCancel = this.closeProfileModalCancel.bind(this);
        this.showAuthModal = this.showAuthModal.bind(this);
        this.closeAuthModalCancel = this.closeAuthModalCancel.bind(this);
    }

    componentDidMount() {
        this.checkAuth = this.checkAuth.bind(this);
    }

    checkAuth() {
        axiosClient.post('api/auth')
            .then(res => {
                // this.props.setDataUser(null);
            })
            .catch(err => {
                this.props.setDataUser(null);
            })
    }

    showProfileModal() {
        this.setState({
            openProfileModal: true,
        })
    }

    closeProfileModalCancel() {
        this.setState({
            openProfileModal: false,
        })
    }

    showAuthModal() {
        this.setState({
            openAuthModal: true,
        })
    }

    closeAuthModalCancel() {
        this.setState({
            openAuthModal: false,
        })
    }
    showDrawer() {
        this.setState({
            visible: true,
        });
    };

    onClose() {
        this.setState({
            visible: false,
        });
    };

    render(){
        const {
            visible,
            openProfileModal,
            openAuthModal
        } = this.state;
        const {
            match,
            dataUser
        } = this.props;
        const pathHomePage = window.location.pathname;
        const checkToken = dataUser !== null && dataUser.accessToken;
        console.log(dataUser);
        const menu = (
            <Menu>
                <Menu.Item>
                   <div className="profileBtn" onClick={this.showProfileModal}>
                       Thông tin cá nhân
                   </div>
                </Menu.Item>
                <Menu.Item>
                   <div className="logout" onClick={() => {
                       this.props.setDataUser(null);
                   }}>
                       Đăng xuất
                   </div>
                </Menu.Item>
            </Menu>
        );
        return (
            <div className="container-fluid">
                <div className="header">
                    <div className="logo">
                        <i className="fas fa-bolt"></i>
                        <NavLink to={links.TRANG_CHU} title="Menu"><img src={logoFull} height={"60px"} /></NavLink>
                    </div>
                    <div className="mobileHidden">
                        <Anchor targetOffset="65">
                            <Link href={links.TRANG_CHU + '#trang-chu'} title="Trang chủ" />
                            <div className="ant-anchor-link">
                                <NavLink to={links.THUC_DON__LOAI}>Thực đơn</NavLink>
                            </div>
                            <div className="ant-anchor-link">
                                <NavLink to={links.DAT_BAN}>Đặt bàn</NavLink>
                            </div>
                            <Link href={links.TRANG_CHU + "#ve-chung-toi"} title="Về chúng tôi" />
                            <Link href={links.TRANG_CHU + "#dac-trung"} title="Đặc trưng" />
                            <Link href={links.TRANG_CHU + "#lien-he"} title="Liên hệ" />
                        </Anchor>
                        {
                            checkToken ? <Dropdown overlay={menu} placement="bottomCenter" arrow>
                                    <Button className="profile">
                                        <div className="fullName">
                                            {dataUser.dataUser.name}
                                        </div>
                                        <div className="avatar">
                                            {/*<img*/}
                                            {/*    src={"https://scontent.fhan2-5.fna.fbcdn.net/v/t1.0-9/126044059_1231756843884396_9201946568134028754_n.jpg?_nc_cat=107&ccb=2&_nc_sid=09cbfe&_nc_ohc=ON6ZOykbV1sAX8I2HHH&_nc_ht=scontent.fhan2-5.fna&oh=bd84a41290698f427deb4fa2f09961be&oe=5FF687E5"}*/}
                                            {/*    alt=""/>*/}
                                            <UserOutlined />
                                        </div>
                                    </Button>
                                </Dropdown>
                                :
                                <LoginOutlined className="authIcon" onClick={() => this.showAuthModal()}/>

                        }
                    </div>
                    <div className="mobileVisible">
                        <Button type="primary" onClick={this.showDrawer}>
                            <i className="fas fa-bars"></i>
                        </Button>
                        <Drawer
                            placement="right"
                            closable={false}
                            onClose={this.onClose}
                            visible={visible}
                        >
                            <Anchor targetOffset="65">
                                <Link href={links.TRANG_CHU + '#trang-chu'} title="Trang chủ" />
                                <div className="ant-anchor-link">
                                    <NavLink to={links.THUC_DON__LOAI}>Thực đơn</NavLink>
                                </div>
                                <div className="ant-anchor-link">
                                    <NavLink to={links.DAT_BAN}>Đặt bàn</NavLink>
                                </div>
                                <Link href={links.TRANG_CHU + "#ve-chung-toi"} title="Về chúng tôi" />
                                <Link href={links.TRANG_CHU + "#dac-trung"} title="Đặc trưng" />
                                <Link href={links.TRANG_CHU + "#lien-he"} title="Liên hệ" />
                            </Anchor>
                        </Drawer>
                    </div>
                </div>
                {checkToken && <Modal
                    title="Thông tin cá nhân"
                    visible={openProfileModal}
                    onCancel={this.closeProfileModalCancel}
                    className="profileModal"
                >
                    <EditUser />
                </Modal>}

                <Modal
                    title="Đăng nhập/Đăng ký"
                    visible={openAuthModal}
                    onCancel={this.closeAuthModalCancel}
                    className="profileModal"
                >
                    <Auth closeDialog={this.closeAuthModalCancel}/>
                </Modal>
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

export default compose(connect(mapStateToProps, mapDispatchToProps),withRouter)(Header);
