import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import "./About.css";

class About extends Component {
    render() {
        return (
            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(./about.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>GIỚI THIỆU</h2>
                    </div>
                </div>
                <Container>
                    <h2 className="commitment">CAM KẾT CỦA CHÚNG TÔI</h2>
                    <h3 className="commitment_content">“Hít thở bình yên, thở ra căng thẳng. Thư giãn có thể mang lại sự nhẹ nhõm cho phần lớn những gì
                    khiến bạn cảm thấy khó chịu. Trong thế giới căng thẳng và thường xuyên tiêu cực của chúng tôi,
                     quyết định ưu tiên thư giãn của bạn sẽ giúp bạn điều hướng, xử lý và giảm thiểu căng thẳng”</h3>
                    <div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
                        <div className="divider"></div>
                        <i className="fa fa-leaf iconLeaf"></i>
                        <div className="divider"></div>
                    </div>
                </Container>
                <Container fluid>
                    <Row style={{ marginRight: '30px', marginLeft: '30px' }}>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>GÓI & GIÁ</h2>
                                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/how-can-make-sure-prenatal-massage-safe-2160X1200-1024x569.jpg"></img>

                            </div>
                        </Col>
                        <Col md="6">
                            <div className="cardAbout" >
                                <h2>SPA CỦA CHÚNG TÔI</h2>
                                <img src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/slice-1-1024x569.jpg"></img>

                            </div>
                        </Col>
                    </Row>
                </Container>
                <div className="overlay_background" style={{ marginTop: '40px', backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/05/p1270064.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>ĐỘI NGŨ CỦA CHÚNG TÔI.</h2>
                        <div className="comex">SẼ LUÔN LÀM BẠN HÀI LÒNG.</div>
                    </div>
                </div>


            </div>
        );
    }
}

export default About;
