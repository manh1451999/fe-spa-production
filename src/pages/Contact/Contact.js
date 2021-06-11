import React, { Component } from 'react';
import './Contact.css'

export default class Contact extends Component {
	render() {
		return (
			<div className="contact" >

				<div className="contact-slide-bar">
					<div className="backgroup-dark">
						<h1>Contact Us</h1>
					</div>
				</div>

				<div className="text-contact">
					<h2 style={{ textAlign: "center", fontSize: '18px', fontWeight: '700' }}>Địa chỉ của chúng tôi</h2>
				</div>

				<div className="contact-map">
					<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4461.575339246853!2d105.84913271071304!3d21.003385664182236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ac74f21ad2c7%3A0x8e1a68269eb14672!2zMjAgTMOqIFRoYW5oIE5naOG7iywgQ-G6p3UgROG7gW4sIEhhaSBCw6AgVHLGsG5nLCBIw6AgTuG7mWk!5e0!3m2!1svi!2s!4v1595385580375!5m2!1svi!2s"
						height="600" frameborder="0" style={{ 'border': '0', 'width': '100%' }} allowfullscreen=""
						aria-hidden="false" tabindex="0"></iframe>
				</div>

				{/*				<div className="card_two_cols">

				 <div className="one_half">
				 	<h2>Come experience the  secrets of relaxation</h2>
				 	<p>Aliquip veniam delectus, Marfa eiusmod Pinterest in do umami readymade swag. 
				 	Selfies iPhone Kickstarter, drinking vinegar jean vinegar stumptown yr pop-up artisan sunt.
				 	Craft beer elit seitan exercitation, photo booth.</p>
				 	<p>
				 		<a href="/"> View Pricing</a>
				 	</p>
				 </div>
 
				 <div className="two_half contact-img">
				 	<img src="/contact/img1.jpg" alt="ảnh1"/>
				 </div>

				</div>*/}


				<div style={{ textAlign: "center", marginTop: '40px', marginBottom: '80px' }}>
					<div className="divider"></div>
					<i className="fa fa-leaf iconLeaf"></i>
					<div className="divider"></div>
				</div>

				<div className="contact-box row">
					<div className="col-sm-6 box1">
						<ul>
							<li>
								<h2 className="contact-box-h2-1">Địa chỉ</h2>
								<p className="contact-box-p-1">184 Lê Thanh Nghị Hai Bà Trưng</p>
							</li>
							<li>
								<p className="contact-box-p-1">Số điện thoại liên hệ 123456777</p>
							</li>

							<li>
								<h2 className="contact-box-h2-4">Connect to Us</h2>
								<div className="icons">
									<ul className="list-icons">
										<li className="fb"><a href="/"><i className="fab fa-facebook" title="Facebook" /></a></li>
										<li className="tw"><a href="/"><i className="fab fa-twitter" title="Twitter" /></a></li>
										<li className="fl"><a href="/"><i className="fab fa-flickr" title="Flickr" /></a></li>
										<li className="pt"><a href="/"><i className="fab fa-pinterest" title="Pinterest" /></a></li>
										<li className="ig"><a href="/"><i className="fab fa-instagram" title="Instagram" /></a></li>
									</ul>
								</div>
							</li>

						</ul>
					</div>

					<div className="col-sm-6 box2">
						<h2 className="contact-box2-h2">Contact Us</h2>
						<p className="contact-box2-p">Để có những giờ phút thư giãn nhất</p>
						<input type="text" class="form-control" id="name" placeholder="Name*" />
						<input type="text" class="form-control" id="email" placeholder="Email Address*" />
						<textarea rows={5} type="text" class="form-control" id="message" placeholder="Your Message*"></textarea>
						<br />
						<button type="button" class="">SEND</button>
					</div>
				</div>
			</div>
		);
	}
}
