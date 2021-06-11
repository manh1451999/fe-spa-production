import React, { Component } from 'react';
import LayoutTableAdmin from '../Layout/LayoutTableAdmin';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import vndong from '../../../convert/vndong'
export default class Statistical extends Component {

    constructor() {
        super();
        this.state = {
            stasticOrder: [],
            stasticBill: [],
            bestService: [],
            bestProduct: [],
            userLove: []
        }
    }

    async componentDidMount() {
        await axios.get("/order/stastic").then(res => {
            this.setState({
                stasticOrder: res.data
            });

        });


        await axios.get("/order/stasticCount").then(res => {
            this.setState({
                bestProduct: res.data
            });

        });

        await axios.get("/bill/stastic").then(res => {
            this.setState({
                stasticBill: res.data
            })
        })

        await axios.get("/bill/stasticCount").then(res => {
            this.setState({
                bestService: res.data
            })
        })

        await axios.get("/user/stastic").then(res => {
            this.setState({
                userLove: res.data
            })
            console.log("aa", res.data)
        })


    }

    renderUser(users) {
        let result = [];
        users.map(user => {
            result.push(
               <h4>{user.firstName} {user.lastName} đã mua {vndong(user.point)}</h4>
            );
        });
        return result;
    }

    render() {
        return (
            <LayoutTableAdmin>
                <div>
                    <h1 className="text-danger" style={{textAlign: "center"}}>THỐNG KÊ</h1>

                    {this.state.stasticOrder && <div style={{width: '100%'}}>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart
                                width={500}
                                height={200}
                                data={this.state.stasticOrder}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis/>
                                <Tooltip/>
                                <Line connectNulls type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <h2 style={{textAlign: 'center'}}>Doanh thu bán hàng theo tháng</h2>
                    </div>
                    }


                    <hr/>
                    {this.state.stasticBill && <div style={{width: '100%'}}>
                        <ResponsiveContainer width="100%" height={200}>
                            <LineChart
                                width={500}
                                height={200}
                                data={this.state.stasticBill}
                                margin={{
                                    top: 10,
                                    right: 30,
                                    left: 0,
                                    bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="month"/>
                                <YAxis/>
                                <Tooltip/>
                                <Line connectNulls type="monotone" dataKey="total" stroke="#8884d8" fill="#8884d8"/>
                            </LineChart>
                        </ResponsiveContainer>
                        <h2 style={{textAlign: 'center'}}>Doanh thu từ dịch vụ làm đẹp theo tháng</h2>
                    </div>

                    }

                    <br/>
                    <hr/>
                    <div className="row">
                        <div className="col-sm-2"></div>
                        {this.state.bestService &&
                        <div className="col-sm-4">
                            <p className="text-danger">Dịch vụ hot nhất ({this.state.bestService[1]} lần)</p>
                            <div className="card" style={{width: "100%"}}>
                                <img className="card-img-top" src={this.state.bestService[0]?.img} alt="Card image cap"
                                     style={{width: "100%"}}/>
                                <div className="card-body">
                                    <a href={`/service/${this.state.bestService[0]?._id}`}><p className="card-text">{this.state.bestService[0]?.name}</p></a>

                                </div>
                            </div>
                        </div>
                        }
                        {this.state.bestProduct &&
                        <div className="col-sm-4">
                            <p className="text-danger">Sản phẩm bán chạy nhất(Đã bán {this.state.bestProduct[1]})</p>
                            <div className="card" style={{width: "18rem"}}>
                                <img className="card-img-top" src={this.state.bestProduct[0]?.imgUrl}
                                     alt="Card image cap" style={{maxWidth: "100%"}}/>
                                <div className="card-body">
                                    <a href={`/product/${this.state.bestProduct[0]?._id}`}><p className="card-text">{this.state.bestProduct[0]?.name}</p></a>

                                </div>
                            </div>
                        </div>
                        }

                    </div>
                    <h2 style={{textAlign: 'center'}}>Khách hàng quan trọng</h2>
                    {this.state.userLove && this.renderUser(this.state.userLove)}
                </div>


            </LayoutTableAdmin>

        )
    }
}
