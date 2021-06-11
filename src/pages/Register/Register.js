import React, { Component } from 'react';
import { Link } from "react-router-dom";
import cookie from 'react-cookies'
import validator from 'validator';
import validation from './../Login/validation'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';




export default class Register extends Component {
	constructor(props) {
		super(props);
		this.state = {
			firstName: "",
			lastName: "",
			email: "",
			address: "",
			phone: "",
			password: "",
			confirmPassword: "",
			err: {
				firstName: "",
				lastName: "",
				email: "",
				address: "",
				phone: "",
				password: "",
				confirmPassword: "",
			}
		}
		this.handleInput = this.handleInput.bind(this);
		// this.validateByName= this.validateByName.bind(this);
	}



	handleInput(e) {
		const { name, value } = e.target;
		this.setState({ [name]: value })
	}


	// validateByName(name, fun){
	// 	 let err= fun(this.state[name]);
	// 	 let errNew= this.state.err;
	// 	 errNew[name]= err

	// 	this.setState({
	// 		err:errNew
	// })
	// }

	Submit = async (e) => {


		e.preventDefault();
		console.log(this.state)

		let errNew = this.state.err;

		console.log(Object.keys(errNew))

		Object.keys(errNew).forEach(key => {


			errNew[key] = validation[key](this.state[key])

		});


		if ((errNew.confirmPassword == '' || errNew.confirmPassword == null) && this.state.password != this.state.confirmPassword)

			errNew.confirmPassword = "mật khẩu không khớp"


		this.setState({
			err: errNew
		})


		for (let key in errNew) {
			if (errNew[key] != null && errNew[key] != "") {
				return
			}

		}


		var user = this.state;
		delete user.err

		axios.post('/auth/register', user)
			.then((res) => {
				toast.success('đăng ký thành công')
			})
			.catch((err) => {
				if (err.response.data.message)
					toast.error(err.response.data.message)
				else toast.error('đăng ký thất bại')
			})

	}



	render() {
		return (

			<div className="bglogin">
				<ToastContainer />

				<div style={{ 'marginBottom': '5%' }}></div>
				<div className="signup col-sm-6" style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: '10px', border: '1px black solid', borderRadius: '30px', padding: '20px' }}>
					<h1 className="text-center">Register</h1>
					<br />
					<form>
						<div className="form-group">
							<label htmlFor="firstName" className="col-sm form-control-label" >First Name</label>
							<div className="col-sm">
								<input type="text" className="form-control" name="firstName" id="firstName" value={this.state.firstName} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-firstName">{this.state.err?.firstName}</p>
						</div>

						<div className="form-group">
							<label htmlFor="lastName" className="col-sm form-control-label" >Last Name</label>
							<div className="col-sm">
								<input type="text" className="form-control" name="lastName" id="lastName" value={this.state.lastName} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-lastName">{this.state.err?.lastName}</p>
						</div>


						<div className="form-group">
							<label htmlFor="email" className="col-sm form-control-label">Email</label>
							<div className="col-sm">
								<input type="email" className="form-control" name="email" id="email" value={this.state.email} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-email">{this.state.err?.email}</p>
						</div>



						<div class="form-group">
							<label for="address" class="col-sm form-control-label">Address</label>
							<div class="col-sm">
								<input type="text" class="form-control" name="address" id="address" value={this.state.address} onChange={this.handleInput} required />
							</div>
							<p class="form-text  text-danger login-err" id="invalid-address">{this.state.err?.adress}</p>
						</div>


						<div className="form-group">
							<label htmlFor="phone" className="col-sm form-control-label">Phone</label>
							<div className="col-sm">
								<input type="text" className="form-control" name="phone" id="phone" value={this.state.phone} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-phone">{this.state.err?.phone}</p>
						</div>
						<div className="form-group">
							<label htmlFor="password" className="col-sm form-control-label">Password</label>
							<div className="col-sm">
								<input type="password" className="form-control" name="password" id="password" value={this.state.password} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-password">{this.state.err?.password}</p>
						</div>
						<div className="form-group">
							<label htmlFor="confirmPassword" className="col-sm form-control-label">Confirm Password</label>
							<div className="col-sm">
								<input type="password" className="form-control" name="confirmPassword" id="confirmPassword" value={this.state.confirmPassword} onChange={this.handleInput} required />
							</div>
							<p className="form-text  text-danger login-err" id="invalid-confirmPassword">{this.state.err?.confirmPassword}</p>
						</div>
						<div className="form-group">
							<div className="col-sm-offset-2 col-sm">
								<button type="submit" id="submit" className="btn btn-primary" onClick={this.Submit} >Sign up</button>
							</div>
						</div>


						<br />
						<Link style={{ paddingLeft: '15px' }} to="/login"> Already have an account?</Link>


						<p style={{ fontSize: 'small', paddingLeft: '15px' }} className="form-text  text-success" id="valid"></p>
					</form>
				</div>
			</div>
		)
	}
}