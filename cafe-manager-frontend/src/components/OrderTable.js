import React, {Component} from "react";
import axios from "axios";
import {BASE_API} from "../constants";
import {Row, Col, Button, Form, Modal, notification} from 'antd';
import "./../assets/css/table.css";
import * as demoAction from "../redux/actions/demoAction";
import {compose} from "redux";
import {connect} from "react-redux";
import Auth from "./Auth";
import { DatePicker, Space } from 'antd';
import moment from "moment";
import LoadingAction from "../theme/LoadingAction";
import axiosClient from "../axiosClient";

const { RangePicker } = DatePicker;
class OrderTable extends Component{
    constructor(props) {
        super(props);
        this.state = {
            listTable: [],
            openAuthModal: false,
            idTableCurrent: null,
            openOrderModal: false,
            timeOrder: null,
            isLoading: true
        }
        this.getTable = this.getTable.bind(this);
        this.showAuthModal = this.showAuthModal.bind(this);
        this.closeAuthModalCancel = this.closeAuthModalCancel.bind(this);
        this.showOrderModal = this.showOrderModal.bind(this);
        this.closeOrderModal = this.closeOrderModal.bind(this);
        this.onOk = this.onOk.bind(this);
        this.openNotificationWithIcon = this.openNotificationWithIcon.bind(this);
        this.onTimeOrderChange = this.onTimeOrderChange.bind(this);
    }

    componentDidMount() {
        this.getTable();
    }



    getTable() {
        this.setState({
            isLoading: true
        })
        axiosClient.get('api/table')
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    this.setState({
                        listTable: res.data,
                        isLoading: false
                    })
                }
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isLoading: false
                })
            })
    }

    showOrderModal(idTableCurrent) {
        this.setState({
            openOrderModal: true,
            idTableCurrent: idTableCurrent
        })
    }
    closeOrderModal() {
        this.setState({
            openOrderModal: false,
            timeOrder: null
        })
    }

    openNotificationWithIcon(type, text) {
        this.closeOrderModal();
        notification[type]({
            message: "Thông báo",
            description: text
        });
    }
    orderTable() {
        const {dataUser} = this.props;

        if (this.state.timeOrder) {
            this.setState({
                isLoading: true
            })
            axiosClient.patch( "api/table/book/" + this.state.idTableCurrent, {
                "user": dataUser.dataUser._id,
                "time": this.state.timeOrder
            })
                .then(res => {
                    this.getTable();
                    if (res.status === 200) {
                        if (res.data._id) {
                            this.openNotificationWithIcon("success", "Đặt bàn thành công");
                        } else {
                            this.openNotificationWithIcon("warning", "Có một số người đã đặt bàn này");
                        }
                    } else {
                        this.openNotificationWithIcon("error", "Xảy ra lỗi");
                    }
                })
                .catch(err => {
                    this.getTable();
                    this.openNotificationWithIcon("error", "Xảy ra lỗi");
                })
        }
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

    onOk(value) {
        this.setState({
            timeOrder: value
        })
    }
    onTimeOrderChange(value) {
        this.setState({
            timeOrder: value
        })
    }

    disabledDate(value) {
        return value < moment();
    }

    render(){
        const {dataUser} = this.props;
        const {
            listTable,
            openAuthModal,
            openOrderModal,
            timeOrder,
            isLoading
        } = this.state;
        const checkToken = dataUser !== null && dataUser.accessToken;
        let statusList = ['free', 'booked', 'busy'];
        return (
            <div className="orderTableWrapper">
                {isLoading && <LoadingAction/>}
                {!checkToken && <div className="auth">
                    <div className="text">
                        Để đặt bàn bạn hay đăng nhập hoặc đăng ký tài khoản khách hàng tại đây
                    </div>
                    <Button className="btnAuth" onClick={() => this.showAuthModal()}>
                        Đăng nhập / Đăng ký
                    </Button>
                </div>}
                <Row className="tableList">
                    {
                        listTable.map((item, index) => {
                            if (statusList.includes(item.status)) {
                                return (
                                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className="tableItem">
                                        <div className="wrapper">
                                            <div className="name">
                                                {item.name}
                                            </div>
                                            <div className="description">
                                                {item.description}
                                            </div>
                                            <div className={"statusLabel " + item.status}>
                                                {
                                                    () => {
                                                        let statusLabel = "Status";
                                                        switch (item.status) {
                                                            case "free":
                                                                statusLabel = "Free";
                                                            case "booked":
                                                                statusLabel = "Booked";
                                                                break;
                                                            case "busy":
                                                                statusLabel = "Busy";
                                                                break;
                                                        }
                                                        return statusLabel;
                                                    }
                                                }
                                                {
                                                    item.status === "free"
                                                        ?
                                                        "Free"
                                                        :
                                                        item.status === "booked"
                                                            ?
                                                            "Booked"
                                                            :
                                                            item.status === "busy"
                                                                ?
                                                                "Busy"
                                                                :
                                                                "Status"
                                                }
                                            </div>
                                            { checkToken && <div className="book">
                                                {
                                                    item.status === "free" || item.status === "booked"
                                                        ?
                                                        <Button className="btnBook" onClick={() => this.showOrderModal(item._id)}>
                                                            Đặt bàn
                                                        </Button>
                                                        :
                                                        ""
                                                }
                                            </div>}
                                        </div>

                                    </Col>
                                );
                            }
                        })
                    }
                </Row>
                <Modal
                    title="Đăng nhập/Đăng ký"
                    visible={openAuthModal}
                    onCancel={this.closeAuthModalCancel}
                    className="profileModal"
                >
                    <Auth closeDialog={this.closeAuthModalCancel}/>
                </Modal>
                <Modal
                    title="Đặt bàn"
                    visible={openOrderModal}
                    onCancel={this.closeOrderModal}
                    className="profileModal"
                >
                    <div className="orderModalWrapper">
                            <Form.Item label="Thời gian">
                                <DatePicker
                                    showTime
                                    onChange={this.onTimeOrderChange}
                                    onOk={this.onOk}
                                    value={timeOrder}
                                    placeholder={"Chọn thời gian"}
                                    disabledDate={this.disabledDate}
                                />
                            </Form.Item>
                        <Button className="btnBook" onClick={() => this.orderTable()}>
                            Đặt bàn
                        </Button>
                    </div>
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

export default compose(connect(mapStateToProps, mapDispatchToProps))(OrderTable);
