import React, { Component } from 'react';
import './Flow.css';

 export default class FLow extends Component{
    constructor(props){
        super(props);
        this.state={
            img:[
                {link: "./utomhuspool_5-1024x683.jpg", classCard: 'active'},
                {link: "./2.jpg", classCard: 'right-active'},
                {link: "./3.jpg", classCard: ''},
                {link: "./4.jpg", classCard: ''},
                {link: "./5.jpg", classCard: ''},
                {link: "./6.jpg", classCard: ''},
                {link: "./7.jpg", classCard: ''},
                {link: "./8.jpg", classCard: ''},
                {link: "./9.jpg", classCard: ''}
            ],
        };
    }
    
    zoomImage(e, index){
        let arr = this.state.img;
        arr.map(ar => ar.classCard = '')
        arr[index].classCard='active' 
        if (index>0) arr[index-1].classCard='left-active'
        if (index<arr.length-1) arr[index+1].classCard='right-active'
        this.setState({img: arr})
    }

    render(){
        let {img} = this.state;
        return(
            <div className="containerCard">
                {img.map((image, index)=> (                    
                    <div className={'cards '+image.classCard} key={index}>
                        <div className="cardTop" onClick={(e)=>this.zoomImage(e, index)}>
                            <img src={image.link} alt="" />
                        </div>
                        <div className="cardBot">
                            <img src={image.link} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        )
    }
}
