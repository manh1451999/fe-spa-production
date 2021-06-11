import React from 'react';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import Footer from './Footer';

function LayoutAdmin(props) {
    return (
        <div class="wrapper">
            <Navbar />
            <Sidebar />
            {props.children}
            <Footer />


        </div>
    );
}

export default LayoutAdmin;