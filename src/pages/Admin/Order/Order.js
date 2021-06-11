import axios from 'axios';
import 'moment-timezone';
import React, { Component } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import 'react-confirm-alert/src/react-confirm-alert.css';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import vndong from '../../../convert/vndong'


export default class Order extends Component {
    constructor(props) {
        super(props)
        this.state = {
            orders: [],
            editOrder: null,
            detailOrder: null,
            filter: 'all'
        };


    }

    componentDidMount() {
        axios.get("/order").then(res => {
            this.setState({
                orders: res.data
            });

            console.table(this.state.orders)

        });

    }

    updateStatus(index, status) {
        let data = {
            _id: this.state.orders[index]._id,
            status: status
        }
        axios.put("/order/upadteStatus", data).then(res => {
            let orders = this.state.orders;
            orders.splice(index, 1, res.data)
            this.setState({
                orders: orders
            })

            toast.success("cập nhật thành công")

        })
            .catch(err => toast.error("cập nhật thất bại"))
    }

    async handleStatus(e, index) {
        let { value } = e.target;
        confirmAlert({
            title: 'Thay đổi trạng thái đơn hàng',
            message: 'Bạn có chắc chắn muốn thay đổi',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.updateStatus(index, value)
                },
                {
                    label: 'No'
                }
            ]
        });

    }


    preDetail(e, index) {
        this.setState({
            detailOrder: this.state.orders[index]
        });
    }

    handleFilter(e) {
        this.setState({
            filter: e.target.value
        })
        console.log(e.target.value)
    }

    deleteOrder(index) {
        const id = this.state.orders[index]._id
        axios.delete(`/order/${id}`)
            .then(res => {
                let newOrders = [...this.state.orders]
                newOrders.splice(index, 1)
                this.setState({ orders: newOrders })
                toast.success('Xoá đơn hàng thành công')
            })
            .catch(err => {
                toast.error('Xoá đơn hàng thất bại')
            })
    }


    render() {
        let { filter } = this.state
        let { orders, editOrder, detailOrder } = this.state;
        orders = orders.filter((e) => filter == 'all' || e.status == filter)
        var totalMoney = 0;
        return (
            <LayoutTableAdmin>


                <div class="order-admin">
                    <h2>Hóa đơn</h2>
                    <br />
                    <ToastContainer />
                    <div class="form-inline">
                        <label for="sel1">Trạng thái đơn hàng:</label> &nbsp;
                        <select class="select" class="form-control" onChange={(e) => this.handleFilter(e)} >
                            <option value='all'>Tất cả</option>
                            <option value={0}>Chờ lấy hàng</option>
                            <option value={1}>Đang giao</option>
                            <option value={2}>Giao thành công</option>
                            <option value={3}>Đã hủy</option>
                        </select>
                    </div>
                    <br />


                    <div className="card">
                        <table class="table table-hover" id="">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Tên</th>
                                    <th>Ngày đặt</th>
                                    <th>SỐ điện thoại</th>
                                    <th>Địa chỉ</th>
                                    <th>Số tiền</th>
                                    <th>Trạng thái</th>
                                    <th>Hành động</th>
                                </tr>
                            </thead>
                            <tbody>

                                {orders.map((order, index) => {

                                    let date = new Date(order.createAt);


                                    return (<tr>
                                        <td>{index}</td>
                                        <td>{order.userName}</td>
                                        <td>
                                            <Moment format="YYYY-MM-DD HH:mm">
                                                {order.createAt}
                                            </Moment>
                                        </td>
                                        <td>{order.phone}</td>
                                        <td>{order.address}</td>
                                        <td>{vndong(order.totalMoney)}đ</td>
                                        <td>
                                            <select class="select" class="form-control" value={order.status} onChange={(e) => this.handleStatus(e, index)} >
                                                <option value={0}>Chờ lấy hàng</option>
                                                <option value={1}>Đang giao</option>
                                                <option value={2}>Giao thành công</option>
                                                <option value={3}>Đã hủy</option>
                                            </select>
                                        </td>

                                        <td>
                                            <form class="form-group" >
                                                <button type="button" class="btn btn-info mr-3" data-toggle="modal" data-target="#detailOrder"
                                                    onClick={(e) => this.preDetail(e, index)}><i class="fas fa-info-circle"></i> Detail</button>
                                                <button type="button" class="btn btn-danger"
                                                    onClick={(e) => this.deleteOrder(index)}><i class="far fa-trash-alt"></i></button>
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

                                {detailOrder &&
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
                                                    <th>Ảnh</th>
                                                    <th >Tên</th>
                                                    <th>Giá</th>
                                                    <th>Số lượng</th>
                                                    <th>Thành tiền</th>
                                                </tr>
                                            </thead>
                                            <tbody>

                                                {detailOrder.listProduct.map((element, index) => {
                                                    let product = element.product
                                                    console.log(product)
                                                    totalMoney += product.price * element.amount;

                                                    return (<tr>
                                                        <td>{index + 1}</td>
                                                        <td>
                                                            <div className="cart-product-image">
                                                                <Link to={`/product/${element._id}`}>
                                                                    <img style={{ maxWidth: '64px' }} src={product.imgUrl} />
                                                                </Link>

                                                            </div>
                                                        </td>
                                                        <td><p className="cart-product-name">{product.name}</p></td>
                                                        <td>
                                                            <div className="cart-flex cangiua">
                                                                <p style={{ 'display': 'flex' }}>{vndong(product.price)}đ</p>
                                                            </div>
                                                        </td>
                                                        <td><p className=" cangiua" >{element.amount}</p></td>
                                                        <td><div className="cangiua">{vndong(product.price * element.amount)}đ</div></td>
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
                </div>
            </LayoutTableAdmin>


        )
    }
}