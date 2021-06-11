import React, { Component } from 'react';
import ContainerTest from '../Layout/ContainerTest';
import LayoutAdmin from '../Layout/LayoutAdmin';



class Home extends Component {

    // componentDidMount() {
    //     setTimeout(() => {
    //         document.getElementById("example1").DataTable({
    //             "responsive": true,
    //             "autoWidth": false,
    //         });
    //         document.getElementById("example2").DataTable({
    //             "paging": true,
    //             "lengthChange": false,
    //             "searching": false,
    //             "ordering": true,
    //             "info": true,
    //             "autoWidth": false,
    //             "responsive": true,
    //         });
    //     }, 200)

    // }
    render() {
        return (
            <LayoutAdmin>
                <ContainerTest />
            </LayoutAdmin>
        );
    }
}

export default Home;


