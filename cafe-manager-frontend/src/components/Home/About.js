import React, {Component} from "react";


import { Row, Col } from 'antd';

const items = [
    {
        key: '1',
        icon: <i className="fas fa-chart-pie"></i>,
        title: 'KHỞI NGUỒN',
        content: 'Coffee Fifteenth được sinh ra từ niềm đam mê bất tận với hạt cà phê Việt Nam. Qua một chặng đường dài, chúng tôi đã không ngừng mang đến những sản phẩm cà phê thơm ngon, sánh đượm trong không gian thoải mái và lịch sự với mức giá hợp lý. Những ly cà phê của chúng tôi không chỉ đơn thuần là thức uống quen thuộc mà còn mang trên mình một sứ mệnh văn hóa phản ánh một phần nếp sống hiện đại của người Việt Nam.'
    },
    {
        key: '2',
        icon: <i className="fas fa-desktop"></i>,
        title: 'DỊCH VỤ KHÁCH HÀNG',
        content: 'Chúng tôi mong muốn mang đến cho bạn những trải nghiệm đáng nhớ mỗi lần đến Coffee Fifteenth®. Hãy chia sẻ với chúng tôi để chúng tôi có thể mang đến cho bạn những trải nghiệm tuyệt vời hơn thế.'
    },
    {
        key: '3',
        icon: <i className="fas fa-database"></i>,
        title: 'NGHỀ NGHIỆP',
        content: 'Với sứ mệnh trở thành thương hiệu cà phê Việt Nam dẫn đầu, Coffee Fifteenth® luôn tìm kiếm những ứng cử viên tiềm năng có chung niềm đam mê và nỗ lực cùng chúng tôi vươn tới thành công. Chúng tôi luôn chào đón các bạn gia nhập vào đội ngũ chuyên nghiệp của gia đình Coffee Fifteenth.'
    },
]
class About extends Component{
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render(){
        const {

        } = this.state;
        return (
            <div id="ve-chung-toi" className="block aboutBlock">
                <div className="container-fluid">
                    <div className="titleHolder">
                        <h2>Về chúng tôi</h2>
                        <p>Coffee Fifteenth - Luôn ở bên bạn</p>
                    </div>
                    <Row gutter={[16, 16]}>
                        {items.map(item => {
                            return (
                                <Col md={{ span: 8 }} key={item.key}>
                                    <div className="content">
                                        <div className="icon">
                                            {item.icon}
                                        </div>
                                        <h3 style={{
                                            fontWeight: 600,
                                            fontSize: '1.2rem',
                                        }}>{item.title}</h3>
                                        <p>{item.content}</p>
                                    </div>
                                </Col>
                            );
                        })}
                    </Row>
                </div>
            </div>
        );
    }
}


export default About;
