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
import * as links from "./../../links";
import axios from "axios";
import {BASE_API, BASE_IMAGE} from "../../constants";
// import Slider from "@ant-design/react-slick";
import { LeftSquareOutlined } from '@ant-design/icons';
import { RightSquareOutlined } from '@ant-design/icons';
import Slider from "react-slick";

class MenuList extends Component{
    constructor(props) {
        super(props);
        this.state = {
            idType: this.props.match.params.idType,
            menuTypeList: [],
            menuList: []
        }
        this.getTypeList = this.getTypeList.bind(this);
    }

    componentDidMount() {
        this.getTypeList();
        this.getProduct(this.state.idType);
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

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.match.params.idType !== this.state.idType) {
            this.setState({
                idType: this.props.match.params.idType
            }, () => {
                this.getProduct(this.props.match.params.idType);
            })
        }
    }

    getProduct(idType) {
        axios.get(BASE_API + "/api/product?typeId=" + idType)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    let dataProduct = res.data;
                    let menuList = [];
                    dataProduct.map((item, index) => {
                        menuList.push({
                            name: item.name,
                            description: item.description,
                            logo: item.photo ? BASE_IMAGE + item.photo: LogoMenu4,
                            price: item.price,
                            id: item._id
                        })
                    })
                    this.setState({
                        menuList: menuList
                    })
                }
            })
            .catch(err => {
                console.log(err);
            })
    }

    getMenuTypeById(idType) {
        const {
            menuTypeList
        } = this.state;
        const menuTypeCurrent = menuTypeList.filter((item) => {
            return item.id === idType;
        })
        return menuTypeCurrent;
    }

    render(){
        const {
            match,
        } = this.props;
        const {
            isLoading,
            menuTypeList,
            idType,
            menuList
        } = this.state;
        const settings = {
            dots: true,
            infinite: true,
            speed: 500,
            slidesToShow: 3,
            slidesToScroll: 3,
            nextArrow: <RightSquareOutlined/>,
            prevArrow: <LeftSquareOutlined/>,
        };
        return (
            <div className="menuListWrapper">
                <Row>
                    <Col xs={24} sm={24} md={6} lg={6} xl={6} className="menuSideBar">
                        {
                            menuTypeList.map((item, index) => {
                                return (
                                    <NavLink
                                        to={links.THUC_DON__DANH_SACH.replace(":idType", item.id).replace(":name", item.name)}
                                    >
                                        <div className={"menuTypeItemSidebar" + (item.id === idType ? " active" : "")}>
                                            <img src={item.logo} alt=""/>
                                            <div className="name">{item.name}</div>
                                        </div>
                                    </NavLink>
                                );
                            })
                        }
                    </Col>
                    <Col xs={24} sm={24} md={18} lg={18} xl={18} className="menuList">
                        {this.getMenuTypeById(idType).length && <div className="infoMenuType" style={{
                            backgroundImage: `url(${this.getMenuTypeById(idType)[0].bg})`
                        }}>
                            <Row>
                                <Col xs={24} sm={24} md={8} lg={8} xl={8} className="logoMenu">
                                    <img src={this.getMenuTypeById(idType)[0].logo} alt=""/>
                                </Col>
                                <Col xs={24} sm={24} md={16} lg={16} xl={16} className="describeMenu">
                                    <h2 style={{
                                        color: this.getMenuTypeById(idType)[0].nameColor
                                    }} className="name">{this.getMenuTypeById(idType)[0].name}</h2>
                                    <div
                                        className={"description"}
                                        style={{
                                            color: this.getMenuTypeById(idType)[0].descriptionColor
                                        }}
                                    >
                                        {this.getMenuTypeById(idType)[0].description}
                                    </div>
                                </Col>
                            </Row>
                        </div>}
                        <div className="menuListTheme">
                            <Slider {...settings}>
                                {
                                    menuList.map((item, index) => {
                                        return (
                                            <div className="menuItem">
                                                <NavLink
                                                    to={links.THUC_DON__CHI_TIET.replace(":id", item.id).replace(":name", item.name)}
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
                                            </div>
                                        );
                                    })
                                }
                            </Slider>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}


export default withRouter(MenuList);
