import Rating from '@material-ui/lab/Rating';
import axios from 'axios';
import classnames from 'classnames';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Col, Container, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import CartContext from '../../contexts/CartContext';
import "./Detail.css";
import Moment from 'react-moment';
import 'moment-timezone';
import vndong from '../../convert/vndong'

function Detail(props) {

    const productId = props.match.params.id;

    const [product, setProduct] = useState();
    const [amount, setAmount] = useState(1)
    const cart = useContext(CartContext)

    const [related, setrelated] = useState(
        [
            {
                name: "Body Lotion",
                price: "59999",
                img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-10-600x600.jpg"
            },
            {
                name: "Organic Bath",
                price: "99999",
                img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-4-600x600.jpg"
            },
            {
                name: "Organic Scrub",
                price: "79999",
                img: "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/product-2-600x600.jpg"
            }
        ]
    )

    const [activeTab, setActiveTab] = useState('1');

    useEffect(() => {
        axios.get(`/product/${productId}`)
            .then(res => {
                setProduct(res.data);
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    const toggle = tab => {
        if (activeTab !== tab) setActiveTab(tab);
    }

    const addToCart = () => {
        const payload = {
            productId: productId,
            amount: parseInt(amount)
        }
        axios.post('/cart/addToCart', payload)
            .then((res) => {
                cart.uploadCart()
                toast.success('Đã thêm vào giỏ hàng');

            })
            .catch(err => {
                toast.error('Đã xảy ra lỗi')
            })
    }
    const [dataCmt, setDataCmt] = useState([]);
    const [cmtShow, setCmtShow] = useState([]);
    const [btnShow, setBtnShow] = useState([]);
    const [show, setShow] = useState([]);
    const [addCmt, setAddCmt] = useState('')
    useEffect(() => {
        axios.get('/comment/showComment')
            .then(response => {
                console.log(response.data)
                setDataCmt(response.data.allComments)
                if (response.data.user === "khach") setAddCmt('none'); else setAddCmt('block')
                let clone = [],
                    clone2 = [],
                    clone3 = []
                for (var i = 0; i < response.data.allComments.length; i++) {
                    clone[i] = 'none'
                    clone3[i] = 'block'
                    if (response.data.user === "khach") clone2[i] = 'none'; else clone2[i] = 'block'

                    if (response.data.user == response.data.allComments[i].user?._id) clone2[i] = 'block'; else clone2[i] = 'none'
                }
                setCmtShow(clone3)
                setBtnShow(clone2)
                setShow(clone)
            })

    }, []);



    const [star, setStar] = useState(5);
    const [starNew, setStarNew] = useState(5);
    const handleShow = (index) => {
        let clone = [...show]
        clone[index] = 'block'
        setShow(clone)
        let clone2 = [...cmtShow]
        clone2[index] = 'none'
        setCmtShow(clone2)
        let clone3 = [...btnShow]
        clone3[index] = 'none'
        setBtnShow(clone3)
        console.log(index)
        setStar(dataCmt[index].rate)
    };
    const handleDeleteCmt = index => {
        axios.post('/comment/deleteComment', { cmtId: dataCmt[index]._id })
            .then(response => {
                setDataCmt(response.data)
                toast.success('Xóa thành công');
            })
    }
    const handleEditCmtSubmit = index => {
        let clone = [...show]
        clone[index] = 'none'
        setShow(clone)
        let clone2 = [...cmtShow]
        clone2[index] = 'block'
        setCmtShow(clone2)
        let clone3 = [...btnShow]
        clone3[index] = 'block'
        setBtnShow(clone3)
        axios.post('/comment/editComment', { cmtId: dataCmt[index]._id, content: dataCmt[index].content, rate: star })
            .then(response => {
                setDataCmt(response.data.allComments)
                response.data.allow ? toast.success('Đã sửa bình luận') : toast.error('Không thể sửa bình luận')
            })
    }
    const changeCmt = (e, index) => {
        let clone = [...dataCmt]
        clone[index].content = e.target.value
        setDataCmt(clone)
    }
    const changeNewCmt = e => {
        let clone = { ...newCmt }
        clone.content = e.target.value
        setNewCmt(clone)
    }
    const [newCmt, setNewCmt] = useState({ content: '', rate: 5 })
    const handleAddNewCmt = () => {
        axios.post('/comment/newComment', { content: newCmt.content, rate: newCmt.rate })
            .then(response => {
                setDataCmt(response.data)
                console.log(response.data)
                let clone = []
                for (var i = 0; i < response.data.length; i++) clone[i] = 'none'
                setShow(clone)
                toast.success('Đã thêm bình luận');
            })
    }

    const changeNewCmtRate = (newValue) => {
        setStarNew(newValue)
        let clone = { ...newCmt }
        clone.rate = newValue
        setNewCmt(clone)
    }

    console.log(product)

    return (
        <div>
            <ToastContainer
                position="top-left"
            />
            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2 style={{ fontFamily: 'Lucida Sans Unicode, Courier, monospace' }}>Detail</h2>
                    </div>
                </div>
                <Container fluid>
                    {product && <Row style={{ marginTop: "40px" }}>
                        <Col md="6" >
                            <div className="detail_right">
                                <img src={product.imgUrl || "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg"}></img>
                            </div>
                        </Col>
                        <Col md="6" >
                            <div className="detail_left">
                                <h2>{product.name}</h2>
                                <h4>{vndong(product.price)}đ</h4>
                                <p>{product.summary}</p>
                                <Input type="number" min="1"
                                    value={parseInt(amount)}
                                    onChange={(e) => setAmount(parseInt(e.target.value))}
                                    style={{ display: "inline-block", width: "80px", marginRight: '10px', textAlign: 'center' }}>

                                </Input>
                                <Button type="submit"
                                    style={{ backgroundColor: '#EFA697', fontWeight: '600', fontSize: '16px', borderColor: '#EFA697' }}
                                    onClick={addToCart}
                                >
                                    Add to card
                                 </Button>
                                <div className="underAdd" style={{ marginTop: '35px' }}><b>SKU: 199</b></div>
                                <div className="underAdd"><b>Category:</b> Uncategorized</div>
                                <div className="underAdd"><b>Tags:</b> Beauty, Cream</div>
                            </div>
                        </Col>
                    </Row>}
                    <Container>
                        <Row className="detail-description-review">

                            <div>
                                <Nav tabs>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '1' })}
                                            onClick={() => { toggle('1'); }}
                                        >
                                            Description
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink
                                            className={classnames({ active: activeTab === '2' })}
                                            onClick={() => { toggle('2'); }}
                                        >
                                            Review
                                        </NavLink>
                                    </NavItem>
                                </Nav>
                                <TabContent activeTab={activeTab}>
                                    <TabPane tabId="1">
                                        <Row>
                                            <Col sm="12">
                                                {/* <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Aliquam et elit eu nunc rhoncus viverra quis at felis et netus et malesuada fames ac turpis egestas. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes.</p> */}
                                                <div dangerouslySetInnerHTML={{ __html: product?.description }} />
                                            </Col>
                                        </Row>
                                    </TabPane>
                                    <TabPane tabId="2">
                                        <Col>
                                            {dataCmt.length !== 0 && dataCmt.map((dataComment, index) => (
                                                <Row>
                                                    <div class="media  p-3">

                                                        <div class="media-body" >
                                                            <div className="avt-name">
                                                                <img src={`https://picsum.photos/300/300.jpg?random=${Math.ceil(Math.random*1000)}`} alt="John Doe" style={{
                                                                    borderRadius: "50%", maxWidth: '60px', maxHeight: '60px', marginRight: '10px'
                                                                }} />
                                                                <h4>{dataComment.user?.firstName}<small><i> đã bình luận vào &nbsp;
                                                                    <Moment format="YYYY/MM/DD HH:mm">
                                                                        {dataComment.createAt}
                                                                    </Moment></i></small></h4>
                                                            </div>
                                                            <div key={index} style={{ display: `${cmtShow[index]}` }}>
                                                                <p> <Rating name="read-only" value={parseInt(dataComment.rate)} readOnly /></p>
                                                                <p>{dataComment.content}</p>
                                                            </div>
                                                            <div key={index} style={{ display: `${btnShow[index]}` }} >
                                                                <Button color="primary" key={index} onClick={() => handleShow(index)}>Chỉnh sửa</Button>
                                                                <Button color="danger" key={index} onClick={() => handleDeleteCmt(index)}>Xóa</Button>
                                                            </div>
                                                            <div key={index} style={{ display: `${show[index]}` }} >
                                                                <Input value={dataComment.content} key={index} type="text" onChange={(e) => changeCmt(e, index)} />
                                                                <Rating value={star} name="simple-controlled" onChange={(event, newValue) => setStar(newValue)} />
                                                                <Button color="primary" key={index} onClick={() => handleEditCmtSubmit(index)}>Chốt</Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </Row>
                                            )
                                            )}
                                            <div style={{ display: `${addCmt}` }}>
                                                <Input defaultValue='' type="textarea" onChange={(e) => changeNewCmt(e)} />
                                                <div className="btn-rt">
                                                    <Button color="primary" onClick={() => handleAddNewCmt()}>Bình luận</Button>
                                                    <Rating value={starNew} name="simple-controlled two" onChange={(event, newValue) => changeNewCmtRate(newValue)} />
                                                </div>
                                            </div>
                                        </Col>
                                    </TabPane>
                                </TabContent>
                            </div>

                        </Row>
                    </Container>


                    <hr></hr>


                    <h4 style={{ textAlign: 'center', marginTop: '40px', color: '#333333' }}>Related products</h4>

                    <Row>
                        {related.map((item, index) => (
                            <Col md="4" style={{ marginTop: '20px' }} key={index}>
                                <Link to={"/detail"} className="product">
                                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                                        <img src={item.img} alt="product"></img>
                                    </div>
                                    <h3>{item.name}</h3>
                                    <p>{vndong(item.price)}đ</p>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Detail;
