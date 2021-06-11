import React from 'react';
import { Link } from 'react-router-dom';

function Sidebar(props) {
    return (
        // < !--Main Sidebar Container -->
        <aside className="main-sidebar sidebar-dark-primary elevation-4">
            {/* <!-- Brand Logo --> */}
            <a href="../../admin/home" className="brand-link">
                <img src="/adminlte/dist/img/AdminLTELogo.png"
                    alt="AdminLTE Logo"
                    className="brand-image img-circle elevation-3"
                    style={{ opacity: "0.8" }} />
                <span className="brand-text font-weight-light">Green Spa</span>
            </a>

            {/* <!-- Sidebar --> */}
            <div className="sidebar">
                {/* <!-- Sidebar user (optional) --> */}
                {/* <div className="user-panel mt-3 pb-3 mb-3 d-flex">
                    <div className="image">
                        <img src="/adminlte/dist/img/user2-160x160.jpg" className="img-circle elevation-2" alt="User Image" />
                    </div>
                    <div className="info">
                        <a href="#" className="d-block">Green Spa</a>
                    </div>
                </div> */}

                {/* <!-- Sidebar Menu --> */}
                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        {/* <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-tachometer-alt"></i>
                                <p>
                                    <Link to="/admin/home">
                                        Trang chủ
                                    </Link>

                                </p>
                            </a>
                        </li> */}

                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-chart-pie"></i>
                                <p>
                                    <Link to="/admin/statistical">
                                        THống kê
                                    </Link>

                                </p>
                            </a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fab fa-product-hunt"></i>
                                <p>
                                    <Link to="/admin/product">
                                        Sản phẩm
                                    </Link>

                                </p>
                            </a>
                        </li>



                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-home"></i>
                                <p>
                                    <Link to="/admin/category">
                                        Thể loại
                                    </Link>

                                </p>
                            </a>
                        </li>




                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fa fa-cart-plus"></i>
                                <p>
                                    <Link to="/admin/order">
                                        Hóa đơn
                                    </Link>

                                </p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fa fa-user"></i>
                                <p>
                                    <Link to="/admin/user">
                                       Người dùng
                                    </Link>

                                </p>
                            </a>
                        </li>


                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-file-invoice-dollar"></i>
                                <p>
                                    <Link to="/admin/bill">
                                        Đơn đặt lịch
                                    </Link>

                                </p>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link">
                                <i className="nav-icon fas fa-spa"></i>
                                <p>
                                    <Link to="/admin/services">
                                        Dịch vụ
                                    </Link>

                                </p>
                            </a>
                        </li>

                       



                    </ul>
                </nav>
                {/* <!-- /.sidebar-menu --> */}
            </div>
            {/* <!-- /.sidebar --> */}
        </aside>

    );
}

export default Sidebar;