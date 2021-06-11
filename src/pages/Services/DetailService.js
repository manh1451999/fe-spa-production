import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Button, Col, Container, Input, Nav, NavItem, NavLink, Row, TabContent, TabPane } from 'reactstrap';
import vndong from "../../convert/vndong";
import {toast, ToastContainer} from "react-toastify";
import Moment from 'react-moment';
import 'moment-timezone';

function DetailService(props) {
    const serviceId = props.match.params.id;

    const [service, setService] = useState({});
    const [cmt, setCmt] = useState("");
    const [allComment, setAllComment] = useState([]);
    const [show, setShow] = useState("none")
    const changeNewCmt = (e) => {
        let content = e.target.value;
        setCmt(content);
    }
    const handleAddNewCmt = () => {
        console.log(cmt);
        axios.post(`/comment/newComment`, {
            content : cmt,
            serviceId : serviceId
        })
            .then(res => {
                toast.success('Đã thêm bình luận');
                console.log(res.data)

                let comments  = res.data.filter(comment => comment.service.toString()
                    === serviceId)
                setAllComment(comments);
                setCmt("");
            })
            .catch(err => {
                console.log(err)
            })
    }


    useEffect(() => {
        axios.get(`/service/${serviceId}`)
            .then(res => {
                console.log(res.data)
                setService(res.data);
            })
            .catch(err => {
                console.log(err)
            })

    }, []);

    useEffect(() => {
        axios.get(`/comment/showComment`)
            .then(res => {
                let comments  = res.data.allComments.filter(comment => comment.service.toString()
                    === serviceId)
                setAllComment(comments)
                console.log("xx", res.data);
                if (res.data.user !== 'khach') {
                    setShow("block");
                }
            })
            .catch(err => {
                console.log(err)
            })

    }, []);



     return(
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
                     {service && <Row style={{ marginTop: "40px" }}>
                         <Col md="4" >
                             <div className="detail_right">
                                 <img src={service.img || "https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/369127.jpg"} width="50%"></img>
                             </div>
                         </Col>
                         <Col md="8" >
                             <div className="detail_left">
                                 <h2>{service.name}</h2>
                                 <h4>{service.price}đ</h4>
                                 <p>{service.description}</p>
                             </div>
                             <hr/>
                             <h3>Các bình luận của nguời dùng</h3>
                             {allComment.length !== 0 && allComment.map((dataComment, index) => (
                                     <Row>
                                         <div class="media  p-3">

                                             <div class="media-body" >
                                                 <div className="avt-name">
                                                     <img src="/image/anh.jpg" alt="John Doe" style={{
                                                         borderRadius: "50%", maxWidth: '60px', maxHeight: '60px', marginRight: '10px'
                                                     }} />
                                                     <h4>{dataComment.user?.firstName}<small><i> đã bình luận vào &nbsp;
                                                         <Moment format="YYYY/MM/DD HH:mm">
                                                             {dataComment.createAt}
                                                         </Moment></i></small></h4>
                                                 </div>
                                                 <div key={index}>
                                                     <p>{dataComment.content}</p>
                                                 </div>
                                                 {/*<div key={index} style={{ display: `${btnShow[index]}` }} >*/}
                                                 {/*    <Button color="primary" key={index} onClick={() => handleShow(index)}>Chỉnh sửa</Button>*/}
                                                 {/*    <Button color="danger" key={index} onClick={() => handleDeleteCmt(index)}>Xóa</Button>*/}
                                                 {/*</div>*/}
                                                 {/*<div key={index} style={{ display: `${show[index]}` }} >*/}
                                                 {/*    <Input value={dataComment.content} key={index} type="text" onChange={(e) => changeCmt(e, index)} />*/}
                                                 {/*    <Rating value={star} name="simple-controlled" onChange={(event, newValue) => setStar(newValue)} />*/}
                                                 {/*    <Button color="primary" key={index} onClick={() => handleEditCmtSubmit(index)}>Chốt</Button>*/}
                                                 {/*</div>*/}
                                             </div>
                                         </div>
                                     </Row>
                                 )
                             )}
                             <div style={{ display: `${show}`}}>
                                 <h3>Your Comment</h3>
                                 <Input defaultValue={cmt} type="textarea" onChange={(e) => changeNewCmt(e)} name="cmt"/>
                                 <div className="btn-rt">
                                     <Button color="primary" onClick={() => handleAddNewCmt()}>Bình luận</Button>
                                 </div>
                             </div>
                         </Col>
                     </Row>}
                 </Container>
             </div>
         </div>

     );
}

export default DetailService;
