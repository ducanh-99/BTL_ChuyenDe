import React, {Component} from "react";

import { Button } from 'antd';

import { Carousel } from 'antd';
import {Link, NavLink} from "react-router-dom";

class Hero extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const {

        } = this.state;
        return (
            <div id="trang-chu" className="heroBlock">
                <Carousel>
                    <div className="container-fluid">
                        <div className="content">
                            <h3>Coffee Fifteenth - Vì chúng tôi là số 1</h3>
                            <div className="btnHolder">
                                <NavLink to={"/dat-ban"}>
                                    <Button size="large">Đặt bàn</Button>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </Carousel>
            </div>
        );
    }
}


export default Hero;
