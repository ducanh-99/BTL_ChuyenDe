import React, {Component} from "react";
import { withRouter } from "react-router";
import { Row, Col } from 'antd';
import './../../assets/css/menu.css';
import BgMenu1 from "./../../assets/images/bg-menu-1.jpg";
import BgMenu2 from "./../../assets/images/bg-menu-2.jpg";
import BgMenu3 from "./../../assets/images/bg-menu-3.jpg";
import BgMenu4 from "./../../assets/images/bg-menu-4.jpg";
import LogoMenu4 from "./../../assets/images/logo-menu-1.png";
import LogoMenu2 from "./../../assets/images/logo-menu-2.png";
import LogoMenu3 from "./../../assets/images/logo-menu-3.png";
import LogoMenu1 from "./../../assets/images/logo-menu-4.png";
import {NavLink} from "react-router-dom";
import { Button } from 'antd';
import axios from "axios";
import {BASE_API, BASE_IMAGE} from "../../constants";
import * as links from "../../links";
import axiosClient from "../../api/axiosClient";

class MenuDetail extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menuTypeList: [],
            isLoading: true,
            menuListHot: [],
            menuCurrent: null,
            idMenu: this.props.match.params.id,
        }

    }
    componentDidMount() {
        this.getTypeList();
        // show product
        this.showProduct(this.state.idMenu);

        // list product hot
        this.getProduct();
    }

    getTypeList() {
        axios.get(BASE_API + '/api/type')
            .then(res => {
                if (res.status === 200) {
                    const dataType = res.data;
                    let menuTypeList = [];
                    dataType.map((item, index) => {
                        let bg = null;
                        let logo = null;
                        let nameColor = null;
                        let descriptionColor = null;
                        let clickColor = null;
                        switch (index) {
                            case 0:
                                bg = BgMenu1;
                                logo = LogoMenu1;
                                nameColor = "#fff";
                                descriptionColor = "#fff";
                                clickColor = "#fff";
                                break;
                            case 1:
                                bg = BgMenu2;
                                logo = LogoMenu2;
                                nameColor = "#006400";
                                descriptionColor = "#006400";
                                clickColor = "#006400";
                                break;
                            case 2:
                                bg = BgMenu3;
                                logo = LogoMenu3;
                                nameColor = "#fff";
                                descriptionColor = "#fff";
                                clickColor = "#fff";
                                break;
                            case 3:
                                bg = BgMenu4;
                                logo = LogoMenu4;
                                nameColor = "#fff";
                                descriptionColor = "#fff";
                                clickColor = "#fff";
                                break;
                            default:
                                bg = BgMenu1;
                                logo = LogoMenu1;
                                nameColor = "#fff";
                                descriptionColor = "#fff";
                                clickColor = "#fff";
                                break;
                        }
                        menuTypeList.push({
                            bg: bg,
                            logo: item.photo ? BASE_IMAGE + item.photo : logo,
                            nameColor: nameColor,
                            descriptionColor: descriptionColor,
                            clickColor: clickColor,
                            name: item.name,
                            description: item.description,
                            id: item._id
                        });
                    });
                    this.setState({
                        isLoading: false,
                        menuTypeList: menuTypeList
                    })
                }
            })
            .catch(err => {

            })
    }

    getProduct() {
        axiosClient.get( "api/product?page=0&limit=3")
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const dataProduct = res.data;
                    console.log(dataProduct)
                    let menuListHot = [];
                    dataProduct.map((item, index) => {
                        menuListHot.push({
                            name: item.name,
                            description: item.description,
                            logo: item.photo ? BASE_IMAGE + item.photo: LogoMenu4,
                            price: item.price,
                            id: item._id
                        })
                    })
                    this.setState({
                        menuListHot: menuListHot
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    showProduct(id) {
        axiosClient.get(  "api/product/" + id)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    const dataProduct = res.data;
                    let menuCurrent = {};
                    menuCurrent.name = dataProduct.name;
                    menuCurrent.description = dataProduct.description;
                    menuCurrent.price = dataProduct.price;
                    menuCurrent.logo = dataProduct.photo ? BASE_IMAGE + dataProduct.photo: LogoMenu4;
                    menuCurrent.type = dataProduct.type && dataProduct.type.name ? dataProduct.type.name : "Loại Menu";
                    this.setState({
                        menuCurrent: menuCurrent
                    })
                }
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.id !== this.state.idMenu) {
            this.setState({
                idMenu: this.props.match.params.id
            }, () => {
                this.showProduct(this.props.match.params.id);
                this.getProduct();
            })
        }
    }

    render(){
        const {
            match
        } = this.props;
        const {
            isLoading,
            menuTypeList,
            menuCurrent,
            menuListHot
        } = this.state;
        return (
            <div className="menuDetailWrapper">
                <Row>
                    {menuCurrent && <Col xs={24} sm={24} md={16} lg={16} xl={16} className="menuDetailLeft">
                        <div className="menuDetailContent">
                            <div className="name">
                                {menuCurrent.name}
                            </div>
                            <div className="detail">
                                <Row>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="detailLeft">
                                        <img src={menuCurrent.logo} alt=""/>
                                    </Col>
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="detailRight">
                                        <div className="description">
                                            {menuCurrent.description}
                                        </div>
                                        <div className="type">
                                            {menuCurrent.type}
                                        </div>
                                        <div className="price">
                                            <span className="label">Giá : </span> {menuCurrent.price} VND
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                        <div className="menuHot">
                            <div className="title">Thực đơn nổi bật</div>
                            <div className="menuListTheme">
                                <Row>
                                    {
                                        menuListHot.map((item, index) => {
                                            return (
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className="menuItem">
                                                    <NavLink
                                                        to={links.THUC_DON__CHI_TIET.repeat(":id", item.id)}
                                                    >
                                                        <div className="image">
                                                            <img src={item.logo} alt=""/>
                                                        </div>
                                                        <div className="name">
                                                            {item.name}
                                                        </div>
                                                    </NavLink>
                                                    <div className="price">
                                                        <span className="label">Giá : </span>{item.price} VND
                                                    </div>
                                                    <div className="detail">
                                                        <NavLink
                                                            to={links.THUC_DON__CHI_TIET.replace(":id", item.id).replace(":name", item.name)}
                                                        >
                                                            <Button>Chi tiết</Button>
                                                        </NavLink>
                                                    </div>
                                                </Col>
                                            );
                                        })
                                    }
                                </Row>
                            </div>
                        </div>
                    </Col>}
                    <Col xs={24} sm={24} md={8} lg={8} xl={8} className="menuDetailRight">
                        {
                            menuTypeList.map((item, index) => {
                                return (
                                    <NavLink
                                        to={links.THUC_DON__DANH_SACH.replace(":idType", item.id).replace(":name", item.name)}
                                    >
                                        <div className="typeItem">
                                            <Row>
                                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className="image">
                                                    <img src={item.logo} alt=""/>
                                                </Col>
                                                <Col xs={24} sm={24} md={16} lg={16} xl={16} className="describe">
                                                    <div className="name">
                                                        {item.name}
                                                    </div>
                                                    <div className="description">
                                                        {item.description}
                                                    </div>
                                                </Col>
                                            </Row>
                                        </div>
                                    </NavLink>
                                );
                            })
                        }
                    </Col>
                </Row>
            </div>
        );
    }
}


export default withRouter(MenuDetail);
