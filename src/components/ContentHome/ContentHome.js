import classNames from 'classnames';
import React, { Component } from 'react';
import { Col, Container, Row } from "reactstrap";
import "./ContentHome.css";

class ContentHome extends Component {
    constructor(props){
        super(props);
        this.handleMouseOver=this.handleMouseOver.bind(this);
        this.handleMouseOut=this.handleMouseOut.bind(this);
        this.state={
            cardService:[
                {   
                    check:false,
                    link:"https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/iStock_000011185393XLarge.jpg",
                    title:"Oil Massage"
                },
                {   
                    check:false,
                    link:'https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/f3d7c86de36c594617f239bf8e83ad47.jpg',
                    title:'Skin Scrub'
                },
                {   
                    check:false,
                    link:'https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/utomhuspool_5.jpg',
                    title:'Natural Relaxation'
                }
            ]
        }
    }
    handleMouseOver(e,index){
        e.preventDefault();
        let arr= this.state.cardService;
        arr[index].check=true;
        this.setState({
            cardService:arr
        });
    }
    handleMouseOut(e,index){
        e.preventDefault();
        let arr= this.state.cardService;
        arr[index].check=false;
        this.setState({
            cardService:arr
        });
    }
    render() {
        const {cardService}= this.state;
        return (
            <div>
            <Container>
                <h2 className="serviceTitle">Grand Spa’s Services</h2>
                <div className="tagLine">COME EXPERIENCE THE SECRETS OF RELAXATION.</div>
                <div style={{textAlign:"center", marginTop:'40px', marginBottom:'80px'}}>
                    <div className = "divider"></div>
                    <i className="fa fa-leaf iconLeaf"></i>
                    <div className = "divider"></div>
                </div>
                <Row style={{marginBottom:'30px'}}>
                    {cardService.map((item,index) => (
                        <Col lg="4" key={index}>
                        <div className={classNames('cardService', {'cardServiceOver':item.check===true})} onMouseOver={(e)=>this.handleMouseOver(e,index)} onMouseOut={(e)=>this.handleMouseOut(e,index)}>
                            <img src={item.link} alt="our service"></img>
                            <div className="serviceContent">
                                <h3>{item.title}</h3>
                                <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. 
                                Aenean commodo ligula eget dolor. Aenean massa. Cum sociis 
                                natoque penatibus eur ridiculus mus</p>
                                <a href="ok" className= "readmore">VIEW PRICING</a>
                            </div>
                        </div>
                        </Col>
                    ))}
                   
                </Row>
                <Row>
                    <Col>
                        <h3 style={{fontSize:'25px', fontWeight:'300',color:'#333333',fontFamily:'Rubik, Helvetica, Arial, sans-serif',marginLeft:'10px',padding:'55px 0px 55px 0px'}}>“Signature Services & Individualized Attention. 
                        Relaxation at its best.” – Susan Doe</h3>
                    </Col>
                    <Col style={{color:'#666666',fontFamily:'inherit',fontSize:'16.5px',fontWeight:'450',padding:'55px 20px 55px 20px'}}>
                        <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, 
                        arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. 
                        Cum sociis natoque penatibus et magnis dis parturient montes, nascetur` 
                        ridiculus mus.</p>
                    </Col>
                </Row>

            </Container>
            <div className="overlay_background" >
                <div className='overlay_background1'>
                    <h2>The Infinity of Beauty & Indulgence</h2>
                    <div className= "comex">COME EXPERIENCE THE SECRETS OF RELAXATION.</div>
                </div>
            </div>
            <Container style={{marginTop:'50px'}}>
                <Row>
                    <Col lg="6">
                    <div className="secret_text">
                        <h2>Secrets of relaxation</h2>
                        <p>Drinking vinegar stumptown yr pop-up artisan sunt. Deep v
                        cliche lomo biodiesel Neutra selfies. Shorts fixie consequat
                        flexitarian four loko tempor duis single-origin coffee. Banksy,
                        elit small batch freegan sed. Aenean massa. Cum sociis natoque
                        penatibus eur ridiculus mus</p>
                        <a href="ok">VIEW OUR SERVICES</a>
                    </div>
                    </Col>
                    <Col lg="6">
                        <div className="secret_img"></div>
                    </Col>
                </Row>
                <Row style={{marginTop:'30px'}}>
                    <Col lg="6">
                        <div className="secret_img_second"></div>
                    </Col>
                    <Col lg="6">
                    <div className="secret_text">
                        <h2>Satisfying our clients</h2>
                        <p>Drinking vinegar stumptown yr pop-up artisan sunt. Deep v
                        cliche lomo biodiesel Neutra selfies. Shorts fixie consequat
                        flexitarian four loko tempor duis single-origin coffee. Banksy,
                        elit small batch freegan sed. Aenean massa. Cum sociis natoque
                        penatibus eur ridiculus mus</p>
                        <a href="ok">CHECK AVAILABILITY</a>
                    </div>
                    </Col>
                </Row>
            </Container>
            <div className="overlay_background" style={{marginTop:'60px',backgroundImage:"url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/02/utomhuspool_5.jpg)"}} >
                <div className='overlay_background1'>
                    <h2>Relaxation. No longer beyond your budget</h2>
                    <div className= "comex">COME EXPERIENCE THE SECRETS OF RELAXATION.</div>
                </div>
            </div>

            </div>
        );
    }
}

export default ContentHome;