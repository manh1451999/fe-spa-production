import React, { Component } from 'react'
import './Order.css'
import axios from 'axios'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import CKEditor from "ckeditor4-react";
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from 'react-router-dom'
import classNames from 'classnames'

import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import vndong from '../../../convert/vndong';


export default class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            filter: 'all',
            editOrder: null,
            detailOrder: null
        };


    }

    componentDidMount() {
        axios.get("/order/user").then(res => {
            this.setState({
                orders: res.data
            });


        });

    }


    preDetail(e, index) {
        this.setState({
            detailOrder: this.state.orders[index]
        });
    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
    }

    handleCanel(index) {

        console.log(index)
        confirmAlert({
            title: 'Thay đổi trạng tái đơn hàng',
            message: 'Bạn có chắc chắn muốn thay đổi',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.Cancel(index)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    handleDelete(index) {

        console.log(index)
        confirmAlert({
            title: 'Thay đổi trạng tái đơn hàng',
            message: 'Bạn có chắc chắn muốn xóa đơn hàng?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.Delete(index)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    Delete(index) {
        let data = {
            _id: this.state.orders[index]._id,
        }
        axios.delete("/order/"+ data._id).then(res => {
            let orders = this.state.orders;
            orders.splice(index, 1)
            this.setState({
                orders: orders
            })

        })
    }

    Cancel(index) {
        let data = {
            _id: this.state.orders[index]._id,
            status: 3
        }
        axios.put("/order/upadteStatus", data).then(res => {
            let orders = this.state.orders;
            orders.splice(index, 1, res.data)
            this.setState({
                orders: orders
            })

        })
    }









    render() {

        const { orders, editOrder, detailOrder, filter } = this.state;
        var totalMoney = 0;
        const filterOrders = orders.filter((e) => filter == 'all' || e.status == filter)
        return (

            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>Lịch sử đơn hàng</h2>
                    </div>
                </div>
                <div class="order-admin container-fluid" style={{ marginTop: "40px" }}>
                    <div>
                        <div className="select-menu-order">
                            <ul class="nav nav-tabs nav-justified">
                                <li className={classNames('nav-item', { 'active': filter == 'all' })}>
                                    <span onClick={() => this.handleFilter('all')} class="nav-link " href="#">Tất cả {filter == 'all' && `(${filterOrders.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 0 })}>
                                    <span onClick={() => this.handleFilter(0)} class="nav-link" href="#">Chờ lấy hàng {filter == 0 && `(${filterOrders.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 1 })}>
                                    <span onClick={() => this.handleFilter(1)} class="nav-link" href="#">Đang giao {filter == 1 && `(${filterOrders.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 2 })}>
                                    <span onClick={() => this.handleFilter(2)} class="nav-link" href="#">Đã giao  {filter == 2 && `(${filterOrders.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 3 })} >
                                    <span onClick={() => this.handleFilter(3)} class="nav-link" href="#">Đã huỷ  {filter == 3 && `(${filterOrders.length})`} </span>
                                </li >
                            </ul >
                        </div >

                        <br />

                        <div className="card">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        {/* <th>Name</th> */}
                                        <th>Phone</th>
                                        <th>Address</th>
                                        <th>Money</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {filterOrders.map((order, index) => {

                                        return (<tr>
                                            <td>{index}</td>
                                            {/* <td>{order.userName} {order.firstName}</td> */}
                                            <td>{order.phone}</td>
                                            <td>{order.address}</td>
                                            <td>{vndong(order.totalMoney)}đ</td>

                                            {order.status == 0 && <td>Chờ lấy hàng</td>}
                                            {order.status == 1 && <td>Đang giao</td>}
                                            {order.status == 2 && <td>Giao thành công</td>}
                                            {order.status == 3 && <td>Đã hủy</td>}


                                            <td>
                                                <form class="form-group" >
                                                    <button type="button" class="btn btn-info" style={{ marginRight: '5px' }} data-toggle="modal" data-target="#detailOrder"
                                                        onClick={(e) => this.preDetail(e, index)}>Detail</button>

                                                    {(order.status === 0) && <button type="button" class="btn btn-danger"
                                                        onClick={() => this.handleCanel(index)}>Cancel</button>}

                                                    {(order.status === 2 || order.status === 3) && <button type="button" class="btn btn-danger"
                                                                                     onClick={() => this.handleDelete(index)}>Delete</button>}
                                                </form>
                                            </td>
                                        </tr>
                                        )

                                    })}

                                </tbody>
                            </table>
                        </div>






                        <div class="modal fade" id="detailOrder">
                            <div class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-xl">
                                <div class="modal-content">

                                    <div class="modal-header">
                                        <h4 class="modal-title">Detail Order</h4>
                                        <button type="button" class="close" data-dismiss="modal">&times;</button>
                                    </div>
                                    {detailOrder
                                        &&
                                        <div class="modal-body">
                                            <p>ID đơn hàng: {detailOrder._id}</p>
                                            <p>Tên người nhận: {detailOrder.userName}</p>
                                            <p>Địa chỉ: {detailOrder.address}</p>
                                            <p>Số điện thoại: {detailOrder.phone}</p>
                                            <br />


                                            <table class="table  table-inverse  table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>STT</th>
                                                        <th>Img</th>
                                                        <th >Tên</th>
                                                        <th>Giá</th>
                                                        <th>Số lượng</th>
                                                        <th>Thành tiền</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {detailOrder.listProduct.map((element, index) => {
                                                        let product = element.product

                                                        totalMoney += product.price * element.amount;

                                                        return (<tr>
                                                            <td>{index + 1}</td>
                                                            <td>
                                                                <div className="cart-product-image">
                                                                    <Link to={`/product/${product._id}`}>
                                                                        <img style={{ maxWidth: '64px' }} src={product.imgUrl} />
                                                                    </Link>
                                                                </div>


                                                            </td>
                                                            <td><p className="cart-product-name">{product.name}</p></td>
                                                            <td>
                                                                <div className="cart-flex cangiua">
                                                                    <p style={{ 'display': 'flex' }}>{product.price}</p>
                                                                </div>
                                                            </td>
                                                            <td><p className=" cangiua" >{element.amount}</p></td>
                                                            <td><div className="cangiua">{product.price * element.amount}</div></td>
                                                        </tr>)

                                                    })
                                                    }

                                                </tbody>

                                                <thead>
                                                    <tr>
                                                        <th colspan="2">Tổng tiền</th>
                                                        <th colspan="2">Tổng tiền</th>
                                                        <th colspan="1">{vndong(totalMoney)}đ</th>

                                                    </tr>
                                                </thead>
                                            </table>

                                        </div>
                                    }
                                    <div class="modal-footer">
                                        <button type="button" class="btn btn-danger" data-dismiss="modal">Close</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >
                </div >

            </div>
        )
    }
}