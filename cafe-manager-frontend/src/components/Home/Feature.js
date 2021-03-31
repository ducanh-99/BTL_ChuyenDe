import React, {Component} from "react";

import nguyen_lieu_chat_luong from '../../assets/images/nguyen_lieu_chat_luong.jpg';
import nhan_vien_than_thien from '../../assets/images/nhan_vien_than_thien.jpg';
import sang_tao_khong_ngung from '../../assets/images/sang_tao_khong_ngung.jpg';


import { Row, Col } from 'antd';
import { Card } from 'antd';
const { Meta } = Card;


class Feature extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const {

        } = this.state;
        return (
            <div id="dac-trung" className="block featureBlock bgGray">
                <div className="container-fluid">
                    <div className="titleHolder">
                        <h2>Coffee Fifteenth - Tận hưởng cuộc sống</h2>
                        <p>Đem đến cho bạn cảm giác tỉnh táo suốt cả ngày</p>
                    </div>
                    <Row gutter={[16, 16]}>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                            <Card
                                hoverable
                                cover={<img style={{height: 240}} alt="Nguyên liệu chất lượng" src={nguyen_lieu_chat_luong} />}
                            >
                                <Meta title="Nguyên liệu chất lượng" />
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                            <Card
                                hoverable
                                cover={<img style={{height: 240}} alt="Nhân viên thân thiện" src={nhan_vien_than_thien} />}
                            >
                                <Meta title="Nhân viên thân thiện" />
                            </Card>
                        </Col>
                        <Col xs={{ span: 24 }} sm={{ span: 12 }} md={{ span: 8 }}>
                            <Card
                                hoverable
                                cover={<img style={{height: 240}} alt="Sáng tạo không ngừng" src={sang_tao_khong_ngung} />}
                            >
                                <Meta title="Sáng tạo không ngừngg" />
                            </Card>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}


export default Feature;
