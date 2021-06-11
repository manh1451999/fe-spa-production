import React, { Component } from 'react';
import { Container } from "reactstrap";
import './MembershipCards.css';
export default class MembershipCards extends Component {
    render() {
        return (
            <div>
                <div className="overlay_background" style={{ backgroundImage: "url(https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandspa/demo/wp-content/uploads/2017/06/f3d7c86de36c594617f239bf8e83ad47.jpg)" }} >
                    <div className='overlay_background1'>
                        <h2>Membership Cards</h2>
                    </div>
                </div>
                <Container>
                    <h2 className="commitment">OUR COMMITMENT</h2>
                    <h3 className="commitment_content">“Breathe in peace, breathe out stress. Relaxing
                    can bring relief to much of what ails you. In our stressful and often
                    negative world, your decision to make relaxing a priority will help you
                    navigate, handle, and minimize stress”</h3>
                    <div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
                        <div className="divider"></div>
                        <i className="fa fa-leaf iconLeaf"></i>
                        <div className="divider"></div>
                    </div>
                </Container>
                <div className="membership-cards">
                    <div className="card-1">
                        <div className="card-1-text">
                            <div className="card-1-text-content">
                                <h1>Silver Package</h1>
                                <p>Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
                                <button>Purchase - $199</button>
                            </div>
                        </div>
                        <div className="card-1-img">
                            <img src="./KURSHI-SPA-KIDS.jpg" alt="" />
                        </div>
                    </div>
                    <div className="card-2">
                        <div className="card-2-img">
                            <img src="./Oasis-Spa-Coconut-Nourishing11.jpg" alt="" />
                        </div>
                        <div className="card-2-text">
                            <div className="card-2-text-content">
                                <h1>Gold Package</h1>
                                <p>Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
                                <button>Purchase - $199</button>
                            </div>
                        </div>
                    </div>
                    <div className="card-1">
                        <div className="card-1-text">
                            <div className="card-1-text-content">
                                <h1>Platinum Package</h1>
                                <p>Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.</p>
                                <button>Purchase - $499</button>
                            </div>
                        </div>
                        <div className="card-1-img">
                            <img src="./iStock_000011185393XLarge.jpg" alt="" />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
