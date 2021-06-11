import React, { Component } from 'react';
import './Footer.css';

export default class Footer extends Component {
  render() {
    return (
      <section className="footer-custom">
        <div className="container ">
          <div className="row">
            <div className="col-md-4 ">
              <div className="col-one">
                <div className="title">
                  <img src="/icon/header/logoWhite.png" width="140px" style={{ marginBottom: "20px" }} />
                </div>
                <div className="content">
                  <span>
Meh synth Schlitz, tempor duis cà phê nguồn gốc đơn lẻ cấp độ tiếp theo dân tộc fingerstache fanny pack nostrud. Buồng ảnh hoạt hình 8-bit hella, PBR 3 con sói mặt trăng râu Helvetica                  </span>
                </div>
              </div>
            </div>
            <div className="col-md-4 ">
              <div className="col-two">
                <div className="info">
                  <h5>
                    CONTACT INFO
                  </h5>
                </div>
                <div >
                  <ul style={{ paddingInlineStart: '0px' }}>
                    <li>
                      <i className="fa fa-mobile" aria-hidden="true" />
                      <span>&ensp;&ensp;84-858573699</span>
                    </li>
                    <li>
                      <i className="fa fa-map-marker" aria-hidden="true" />
                      <span>&ensp; 20 Le Thanh Nghi-Hai Ba Trung-Ha Noi</span>
                    </li>
                    <li>
                      <i className="fa fa-clock-o" aria-hidden="true" />
                      <span>&ensp;Full Week</span>
                    </li>
                  </ul>
                </div>
                <div className="icons">
                  <ul className="list-icons">
                    <li className="fb"><a ><i className="fab fa-facebook-f" title="Facebook" /></a></li>
                    <li className="tw"><a ><i className="fab fa-twitter" title="Twitter" /></a></li>
                    <li className="fl"><a ><i className="fab fa-flickr" title="Flickr" /></a></li>
                    <li className="pt"><a ><i className="fab fa-pinterest" title="Pinterest" /></a></li>
                    <li className="ig"><a ><i className="fab fa-instagram" title="Instagram" /></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="col-three">
                <div className="newsletter">
                  <h5>Newsletter</h5>
                </div>
                <div className="notice">
                  <p>
                    Don't miss a thing!
                  </p>
                  <p>
                    Sign up to receive daily news
                  </p>
                </div>
                <div className="input-submit">
                  <form action>
                    <input className="form-control" type="text" name id required placeholder="Your Email Address" />
                    <button className="btn btn-block">SUBCRIBE</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="row copyright">
            <small>© Copyright 2020 - MTH</small>
          </div>
        </div></section>
    );
  }
}