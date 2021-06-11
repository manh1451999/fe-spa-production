import axios from 'axios';
import React, { Component } from 'react';
import Moment from 'react-moment';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "reactstrap";
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import vndong from '../../../convert/vndong'
import { confirmAlert } from 'react-confirm-alert'; // Import


export default class Bill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            filter: "all"
        }
    }
    componentDidMount() {
        axios.get("/bill").then(res => {
            let bills = res.data;
            bills.sort((a, b) => {
                if (b.user.point > a.user.point) return 1;
                else if (b.user.point < a.user.point) return -1;
                else return (b.user.point - a.user.point)
            })
            console.log(bills)
            this.setState({
                bills: bills
            });
        });
    }

    handleDelete = (e, index) => {
        var arr = this.state.bills;
        axios.delete(`/bill/deleteBill/${arr[index]._id}`).then(res => {
            toast.success('Successfully');
        });
        arr.splice(index, 1);
        this.setState({
            bills: arr
        });
    }
    handleEdit = (e, index) => {
        var arr = this.state.bills;
        axios.put(`/bill/updateStatus/${arr[index]._id}`).then(res => {
            console.log("ok")
        });
        arr[index].status = 1;
        this.setState({
            bills: arr
        });
    }



    updateStatus(index, status) {
        let data = {
            _id: this.state.bills[index]._id,
            status: status
        }
        axios.put("/bill/updateStatus/" + data._id, data)
            .then(res => {
                console.log(res.data)
                let bills = this.state.bills;
                bills.splice(index, 1, res.data)
                this.setState({
                    bills: bills
                })
                toast.success("cập nhật thành công")
            })
            .catch(err => {
                toast.error("cập nhật thất bại")
            })

    }

    async handleStatus(e, index) {
        let { value } = e.target;
        confirmAlert({
            title: 'Thay đổi trạng thái đặt lịch',
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


    handleFilter(e) {
        this.setState({
            filter: e.target.value
        })
        console.log(e.target.value)
    }


    render() {
        let { bills, filter } = this.state;
        // bills.sort((a, b) => {
        //     if (a.bookHour[a.bookHour.indexOf('m') - 1] > b.bookHour[b.bookHour.indexOf('m') - 1]) return 1;
        //     else if (a.bookHour[a.bookHour.indexOf('m') - 1] > b.bookHour[b.bookHour.indexOf('m') - 1]) return -1;
        //     else return (parseInt(a.bookHour) - parseInt(b.bookHour))
        // })
        bills.sort((a, b) => Date.parse(a.bookDate) - Date.parse(b.bookDate))
        bills = bills.filter((e) => filter == 'all' || e.status == filter)
        return (
            <LayoutTableAdmin>
                <div>
                    <ToastContainer />
                    <div className="container-fluid" style={{ marginBottom: "70px" }}>
                        <h2>Đơn đặt lịch</h2>

                        <div class="form-inline">
                            <label for="sel1">Trạng thái đặt lịch:</label> &nbsp;
                        <select class="select" class="form-control" onChange={(e) => this.handleFilter(e)} >
                                <option value='all'>Tất cả</option>
                                <option value={0}>Chờ xử lý</option>
                                <option value={1}>Chấp nhận lịch đặt</option>
                                <option value={3}>Thành công</option>
                                <option value={4}>Đã huỷ</option>
                            </select>
                        </div>

                        <br />
                        <table className="table listBill">
                            <thead>
                                <tr>
                                    <th>Tên khách</th>
                                    <th>Mã code</th>
                                    <th>Số ĐT</th>
                                    <th>Dịch vụ</th>
                                    <th>Thời gian sử dụng</th>
                                    <th>Khung giờ sử dụng</th>
                                    <th>Giá</th>
                                    <th>Trạng thái</th>
                                    <th>Hoạt động</th>
                                </tr>
                            </thead>
                            <tbody>
                                {bills.map((bill, index) => (
                                    <tr>
                                        <td>{bill.userName}</td>
                                        <td>{bill.code}</td>
                                        <td>{bill.phone}</td>
                                        <td>{bill.service.name}</td>
                                        <td><Moment format="DD/MM/YYYY">{bill.bookDate}</Moment></td>
                                        <td>{bill.bookHour}</td>
                                        <td style={{ color: '#eda84a' }}>{vndong(bill.totalMoney)}đ</td>
                                        <td>
                                            <select class="select" class="form-control" value={bill.status} onChange={(e) => this.handleStatus(e, index)} >
                                                <option value={0}>Chờ xử lý</option>
                                                <option value={1}>Chấp nhận lịch đặt</option>
                                                <option value={3}>Thành công</option>
                                                <option value={4}>Đã huỷ</option>
                                            </select>
                                        </td>

                                        <td >
                                            <a href><Button onClick={(e) => this.handleDelete(e, index)} style={{ backgroundColor: 'rgb(194, 12, 36)', border: 'none', textAlign: "center" }}><i className="fas fa-trash-alt"></i> Delete</Button></a>
                                            {/* &ensp;{bill.status === 0 && <a href><Button onClick={(e) => this.handleEdit(e, index)} style={{ backgroundColor: 'rgb(69, 189, 62)', border: 'none', textAlign: "center" }}><i className="fas fa-edit"></i> Edit</Button></a>} */}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </LayoutTableAdmin >
        )
    }
}
