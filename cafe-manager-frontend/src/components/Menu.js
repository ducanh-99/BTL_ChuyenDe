import React, {Component} from "react";
import { withRouter } from "react-router";
import { Row, Col } from 'antd';
import './../assets/css/menu.css';
import BgMenu1 from "./../assets/images/bg-menu-1.jpg";
import BgMenu2 from "./../assets/images/bg-menu-2.jpg";
import BgMenu3 from "./../assets/images/bg-menu-3.jpg";
import BgMenu4 from "./../assets/images/bg-menu-4.jpg";
import LogoMenu4 from "./../assets/images/logo-menu-1.png";
import LogoMenu2 from "./../assets/images/logo-menu-2.png";
import LogoMenu3 from "./../assets/images/logo-menu-3.png";
import LogoMenu1 from "./../assets/images/logo-menu-4.png";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {BASE_API, BASE_IMAGE} from "../constants";
import LoadingAction from "../theme/LoadingAction";
import * as links from "../links";
class Menu extends Component{
    constructor(props) {
        super(props);
        this.state = {
            menuTypeList: [],
            isLoading: true
        }
        this.getTypeList = this.getTypeList.bind(this);
    }

    componentDidMount() {
       this.getTypeList();
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

    render(){
        const {
            match
        } = this.props;
        const {
            isLoading,
            menuTypeList
        } = this.state;
        console.log(menuTypeList)
        return (
            <div className="menuWrapper">
                {isLoading && <LoadingAction/>}
                {
                    menuTypeList.map((menuTypeItem, index) => {
                        return (
                            <div className="menuTypeItem" style={{
                                backgroundImage: `url(${menuTypeItem.bg})`
                            }}>
                                <Row>
                                    {!(index%2 === 0) && <Col xs={24} sm={24} md={12} lg={12} xl={12} className="logoMenu">
                                        <img src={menuTypeItem.logo} alt=""/>
                                    </Col>}
                                    <Col xs={24} sm={24} md={12} lg={12} xl={12} className="describeMenu">
                                        <h2 style={{
                                            color: menuTypeItem.nameColor
                                        }} className="name">{menuTypeItem.name}</h2>
                                        <div
                                            className={"description"}
                                            style={{
                                                color: menuTypeItem.descriptionColor
                                            }}
                                        >
                                            {menuTypeItem.description}
                                        </div>
                                        <NavLink
                                            to={links.THUC_DON__DANH_SACH.replace(":idType", menuTypeItem.id).replace(":name", menuTypeItem.name)}
                                        >
                                            <div className={"clickShowMenu"} style={{
                                                color: menuTypeItem.clickColor,
                                                borderColor: menuTypeItem.clickColor,
                                            }}>
                                                Xem chi tiết
                                            </div>
                                        </NavLink>
                                    </Col>
                                    {index%2 === 0 && <Col xs={24} sm={24} md={12} lg={12} xl={12} className="logoMenu">
                                        <img src={menuTypeItem.logo} alt=""/>
                                    </Col>}
                                </Row>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}


export default withRouter(Menu);
