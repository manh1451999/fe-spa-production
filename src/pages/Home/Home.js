import axios from 'axios';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { Component } from 'react';
import OwlCarousel from 'react-owl-carousel';
import { Link } from 'react-router-dom';
import { Col, Container, Row } from "reactstrap";
import "./Home.css";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.state = {
            cardService: [],
            numberItems: 3
        }
    }
    componentDidMount() {
        axios.get("/service/").then(res => {
            this.setState({
                cardService: res.data
            });
            console.log(res.data)
        });
    }
    componentWillMount() {
        if (window.innerWidth < 900) this.setState({ numberItems: 2 })
        if (window.innerWidth < 750) this.setState({ numberItems: 1 })
        window.addEventListener('resize', () => {
            if (window.innerWidth >= 1000) this.setState({ numberItems: 3 })
            if (window.innerWidth < 1000) this.setState({ numberItems: 2 })
            if (window.innerWidth < 750) this.setState({ numberItems: 1 })
        })
    }
    render() {
        const { cardService, numberItems } = this.state;
        return (
            <div className="ContentHome">
                <Container >
                    <h2 className="serviceTitle">Green Spa’s Services</h2>
                    <div className="tagLine">Hãy để chúng tôi khiến bạn thư giãn.</div>
                    <div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
                        <div className="divider"></div>
                        <i className="fa fa-leaf iconLeaf"></i>
                        <div className="divider"></div>
                    </div>

                    <Row style={{ marginBottom: '30px' }}>
                        {cardService.length && <OwlCarousel
                            className="owl-theme"
                            loop
                            margin={10}
                            nav
                            items={numberItems}
                        >
                            {cardService.map((item, index) => (
                                <Col key={index}>
                                    <div className="cardService">
                                        <img src={item.img} alt="our service"></img>
                                        <div className="serviceContent">
                                            <h3>{item.name}</h3>
                                            <p>{item.description}</p>
                                            <Link to={`/service/${item._id}`} className="readmore">Xem chi tiết</Link>
                                        </div>
                                    </div>
                                </Col>
                            ))}
                        </OwlCarousel>
                        }

                    </Row>



                    <Row>
                        <Col>
                            <h3 style={{ fontSize: '25px', fontWeight: '300', color: '#333333', fontFamily: 'Rubik, Helvetica, Arial, sans-serif', marginLeft: '10px', padding: '55px 0px 55px 0px' }}>“Dịch vụ và chất lượng được đặt lên đầu.
                        Giúp bạn có giây phút thư giãn tốt nhất"</h3>
                        </Col>
                        <Col style={{ color: '#666666', fontFamily: 'inherit', fontSize: '16.5px', fontWeight: '450', padding: '55px 20px 55px 20px' }}>
                            <p>Chỉ cần cho đến chân và phân loại không có chuối, thịt bò có chức năng, không tốn kém. Trên thực tế, Justo, rhoncus ut, unsatdiet a, venenatis vitae, justo. When Pulls Rays Super Bowl núi nascetur` mollis.</p>
                        </Col>
                    </Row>

                </Container>
                <div className="overlay_background" >
                    <div className='overlay_background1'>
                        <h2>Sự vô tận của vẻ đẹp & niềm đam mê</h2>
                        <div className="comex">HÃY ĐẾN THIÊN ĐƯỜNG THƯ GIÃN</div>
                    </div>
                </div>
                <Container style={{ marginTop: '50px' }}>
                    <Row>
                        <Col lg="6">
                            <div className="secret_text">
                                <h2>Bí mật thư giãn</h2>
                                <p>Uống dấm stumptown y pop-up là nghệ nhân. Cả selfie deep V sáo rỗng lomo biodiesel. Bốn Loko quần đùi dài fixie nhiếp ảnh bài tập về nhà linh hoạt cà phê nguồn gốc đơn. Banksy, nhà phát triển và freegan hàng loạt nhỏ. Khối lượng hoa nhài. Khi kéo ra tia EUR con chuột lố bịch</p>
                                <Link to="/services">VIEW OUR SERVICES</Link>
                            </div>
                        </Col>
                        <Col lg="6">
                            <div className="secret_img"></div>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: '30px' }}>
                        <Col lg="6">
                            <div className="secret_img_second"></div>
                        </Col>
                        <Col lg="6">
                            <div className="secret_text">
                                <h2>Luôn làm hài lòng khách hàng</h2>
                                <p>Uống dấm stumptown y pop-up là nghệ nhân. Cả selfie deep V sáo rỗng lomo biodiesel. Bốn Loko quần đùi dài fixie nhiếp ảnh bài tập về nhà linh hoạt cà phê nguồn gốc đơn. Banksy, nhà phát triển và freegan hàng loạt nhỏ. Khối lượng hoa nhài. Khi kéo ra tia EUR con chuột lố bịch</p>
                                <Link to="/services">VIEW OUR SERVICES</Link>
                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="overlay_background" style={{ marginTop: '60px', backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/eforea-Relaxation-Room.jpg" }} >
                    <div className='overlay_background1'>
                        <h2>Thư giãn. Không còn vượt quá ngân sách của bạn</h2>
                        <div className="comex">HÃY ĐẾN KINH NGHIỆM BÍ MẬT THƯ GIÃN.</div>
                    </div>
                </div>

            </div>
        );
    }
}

