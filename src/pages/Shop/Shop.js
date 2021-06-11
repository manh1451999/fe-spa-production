import { Slider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'reactstrap';
import "./Shop.css";
import vndong from '../../convert/vndong'

class Shop extends Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [

            ],
            popular: [
                {
                    name: "Body Lotion",
                    price: "59000",
                    img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-10-600x600.jpg"
                },
                {
                    name: "Organic Bath",
                    price: "99000",
                    img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-4-600x600.jpg"
                },
                {
                    name: "Organic Scrub",
                    price: "69000",
                    img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-2-600x600.jpg"
                }
            ],
            value: [0, 1000000],
            start: 0,
            end: 1000000,
            count: null
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount = async () => {
        axios.get('/product')
            .then(res => {
                console.log(res.data.length)
                this.setState({
                    products: res.data,
                    count: res.data.length
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    handleChange(e, newValue) {
        this.setState({
            value: newValue
        })
    }
    handleClick(e) {
        // this.setState({
        //     count: this.state.dem
        // })
        let tmp = 0;
        this.state.products.forEach(item => {
            if (item.price >= this.state.value[0] && item.price <= this.state.value[1]) {
                tmp++;
            }
        });
        this.setState({
            count: tmp
        })
    }
    render() {
        const { products, popular } = this.state;
        return (
            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>CỬA HÀNG</h2>
                    </div>
                </div>
                <Container fluid>
                    <Row>
                        <Col md="4">
                            <div style={{ marginLeft: '6%' }}>
                                <Typography id="range-slider" gutterBottom style={{ marginTop: '40px', fontWeight: '700' }}>
                                    GIÁ
                                </Typography>
                                <Slider
                                    value={this.state.value}
                                    min={this.state.start}
                                    max={this.state.end}
                                    step={100000}
                                    onChange={this.handleChange}
                                    valueLabelDisplay="auto"
                                    aria-labelledby="range-slider"
                                    // getAriaValueText={}
                                    style={{ width: "100%", color: "#444", display: 'block' }}
                                />
                                <Button type="submit" onClick={this.handleClick} style={{ display: 'inline-block', color: '#515151', backgroundColor: '#ebe9eb', fontSize: '15px', borderColor: '#ebe9eb' }}>Lọc</Button>
                                <b style={{ display: 'inline-block', float: 'right', fontSize: '14px', fontWeight: '700', marginTop: '10px' }}>Price:{this.state.value[0]}-{vndong(this.state.value[1]) + "đ"}</b>
                            </div>
                        </Col>
                        <Col md="5"></Col>
                        <Col md="3">
                            <div style={{ marginTop: '70px' }}>HIỂN THỊ {this.state.count} kết quả</div>
                        </Col>
                    </Row>


                    <Row>
                        {products.map((product, index) => (
                            product.price >= this.state.value[0] && product.price <= this.state.value[1] &&
                            <Col md="4" style={{ marginTop: '20px' }} key={index}>
                                <Link to={`/product/${product._id}`} className="product">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={product.imgUrl} alt="product"></img>
                                    </div>
                                    <h3>{product.name}</h3>
                                    <p>{vndong(product.price) + "đ"}</p>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                    <hr></hr>
                    <h4 style={{ textAlign: 'center', marginTop: '40px', color: '#333333' }}>Phổ biến</h4>
                    <Row>
                        {this.state.products.slice(0, 3).map((item, index) => (
                            <Col md="4" style={{ marginTop: '20px' }} key={index}>
                                <Link to={`/product/${item._id}`} className="product">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={item.imgUrl} alt="product"></img>
                                    </div>
                                    <h3>{item.name}</h3>
                                    <p>{vndong(item.price)}đ</p>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        );
    }
}

export default Shop;
