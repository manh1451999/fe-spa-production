import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { Button } from "reactstrap";
// import "./HistoryBooking.css";
import vndong from './../../../convert/vndong'
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast, ToastContainer } from 'react-toastify';
import classNames from 'classnames'


export default class HistoryBooking extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            filter: 'all'
        }
    }
    componentDidMount() {
        axios.get("/bill/billUser").then(res => {
            this.setState({
                bills: res.data
            });
        });
    }




    updateStatus(index) {
        let data = {
            _id: this.state.bills[index]._id,
            status: 4
        }
        axios.put("/bill/updateStatus/" + data._id, data)
            .then(res => {
                console.log(res.data)
                let bills = this.state.bills;
                bills.splice(index, 1, res.data)
                this.setState({
                    bills: bills
                })
                toast.success("huỷ lịch thành công")
            })
            .catch(err => {
                console.log("aa", err)
                toast.error("huỷ lịch thất bại")
            })

    }

    async handleStatus(index) {
        confirmAlert({
            title: 'Huỷ lịch đặt',
            message: 'Bạn có chắc chắn muốn huỷ lịch đã đặt',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.updateStatus(index)
                },
                {
                    label: 'No'
                }
            ]
        });

    }

    handleFilter(filter) {
        this.setState({
            filter: filter
        })
    }

    render() {
        const { bills, filter } = this.state
        bills.sort((a, b) => Date.parse(a.bookDate) - Date.parse(b.bookDate))
        bills.sort((a, b) => a.bookHour - b.bookHour)
        const filterBills = bills.filter((e) => filter == 'all' || e.status == filter)
        return (
            <div>
                <ToastContainer />

                <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>Lịch sử đặt lịch</h2>
                    </div>
                </div>

                <div class="order-admin container-fluid" style={{ marginTop: "40px" }}>
                    <div>
                        <div className="select-menu-order">
                            <ul class="nav nav-tabs nav-justified">
                                <li className={classNames('nav-item', { 'active': filter == 'all' })}>
                                    <span onClick={() => this.handleFilter('all')} class="nav-link " href="#">Tất cả {filter == 'all' && `(${filterBills.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 0 })}>
                                    <span onClick={() => this.handleFilter(0)} class="nav-link" href="#">Chờ xử lý {filter == 0 && `(${filterBills.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 1 })}>
                                    <span onClick={() => this.handleFilter(1)} class="nav-link" href="#">Đã chấp nhận {filter == 1 && `(${filterBills.length})`} </span>
                                </li>
                                <li className={classNames('nav-item', { 'active': filter == 3 })} >
                                    <span onClick={() => this.handleFilter(3)} class="nav-link" href="#">Thành công  {filter == 3 && `(${filterBills.length})`} </span>
                                </li >
                                <li className={classNames('nav-item', { 'active': filter == 4 })} >
                                    <span onClick={() => this.handleFilter(4)} class="nav-link" href="#">Đã huỷ  {filter == 4 && `(${filterBills.length})`} </span>
                                </li >
                            </ul >
                        </div >

                        <br />
                        <div className="card">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>Tên khách</th>
                                        <th>Dịch vụ</th>
                                        <th>Thời gian sử dụng</th>
                                        <th>Khung giờ sử dụng</th>
                                        <th>Giá</th>
                                        <th>Trạng thái</th>
                                        <th>Hoạt động</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {filterBills.map((bill, index) => (
                                        <tr>
                                            <td>{bill.userName}</td>
                                            <td>{bill.service.name}</td>
                                            <td><Moment format="DD/MM/YYYY">{bill.bookDate}</Moment></td>
                                            <td>{bill.bookHour}</td>
                                            <td style={{ color: '#eda84a' }}>{vndong(bill.totalMoney)}đ</td>
                                            {bill.status === 0 && <td  >Chờ xử lý</td>}
                                            {bill.status === 1 && <td  >Đã được chấp nhận</td>}
                                            {bill.status === 3 && <td >Thành công</td>}
                                            {bill.status === 4 && <td >Đã huỷ</td>}
                                            <td width="15%">
                                                {(bill.status === 0) && <a href><Button onClick={(e) => this.handleStatus(index)} style={{ backgroundColor: 'rgb(218, 84, 46)', border: 'none', textAlign: "center", marginBottom: '10px' }}><i className="far fa-window-close"></i> Cancel</Button></a>}
                                            </td>
                                        </tr>
                                    ))}



                                </tbody>
                            </table>

                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
