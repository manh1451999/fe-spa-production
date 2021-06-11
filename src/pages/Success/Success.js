import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Success.css'
export default class Success extends Component {
    constructor(props){
        super(props)
    }
    render(){
        return(
            <div className="successCheckout">
                <div className="circle">
                    <div className="circleContent">
                        <div className="left"></div>
                        <div className="right"></div>
                    </div>
                </div>
                <h1>Đơn hàng đã được khởi tạo thành công</h1>
                <Link className="back-to-home" to="/">Back to home </Link>
            </div>
        )
    }
}