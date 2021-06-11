import React, { Component, useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../../contexts/CartContext';
import UserContext from '../../contexts/UserContext';
import './Header.css';


function Header(props) {
	const user = useContext(UserContext)
	const cart = useContext(CartContext)
	return (
		<Header1 user={user} cart={cart} />
	);
}

export default Header;

class Header1 extends Component {

	constructor(props) {
		super(props);
		this.state = {
			scrolling: 'noscroll',
			oldscroll: 0
		}
		this.handleScroll = this.handleScroll.bind(this)
	}

	componentDidMount() {
		window.addEventListener('scroll', this.handleScroll);
	}

	componentWillUnmount() {
		window.removeEventListener('scroll', this.handleScroll);
	}

	async handleScroll() {
		// let scrollTop = event.srcElement.body.scrollTop,
		//     itemTranslate = Math.min(0, scrollTop/3 - 60);

		// this.setState({
		//   transform: itemTranslate
		// });
		let y = window.scrollY;

		if (y > 0 && y > this.state.oldscroll) this.setState({
			scrolling: 'none'
		})
		else if (y === 0 && this.state.scrolling !== 'noscroll') this.setState({
			scrolling: 'noscroll'
		})
		else if (y > 0 && this.state.scrolling !== 'scroll') this.setState({
			scrolling: 'scroll'
		})
		await this.setState({ oldscroll: y })

	}
	render() {
		var classScroll = this.state.scrolling;
		const { user, cart } = this.props

		return (
			<div>
				<div className='header'>
					<div className={`big-menu ${classScroll}`}>
						<div>
							<div className="menu">
								<nav class="menu1 navbar navbar-expand-lg ">
									{classScroll === 'noscroll' && <Link class="navbar-brand" to="/"><img className="repologo" src="/icon/header/logoWhite.png" alt="logo" width={85} height={35} style={{ position: 'relative', top: "-6px" }} /></Link>}
									{classScroll === 'scroll' && <Link class="navbar-brand" to="/"><img className="repologo" src="/icon/header/logoBlack.png" alt="logo" width={85} height={35} style={{ position: 'relative', top: "-6px" }} /></Link>}
									<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
										<i class="fa fa-bars icon-humbuger"></i>
									</button>
									<div class="collapse navbar-collapse " id="navbarNav">
										<ul class="navbar-nav">
											<li class="nav-item active">
												<Link class="nav-link" to="/">Trang chủ</Link>
											</li>
											<li class="nav-item">
												<Link class="nav-link" to="/booking">Đặt lịch</Link>
											</li>
											<li class="nav-item">
												<Link class="nav-link" to="/services">Dịch vụ</Link>
											</li>
											{/* <li class="nav-item dropdown">
						        <Link class="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						          SHOP
						        </Link>
						        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
						          <Link class="dropdown-item" to="/">Another action</Link>
						          <Link class="dropdown-item" to="/">Another action</Link>
						          <Link class="dropdown-item" to="/">Another action</Link>
						          <Link class="dropdown-item" to="/">Something else here</Link>
						        </div>
						      </li> */}
											<li class="nav-item">
												<Link class="nav-link" to="/shop">Cửa hàng</Link>
											</li>




											<li class="nav-item">
												<Link class="nav-link" to="/about">Về chúng tôi</Link>
											</li>

											<li class="nav-item">
												<Link class="nav-link" to="/contact">Liên lạc</Link>
											</li>

											{/*<li class="nav-item">*/}
											{/*	<Link class="nav-link" to="/gallery">GALLERY</Link>*/}
											{/*</li>*/}
											{user.isAdmin && <li class="nav-item">
												<Link class="nav-link" to="/admin/home">ADMIN</Link>
											</li>}


										</ul>
									</div>
								</nav>
							</div>
						</div>


						<div className="logo-right">
							<Link to="/booking" className="text-book-menu">Đặt lịch</Link>
							{/* <a href="/" >BOOK</a> */}

							<Link class="div0" to="/cart">
								<div class="div1">
									<div class="header-cart-icon">
										<div class="div2"><i class="fa fa-cart-plus icon-cart"></i></div>

										{cart.cartAmount > 0 && <div class="icon-cart-quantity">
											<span>{cart.cartAmount}</span>
										</div>}



									</div>
								</div>
							</Link>

							{!user.isLogin && <div className="menu-log">
								<Link class="menu-login" to="/login">Đăng nhập</Link>
							</div>
							}


							{user.isLogin && <>
								<Link class="nav-link dropdown-toggle" to="/" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
									Hello {user.firstName}
								</Link>
								<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
									<Link class="dropdown-item" to="/user/profile"><i class="fas fa-user-edit"></i>&nbsp; Thông tin cá nhân</Link>
									<Link class="dropdown-item" to="/user/changepass"><i class="fas fa-key"></i>&nbsp; Đổi mật khẩu</Link>
									<Link class="dropdown-item" to="/user/historyBooking"><i class="fas fa-bookmark"></i>&nbsp; Lịch sử đặt lịch</Link>
									<Link class="dropdown-item" to="/user/order"><i class="fas fa-history"></i>&nbsp; Lịch sử đơn hàng</Link>
									<Link class="dropdown-item" to="/" onClick={() => user.Logout()}><i class="fas fa-sign-out-alt"></i>&nbsp; Đăng xuất</Link>
								</div>
							</>
							}




						</div>

					</div>
				</div>
			</div>
		);
	}
}
