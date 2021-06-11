import { Icon } from '@material-ui/core'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import CartContext from '../../contexts/CartContext'
import './Cart.css'
import UserContext from '../../contexts/UserContext'
import vndong from '../../convert/vndong'

function Cart(props) {

    const [cartItems, setCartItems] = useState([])
    const [info, setInfo] = useState({
        firstName: '',
        address: '',
        lastName: '',
        phone: null
    })
    const [show, setShow] = useState(false)
    const [successConfirm, setSuccessConfirm] = useState(false)

    const { uploadCart } = useContext(CartContext)

    useEffect(() => {
        axios.get('/cart')
            .then(res => {
                setCartItems(res.data.list)

                setInfo(res.data.info)
            })
    }, [])



    const updateAmount = (data) => {
        return axios.post("/cart/updateAmount", data)
    }

    const handleMinus = (index) => {
        let newCartItems = [...cartItems];
        if (cartItems[index].amount > 1) {
            newCartItems[index].amount--;
        }

        updateAmount(newCartItems[index])
            .then(res => {
                setCartItems(newCartItems);
                uploadCart()
            })
            .catch((err) => {
                toast.error(err)
            })
    }


    function handleAdd(index) {
        let newCartItems = [...cartItems];
        newCartItems[index].amount++;

        updateAmount(newCartItems[index])
            .then(res => {
                setCartItems(newCartItems)
                uploadCart()
            })
            .catch((err) => {
                toast.error(err)
            })
    }

    function handleDelete(index) {
        let newCartItems = [...cartItems];
        let data = newCartItems[index]

        return axios.post("/cart/deleteToCart", data)
            .then(res => {
                newCartItems.splice(index, 1);
                setCartItems(newCartItems)
                uploadCart()
            })
            .catch((e) => toast.error('xoá sản phẩm thất bại'))
    }

    function handleCheckOut(event) {
        event.preventDefault()
        const newInfo = {
            userName: info.lastName + " " + info.firstName,
            address: info.address,
            phone: info.phone
        }
        console.table(newInfo)
        axios.post('/cart/pay', newInfo)
            .then(response => {
                console.log(response)
                uploadCart()
                setSuccessConfirm(true)
            })
            .catch(err => {
                toast.error('đã xảy ra lỗi: ', err)
            })
    }

    function handleChangeInput(e, index) {
        console.log(e)
        let newCartItems = [...cartItems];
        newCartItems[index].amount = e.target.value
        setCartItems(newCartItems)
    }
    function handleShow() {
        setShow(true)
    }
    function handleClose() {
        setShow(false)
    }
    function handleForm(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        // let nam = event.target.name
        // let val = event.target.value;
        setInfo({
            ...info,
            [name]: value
        })

    }




    var subtotal = 0, total = 0
    cartItems.map(cartItem => {
        subtotal += cartItem.product.price * cartItem.amount
    }
    )
    subtotal == 0 ? total = 0 : total = subtotal + 20000;
    const { firstName, lastName, phone, address } = info
    const user = useContext(UserContext)
    // if (!user.isLogin) return <Redirect to='/login' />
    if (successConfirm) return <Redirect to="/success" />
    else if (cartItems.length > 0)
        return (
            <div>
                <div className="overlay_background_cart"  >
                    <div className='overlay_background1_cart'>
                        <h2>YOUR CART</h2>
                    </div>
                </div>
                <div className="container-fluid cart">
                    <ToastContainer />
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-8 col-md-12">
                                <table>
                                    <tbody><tr className="cart-label">
                                        <td style={{ textAlign: 'left' }}>Product</td>
                                        <td>Price</td>
                                        <td>Quantity</td>
                                        <td>Total</td>
                                        <td />
                                    </tr>
                                        {cartItems.map((cartItem, index) =>
                                            <tr className="cart-item" >
                                                <td>
                                                    <div className="cart-item-image">
                                                        <img src={cartItem.product.imgUrl} alt="" />
                                                    </div>
                                                    <div className="cart-item-name">
                                                        <span>{cartItem.product.name}</span>
                                                    </div>
                                                </td>
                                                <td>{vndong(cartItem.product.price)}đ</td>
                                                <td>
                                                    <div className="cart-add-minus">
                                                        <Icon className="fa fa-minus" key={index} style={{ marginRight: 10, cursor: "pointer"}} onClick={() => handleMinus(index)} />
                                                        <input type="number" class="form-control col-6 col-md-3 col-lg-4" key={index} value={cartItem.amount} onChange={(e) => handleChangeInput(e, index)} />
                                                        <Icon className="fa fa-plus" key={index} style={{ marginLeft: 10 , cursor: "pointer"}} onClick={() => handleAdd(index)} />
                                                    </div>
                                                </td>
                                                <td>{vndong(cartItem.product.price * cartItem.amount)}đ</td>
                                                <td><Icon className="fa fa-trash" style={{ color: 'red',cursor: "pointer" }} key={index} onClick={() => handleDelete(index)} /></td>
                                            </tr>
                                        )}

                                    </tbody></table>
                            </div>
                            <div className="col-lg-4 col-6">
                                <div className="cart-right">
                                    <div className="order-summary">
                                        <legend>Order Summary</legend>
                                    </div>
                                    <div className="order-detail">
                                        <div className="subtotal">
                                            <span>Subtotal</span>
                                            <span>{vndong(subtotal)}đ</span>
                                        </div>
                                        <div className="shipping">
                                            <span>Shipping</span>
                                            <span>20.000đ</span>
                                        </div>
                                    </div>
                                    <div className="order-total">
                                        <legend>Total</legend>
                                        <span>{vndong(total)}đ</span>
                                    </div>
                                    <div className="cart-checkout">
                                        <button className="btn btn-success btn-block" onClick={handleShow} >CHECK OUT</button>
                                    </div>
                                </div>
                            </div>
                            <Modal
                                show={show}
                                onHide={handleClose}
                                backdrop="static"
                                keyboard={false}
                            >
                                <Modal.Header>
                                    Thông tin khách hàng
                        </Modal.Header>
                                <Form onSubmit={(event) => handleCheckOut(event)}>
                                    <Modal.Body>
                                        <Form.Group>
                                            <Form.Label>Họ</Form.Label>
                                            <br />
                                            <Form.Control type="text" required
                                                name="lastName" placeholder="Nhập họ"
                                                value={lastName}
                                                onChange={handleForm} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Tên</Form.Label>
                                            <br />
                                            <Form.Control type="text" required name="firstName"
                                                placeholder="Nhập tên"
                                                value={firstName}
                                                onChange={handleForm} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Địa chỉ </Form.Label>
                                            <br />
                                            <Form.Control type="text" required name="address"
                                                placeholder="Nhập địa chỉ"
                                                value={address}
                                                onChange={handleForm} />
                                        </Form.Group>

                                        <Form.Group>
                                            <Form.Label>Số điện thoại</Form.Label>
                                            <br />
                                            <Form.Control className="col-4"
                                                required type="number" name="phone"
                                                placeholder="0XXXXXX"
                                                value={phone}
                                                onChange={handleForm} />
                                        </Form.Group>
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <div className="two-button">
                                            <Button variant="secondary" onClick={handleClose}>
                                                Hủy
                                    </Button>
                                            <Button color="primary" type="submit" variant="primary">
                                                Xác nhận mua
                                    </Button>
                                        </div>
                                    </Modal.Footer>
                                </Form>
                            </Modal>
                        </div>
                    </div>
                </div>
            </div>

        )

    return (
        <div
            className="container-fluid cart"
            style={{ height: '505px', backgroundImage: `url('https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-auto-show-board-background-material-image_162844.jpg')`, backgroundSize: 'cover' }}
        >

            <ToastContainer />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <div className="container" style={{ textAlign: 'center' }}>
                <legend style={{ color: 'white' }}>Không có sản phẩm trong giỏ hàng</legend>
            </div>
            <br />
            <br />
            <br />
        </div>

    )


}

export default Cart;

